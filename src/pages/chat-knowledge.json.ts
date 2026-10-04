import { getCollection } from 'astro:content';
import { buildPreparedAnswers } from '../data/chat';

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return new Response(JSON.stringify(buildPreparedAnswers(posts)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
