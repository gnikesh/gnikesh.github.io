import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatDate, formatDateShort } from '../src/utils/formatDate.ts';

test('article dates retain the frontmatter calendar day in every build timezone', () => {
  const originalTimezone = process.env.TZ;
  try {
    for (const timezone of ['UTC', 'America/Chicago', 'Asia/Kathmandu']) {
      process.env.TZ = timezone;
      const date = new Date('2026-03-22T00:00:00.000Z');
      assert.equal(formatDate(date), 'March 22, 2026');
      assert.equal(formatDateShort(date), 'Mar 22, 2026');
    }
  } finally {
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  }
});

test('dates at the year boundary stay in the correct year', () => {
  assert.equal(formatDate(new Date('2026-01-01')), 'January 1, 2026');
});
