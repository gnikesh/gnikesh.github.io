/**
 * Mouse-following portrait. A sprite sheet holds one loop of the head circling
 * evenly in angle; the pointer's direction around the face picks the frame.
 */
export interface HeadFollowSheet {
  src: string;
  frames: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
  /** Transparent pixels between sheet cells. */
  gutter: number;
  /** Screen angle (radians, y down) the head faces in frame 0. */
  startAngle: number;
  /** +1 when later frames turn clockwise on screen, -1 when counterclockwise. */
  direction: 1 | -1;
  /** Face pivot as fractions of the frame. */
  focusX: number;
  focusY: number;
}

const TAU = Math.PI * 2;
/** Time constant for easing the head toward the pointer, in milliseconds. */
const TURN_MS = 70;
/**
 * Time constant for switching between the circling loop and the resting pose. Kept close to a
 * cut: a slow cross-fade between two head poses reads as a double exposure.
 */
const ENGAGE_MS = 40;
/** Within this fraction of the portrait width, the head faces the visitor. */
const NEUTRAL_RADIUS = 0.16;
const RELEASE_RADIUS = 0.2;
const TOUCH_REST_MS = 1600;

/** Wraps an angle into [-π, π). */
export function wrapAngle(angle: number) {
  return ((((angle + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
}

/** Moves `current` toward `target` along the shorter arc. */
export function easeAngle(
  current: number,
  target: number,
  elapsed: number,
  timeConstant = TURN_MS,
) {
  const step = 1 - Math.exp(-Math.max(0, elapsed) / timeConstant);
  return wrapAngle(current + wrapAngle(target - current) * step);
}

/** Frame whose head direction is closest to `angle`. */
export function frameForAngle(
  angle: number,
  sheet: Pick<HeadFollowSheet, 'frames' | 'startAngle' | 'direction'>,
) {
  const turn = wrapAngle((angle - sheet.startAngle) * sheet.direction);
  const index = Math.round(((turn + TAU) % TAU) * (sheet.frames / TAU));
  return index % sheet.frames;
}

const sheets = new Map<string, Promise<HTMLImageElement>>();

function loadSheet(src: string) {
  let sheet = sheets.get(src);
  if (!sheet) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    sheet = image.decode().then(() => image);
    sheets.set(src, sheet);
  }
  return sheet;
}

interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const pointer: Pointer = { x: 0, y: 0, active: false };
const portraits = new Set<() => void>();
let restTimer: number | undefined;
let listening = false;

function wake() {
  portraits.forEach((schedule) => schedule());
}

function track(event: PointerEvent) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
  window.clearTimeout(restTimer);
  if (event.pointerType !== 'mouse') {
    restTimer = window.setTimeout(() => {
      pointer.active = false;
      wake();
    }, TOUCH_REST_MS);
  }
  wake();
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener('pointermove', track, { passive: true });
  window.addEventListener('pointerdown', track, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.active = false;
    wake();
  });
  window.addEventListener('blur', () => {
    pointer.active = false;
    wake();
  });
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', wake, { passive: true });
}

export function initializeHeadFollow(root: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const still = root.querySelector<HTMLImageElement>('img');
  const context = canvas?.getContext('2d');
  if (!canvas || !still || !context) return;
  const sheet = JSON.parse(root.dataset.sheet ?? '{}') as HeadFollowSheet;

  let image: HTMLImageElement | undefined;
  let visible = false;
  let frameRequest = 0;
  let lastTime = 0;
  let angle = sheet.startAngle;
  let targetAngle = sheet.startAngle;
  // 0 shows the resting still, 1 shows the circling loop.
  let engaged = 0;
  let wantsLoop = false;
  let drawn = '';

  function resize() {
    // Render at device resolution, but never above the frames' own resolution.
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(
      1,
      Math.min(sheet.frameWidth, Math.round(canvas!.clientWidth * ratio)),
    );
    const height = Math.round((width * sheet.frameHeight) / sheet.frameWidth);
    if (canvas!.width !== width || canvas!.height !== height) {
      canvas!.width = width;
      canvas!.height = height;
      drawn = '';
    }
  }

  function aim() {
    if (!pointer.active) {
      wantsLoop = false;
      return;
    }
    const box = root.getBoundingClientRect();
    const dx = pointer.x - (box.left + box.width * sheet.focusX);
    const dy = pointer.y - (box.top + box.height * sheet.focusY);
    const distance = Math.hypot(dx, dy) / Math.max(1, box.width);
    // Hysteresis keeps the head from flickering at the edge of the face.
    wantsLoop = distance > (wantsLoop ? NEUTRAL_RADIUS : RELEASE_RADIUS);
    if (wantsLoop) targetAngle = Math.atan2(dy, dx);
  }

  function draw() {
    const frame = frameForAngle(angle, sheet);
    const mix = Math.round(engaged * 32) / 32;
    const key = `${frame}:${mix}:${canvas!.width}`;
    if (key === drawn) return;
    drawn = key;
    const { width, height } = canvas!;
    context!.clearRect(0, 0, width, height);
    context!.imageSmoothingQuality = 'high';
    // Additive blending keeps the cross-fade opaque where both poses overlap.
    context!.globalCompositeOperation = 'lighter';
    if (mix < 1) {
      context!.globalAlpha = 1 - mix;
      context!.drawImage(still!, 0, 0, width, height);
    }
    if (mix > 0) {
      const column = frame % sheet.columns;
      const row = Math.floor(frame / sheet.columns);
      context!.globalAlpha = mix;
      context!.drawImage(
        image!,
        column * (sheet.frameWidth + sheet.gutter),
        row * (sheet.frameHeight + sheet.gutter),
        sheet.frameWidth,
        sheet.frameHeight,
        0,
        0,
        width,
        height,
      );
    }
    context!.globalAlpha = 1;
    context!.globalCompositeOperation = 'source-over';
  }

  function tick(time: number) {
    frameRequest = 0;
    const elapsed = lastTime ? Math.min(time - lastTime, 100) : 16;
    lastTime = time;
    aim();
    if (engaged < 0.02 && wantsLoop) angle = targetAngle;
    angle = easeAngle(angle, targetAngle, elapsed);
    const goal = wantsLoop ? 1 : 0;
    engaged += (goal - engaged) * (1 - Math.exp(-elapsed / ENGAGE_MS));
    if (Math.abs(goal - engaged) < 0.01) engaged = goal;
    draw();
    const settled =
      engaged === goal &&
      (!wantsLoop || Math.abs(wrapAngle(targetAngle - angle)) < 0.002);
    if (!settled) frameRequest = requestAnimationFrame(tick);
    else lastTime = 0;
  }

  function schedule() {
    if (!image || !visible || frameRequest) return;
    frameRequest = requestAnimationFrame(tick);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }).observe(root);
  new ResizeObserver(() => {
    resize();
    drawn = '';
    schedule();
  }).observe(canvas);

  const start = () =>
    Promise.all([loadSheet(sheet.src), still.decode()])
      .then(([loaded]) => {
        image = loaded;
        resize();
        root.dataset.ready = '';
        portraits.add(schedule);
        schedule();
      })
      .catch(() => {
        // Without the sheet the static portrait simply stays in place.
      });
  // Track the pointer right away so the touch that triggers loading is not lost.
  listen();
  // The sprite sheet is large. With a mouse, fetch it once the page itself has loaded; on
  // touch-only devices, wait for the first touch so readers who only scroll never download it.
  if (window.matchMedia('(hover: none)').matches) {
    window.addEventListener('pointerdown', start, { once: true, passive: true });
  } else if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
