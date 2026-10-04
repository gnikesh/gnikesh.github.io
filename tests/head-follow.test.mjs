import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  easeAngle,
  frameForAngle,
  wrapAngle,
} from '../src/lib/head-follow.ts';

const sheet = { frames: 96, startAngle: -Math.PI / 2, direction: -1 };
const step = (Math.PI * 2) / sheet.frames;

test('angles wrap into a single turn', () => {
  assert.equal(wrapAngle(0), 0);
  assert.ok(Math.abs(wrapAngle(Math.PI * 3) + Math.PI) < 1e-12);
  assert.ok(Math.abs(wrapAngle(-Math.PI / 2 - Math.PI * 4) + Math.PI / 2) < 1e-12);
});

test('the pointer direction picks the matching frame of the loop', () => {
  // The loop starts looking up and turns counterclockwise on screen: up, left, down, right.
  assert.equal(frameForAngle(-Math.PI / 2, sheet), 0);
  assert.equal(frameForAngle(Math.PI, sheet), 24);
  assert.equal(frameForAngle(Math.PI / 2, sheet), 48);
  assert.equal(frameForAngle(0, sheet), 72);
  assert.equal(frameForAngle(-Math.PI / 2 + step * 0.49, sheet), 0);
  assert.equal(frameForAngle(-Math.PI / 2 + step * 0.51, sheet), 95);
});

test('a clockwise loop maps the same directions in mirrored order', () => {
  const clockwise = { ...sheet, direction: 1 };
  assert.equal(frameForAngle(0, clockwise), 24);
  assert.equal(frameForAngle(Math.PI, clockwise), 72);
});

test('every small pointer move lands on a frame', () => {
  const seen = new Set();
  for (let index = 0; index < 960; index += 1) {
    seen.add(frameForAngle((index / 960) * Math.PI * 2, sheet));
  }
  assert.equal(seen.size, sheet.frames);
});

test('easing turns along the shorter arc across the seam', () => {
  const from = Math.PI - 0.1;
  const to = -Math.PI + 0.1;
  const next = easeAngle(from, to, 16, 70);
  assert.ok(Math.abs(wrapAngle(next - from)) < 0.2);
  assert.ok(Math.abs(wrapAngle(to - next)) < Math.abs(wrapAngle(to - from)));
  assert.equal(easeAngle(1, 2, 0, 70), 1);
  assert.ok(Math.abs(easeAngle(1, 2, 10_000, 70) - 2) < 1e-9);
});
