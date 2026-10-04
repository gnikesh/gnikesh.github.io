export function createRateLimiter(limit = 20, periodMs = 60000) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, attempt] of attempts)
      if (attempt.expires <= now) attempts.delete(id);
    const attempt = attempts.get(key) ?? { count: 0, expires: now + periodMs };
    if (attempt.count >= limit || (attempts.size >= 1000 && !attempts.has(key)))
      return false;
    attempt.count++;
    attempts.set(key, attempt);
    return true;
  };
}
