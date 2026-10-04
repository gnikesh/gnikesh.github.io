import type { HeadFollowSheet } from '../lib/head-follow';

/** Mouse-following anime portrait: a resting still plus one evenly spaced head revolution. */
export const headFollow: { still: string; sheet: HeadFollowSheet } = {
  still: '/images/profile/head/still.webp',
  sheet: {
    src: '/images/profile/head/sheet.webp',
    frames: 96,
    columns: 12,
    frameWidth: 360,
    frameHeight: 348,
    gutter: 2,
    startAngle: -Math.PI / 2,
    direction: -1,
    focusX: 0.5003,
    focusY: 0.4358,
  },
};
