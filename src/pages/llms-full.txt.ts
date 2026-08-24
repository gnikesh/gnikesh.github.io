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
  lines.push(site.author.bio);
  lines.push('');
  lines.push('This file contains the full text of every page and blog post on this site in Markdown, so language models can read the content directly without rendering HTML.');
  lines.push('');

  lines.push('## Site pages');
  lines.push('');
  lines.push(`### About (${url('/about')})`);
  lines.push('');
  lines.push(`${site.author.name} is a ${site.author.title} in the Department of Plant Pathology at Kansas State University. His current work focuses on building foundational Large Language Models (LLMs) for fungal genomes, using large-scale genomic sequence data and scalable HPC training pipelines.`);
  lines.push('');
  lines.push(`His Ph.D. research focused on stance detection - developing advanced NLP models, especially transformer-based and Large Language Models (LLMs) - to analyze and classify opinions on contentious topics, with applications in social media analysis and public opinion tracking.`);
  lines.push('');
  lines.push(`### Research (${url('/research')})`);
  lines.push('');
  lines.push(`Research areas: Large Language Models and foundation models for genomics (pre-training Transformer models on fungal genomic sequences), stance detection enhanced by LLMs (gun control, vaccines, financial text), and explainable and applied machine learning (crash severity prediction, anomaly detection for medical break-the-glass access).`);
  lines.push('');
  lines.push(`Selected work: FunBERT, a pre-trained BERT model for fungal genome DNA language, achieving over 97% accuracy in DNA sequence classification; optimizing financial report analysis with LLMs and semi-supervised learning (over 85% accuracy); AI-driven social media analysis for vaccine sentiment over ten years (2013-2022); commercial motor vehicle crash severity prediction with SHAP explainability; and time series anomaly detection in medical break-the-glass events.`);
  lines.push('');
  lines.push(`### Projects (${url('/projects')})`);
  lines.push('');
  lines.push(`GunStance: a stance detection dataset for gun control debates built from tweets, published at ACL 2024, with code and dataset released openly on GitHub. Other work includes commercial motor vehicle crash severity prediction, FunBERT fungal genomics, public perception of vaccines on social media, and a Django GPU monitoring web app.`);
  lines.push('');
  lines.push(`### Contact (${url('/contact')})`);
  lines.push('');
  lines.push(`Contact: use the form on ${url('/contact')}. Resume available at ${url(site.resume)}.`);
  lines.push('');

  lines.push('## Blog posts');
  lines.push('');

  for (const post of posts) {
    lines.push(`### ${post.data.title}`);
    lines.push('');
    lines.push(`URL: ${url(`/blog/${post.id}`)}`);
    lines.push(`Date: ${new Date(post.data.pubDate).toISOString()}`);
    if (post.data.updatedDate) {
      lines.push(`Updated: ${new Date(post.data.updatedDate).toISOString()}`);
    }
    if (post.data.tags.length > 0) {
      lines.push(`Tags: ${post.data.tags.join(', ')}`);
    }
    lines.push('');
    lines.push(((post.body ?? '').trim() || post.data.description || '').replace(/\n{3,}/g, '\n\n'));
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
