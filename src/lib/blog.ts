import type { CollectionEntry } from 'astro:content';

export const blogTopics = [
  'All',
  'AI',
  'LLMs',
  'Programming',
  'Research',
  'Systems',
  'Life',
] as const;
export function topicsForPost(post: CollectionEntry<'blog'>): string[] {
  const tags = post.data.tags.map((tag) => tag.toLowerCase());
  const text = `${post.data.title} ${post.data.description}`.toLowerCase();
  const topics: string[] = [];
  if (
    tags.some((tag) =>
      ['machine learning', 'deep learning', 'gans'].includes(tag),
    ) ||
    /\b(ai|llm|gpt|claude)\b/.test(text)
  )
    topics.push('AI');
  if (/\b(llm|llms|gpt|language models?|claude|gunstance)\b/.test(text))
    topics.push('LLMs');
  if (tags.some((tag) => ['programming', 'algorithm'].includes(tag)))
    topics.push('Programming');
  if (
    tags.includes('science') ||
    /\b(dataset|research|statistics|privacy|least squares)\b/.test(text)
  )
    topics.push('Research');
  if (/\b(docker|microservices|gpu|nginx)\b/.test(text)) topics.push('Systems');
  if (
    tags.some((tag) => ['books', 'audiobook', 'thoughts'].includes(tag)) ||
    post.id === 'a-blog-post-about-life'
  )
    topics.push('Life');
  return topics;
}
