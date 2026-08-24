export function formatReadingTime(content: string | undefined): string {
  const wordsPerMinute = 200;
  const words = (content ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}
