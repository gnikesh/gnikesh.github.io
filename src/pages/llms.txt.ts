import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { absoluteUrl } from '../lib/seo';

const url = (path: string): string => absoluteUrl(path);

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines: string[] = [];

  lines.push(`# ${site.title}`);
  lines.push('');
  lines.push(`> ${site.author.bio}`);
  lines.push('');
  lines.push('## Key info');
  lines.push('');
  lines.push(`- ${site.author.title}`);
  lines.push('');
  lines.push('## Site');
  lines.push('');
  lines.push(`- [Home](${url('/')}): Personal website and blog of ${site.author.name}.`);
  lines.push(`- [About](${url('/about')}): ${site.author.title} at Kansas State University - background, publications, experience, and skills.`);
  lines.push(`- [Research](${url('/research')}): Research on foundational LLMs for fungal genomes, stance detection, and explainable machine learning.`);
  lines.push(`- [Projects](${url('/projects')}): Selected open-source projects in machine learning, NLP, and software engineering.`);
  lines.push(`- [Blog](${url('/blog')}): Writing about machine learning, NLP, programming, and the occasional book or life thought.`);
  lines.push(`- [Contact](${url('/contact')}): Email and social profiles.`);
  lines.push('');
  lines.push('## Profile links');
  lines.push('');
  lines.push(`- [Google Scholar](${site.social.scholar}): Publications and citations.`);
  lines.push(`- [GitHub](${site.social.github}): Code and datasets.`);
  lines.push(`- [LinkedIn](${site.social.linkedin})`);
  lines.push(`- [X](${site.social.x})`);
  lines.push(`- [Resume (PDF)](${url(site.resume)})`);
  lines.push('');

  if (posts.length > 0) {
    lines.push('## Blog posts');
    lines.push('');
    for (const post of posts) {
      lines.push(`- [${post.data.title}](${url(`/blog/${post.id}`)}): ${post.data.description} (${new Date(post.data.pubDate).toISOString().slice(0, 10)}).`);
    }
    lines.push('');
  }

  lines.push('## Full text');
  lines.push('');
  lines.push(`- [llms-full.txt](${url('/llms-full.txt')}): Full text of every blog post and page summary in Markdown, for LLMs to consume directly.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
