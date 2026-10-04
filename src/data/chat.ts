import { site } from './site';
import { projects } from './projects';
import { skills } from './experience';
import type { PreparedAnswer } from '../lib/prepared-answers';
import type { CollectionEntry } from 'astro:content';

export function buildPreparedAnswers(
  posts: CollectionEntry<'blog'>[],
): PreparedAnswer[] {
  const articleAliases: Record<string, string[]> = {
    'catan-map-generator': ['catan', 'board generator', 'vibe coding'],
    'docker-notes-app': ['docker', 'microservices', 'notes app'],
    'from-i-cant-quit-vim-to-i-cant-live-without-it': ['vim', 'text editor'],
    'my-favorite-2021-books': ['books', 'reading', 'favorite books'],
    'method-of-least-squares': ['least squares', 'linear regression'],
    'privacy-preserving-deep-learning-how-gans-and-differential-privacy-work-together':
      ['privacy', 'gans', 'differential privacy'],
    'tail-recursive-nth-fibonacci-number': ['fibonacci', 'tail recursion'],
    'maximum-subsequence-sum-of-an-array': [
      'maximum subsequence',
      'subsequence sum',
    ],
    'importance-of-statistics-in-science-hypothesis-test': [
      'statistics',
      'hypothesis test',
      'hypothesis testing',
    ],
    'book-the-5-am-club': ['5 am club', 'morning routine'],
    'a-blog-post-about-life': ['gpt 3', 'post about life'],
    'gpu-monitoring-app-with-django': [
      'gpu monitoring app',
      'gpu monitoring article',
    ],
    'from-tweets-to-takes-training-an-ai-to-read-the-gun-control-debate': [
      'gun control article',
      'tweets to takes',
    ],
  };
  const aliases: Record<string, string[]> = {
    fundlm: [
      'fungal genomes',
      'genomic foundation model',
      'foundation model',
      'foundation models',
      'genomics',
      'fungal dna',
    ],
    funbert: ['funbert', 'bert for dna'],
    gunstance: ['gunstance', 'gun stance', 'gun control', 'stance detection'],
    'gpu-monitor': ['gpu', 'gpu monitoring', 'gpu monitor', 'django'],
    'catan-generator': ['catan', 'catan generator', 'board generator'],
    'docker-notes': ['docker', 'microservices', 'notes app', 'notebooks'],
    'vaccine-discourse': [
      'vaccine',
      'vaccines',
      'vaccine discourse',
      'sentiment',
    ],
    'crash-severity': [
      'crash',
      'crashes',
      'crash severity',
      'transportation',
      'traffic safety',
    ],
  };
  const projectAnswers = projects.map((project) => ({
    id: `project:${project.slug}`,
    terms: [
      ...new Set([
        project.name,
        project.slug.replaceAll('-', ' '),
        ...(aliases[project.slug] ?? []),
      ]),
    ],
    reply: `${project.name}: ${project.description}`,
    more: project.highlights.join('\n\n'),
    sources: [
      { title: 'Explore project', url: `/projects/${project.slug}` },
      ...(project.link
        ? [{ title: project.linkLabel ?? 'View source', url: project.link }]
        : []),
    ],
  }));
  const articleAnswers = posts.map((post) => ({
    id: `article:${post.id}`,
    terms: [
      post.data.title,
      post.id.replaceAll('-', ' '),
      ...(articleAliases[post.id] ?? []),
    ],
    reply: `Nikesh wrote “${post.data.title}”.\n\n${post.data.description}`,
    more: `From Nikesh’s article, “${post.data.title}”:\n\n${
      (post.body ?? '')
        .split(/\n\s*\n/)
        .filter((paragraph) => /^[A-Za-z]/.test(paragraph))
        .slice(0, 2)
        .join('\n\n')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*`]/g, '')
        .slice(0, 1800) || post.data.description
    }`,
    sources: [{ title: 'Read article', url: `/blog/${post.id}` }],
  }));
  return [
    ...projectAnswers,
    ...articleAnswers,
    {
      id: 'website',
      terms: [
        'website',
        'this website',
        'website tech stack',
        'website s tech stack',
        'this site',
        'site built',
        'site stack',
        'powers this website',
        'what can you do',
      ],
      reply:
        'This is Nikesh’s personal workspace: research, projects, a technical notebook, and a place to ask about his work.\n\nThe website is built with Astro, TypeScript, Markdown, and CSS, and hosted on GitHub Pages. The focus is on readable content and a lightweight interface.',
      more: 'Research covers language models and computational biology. Projects collect models, software, and experiments. The notebook contains technical articles and personal reading notes. You can move between them through the navigation or the links in this conversation.',
      sources: [
        {
          title: 'Website source',
          url: 'https://github.com/gnikesh/gnikesh.github.io',
        },
        { title: 'Explore the notebook', url: '/blog' },
      ],
    },
    {
      id: 'doctoral-research',
      terms: [
        'ph d research',
        'phd research',
        'doctoral research',
        'dissertation',
        'thesis',
        'research during his ph d',
        'research during your ph d',
        'ph d focus',
        'phd focus',
      ],
      reply:
        'Nikesh’s Ph.D. research focused on stance detection: using transformer models, LLMs, and hybrid semi-supervised methods to identify opinions in text.\n\nApplications included gun control debates, vaccine discourse, and financial reports. GunStance, published at ACL 2024, pairs a public dataset with a hybrid self-training and LLM approach.',
      more: 'The financial work uses LLMs as annotators and combines prompt engineering, retrieval, and semi-supervised learning to improve label quality. This connects to the broader goal of reducing reliance on manually annotated data.',
      sources: [
        { title: 'Research', url: '/research#language-models' },
        { title: 'GunStance', url: '/projects/gunstance' },
        {
          title: 'Financial stance code',
          url: 'https://github.com/gnikesh/llm-financial-stance',
        },
      ],
    },
    {
      id: 'research',
      terms: [
        'research',
        'what do you work on',
        'what are you working on',
        'what do you study',
        'what do you do',
        'interests',
        'what does nikesh do',
        'ai',
        'llm',
        'llms',
        'biology',
        'machine learning',
      ],
      reply:
        'Nikesh works at the intersection of language models and computational biology. His current research at Kansas State University focuses on foundation models for fungal genomes.\n\nHis earlier work includes stance detection with LLMs, public opinion on social media, and explainable machine learning for transportation safety.',
      more: 'Current work includes pre-training models with up to 1.3B parameters on fungal sequences and building scalable HPC/ACCESS training pipelines. His Ph.D. focused on stance detection, including GunStance, published at ACL 2024.',
      sources: [
        { title: 'Explore research', url: '/research' },
        { title: 'FunDLM', url: '/projects/fundlm' },
      ],
    },
    {
      id: 'projects',
      terms: [
        'projects',
        'what have you built',
        'what do you build',
        'software',
        'code',
        'github',
      ],
      reply:
        'A few places to start:\n\nFunDLM - foundation models for fungal genomes.\nGunStance - a dataset and hybrid LLM approach to stance detection.\nGPU Monitor - a Django app for shared research GPUs.\nCatan Board Generator - a browser-based constraint-solving experiment.\nDockerized microservices - notes and notebooks APIs with isolated services.',
      sources: [
        { title: 'All projects', url: '/projects' },
        { title: 'GitHub', url: site.social.github },
      ],
    },
    {
      id: 'writing',
      terms: ['blog', 'writing', 'written', 'articles', 'posts', 'notebook'],
      reply:
        'The blog is Nikesh’s technical notebook: things he builds, learns, and occasionally gets stuck on.\n\nRecent posts cover an AI-assisted Catan board generator and a Dockerized microservices backend. You’ll also find notes on machine learning, statistics, Vim, and books.',
      sources: [
        { title: 'Read the notebook', url: '/blog' },
        ...posts.slice(0, 2).map((post) => ({
          title: post.data.title.split(':')[0],
          url: `/blog/${post.id}`,
        })),
      ],
    },
    {
      id: 'background',
      terms: [
        'background',
        'about nikesh',
        'about you',
        'about yourself',
        'who are you',
        'who is nikesh',
        'your name',
        'education',
        'university',
        'phd',
        'ph d',
        'postdoc',
        'experience',
        'resume',
        'cv',
        'where are you based',
        'where do you work',
        'where is nikesh',
        'current role',
        'currently work',
        'graduate',
        'graduated',
        'kansas',
        'nepal',
      ],
      reply:
        'Nikesh Gyawali is a computer scientist, researcher, and builder. He is a Postdoctoral Fellow in the Department of Plant Pathology at Kansas State University, working on language models for fungal genomes.\n\nHe completed his Ph.D. in Computer Science at Kansas State in December 2025 and earned his bachelor’s degree in Computer Engineering from Tribhuvan University in Nepal.',
      more: 'Before his current role, Nikesh worked in the Machine Learning & Data Science Lab at Kansas State, taught computer science courses, and worked as a Security Analytics Engineer at Logpoint in Kathmandu.',
      sources: [
        { title: 'About Nikesh', url: '/about' },
        { title: 'Download CV', url: site.resume },
      ],
    },
    {
      id: 'tools',
      terms: [
        'tools',
        'skills',
        'tech stack',
        'technologies',
        'programming languages',
        'python',
        'pytorch',
        'tensorflow',
        'hpc',
      ],
      reply: `Nikesh works primarily with Python and modern machine-learning tools, along with high-performance computing for large-scale model training.\n\n${skills
        .slice(0, 2)
        .map((group) => `${group.title}: ${group.items.join(', ')}`)
        .join('\n\n')}`,
      more: skills
        .slice(2)
        .map((group) => `${group.title}: ${group.items.join(', ')}`)
        .join('\n\n'),
      sources: [
        { title: 'Background & tools', url: '/about' },
        { title: 'Software projects', url: '/projects' },
      ],
    },
    {
      id: 'publications',
      terms: ['papers', 'publications', 'scholar', 'published', 'acl'],
      reply:
        'Nikesh’s publications cover stance detection, fungal genome analysis, vaccine discourse, transportation safety, and security analytics.\n\nHighlights include GunStance at ACL 2024, fungal chromosome detection in NAR Genomics and Bioinformatics, and a decade of vaccine discourse in PLOS ONE.',
      sources: [
        { title: 'Selected publications', url: '/research#publications' },
        { title: 'Google Scholar', url: site.social.scholar },
      ],
    },
    {
      id: 'contact',
      terms: [
        'contact',
        'email',
        'connect',
        'collaborate',
        'collaboration',
        'get in touch',
        'linkedin',
        'hire',
      ],
      reply:
        'Interested in research, a project, or a collaboration? You can reach Nikesh through the contact form or connect on LinkedIn. His code and datasets are on GitHub.',
      sources: [
        { title: 'Get in touch', url: '/contact' },
        { title: 'LinkedIn', url: site.social.linkedin },
        { title: 'GitHub', url: site.social.github },
      ],
    },
    {
      id: 'greeting',
      terms: ['hi', 'hello', 'hey', 'thanks', 'thank you'],
      reply:
        'Hello! I can help you find your way around Nikesh’s work. Ask me about FunDLM, his research, something he’s built, or a post from the blog.',
      sources: [
        { title: 'Research', url: '/research' },
        { title: 'Projects', url: '/projects' },
      ],
    },
    {
      id: 'fallback',
      terms: [],
      reply:
        'I don’t have enough information on that to give you a useful answer. I can help with Nikesh’s research, projects, writing, and background. Try “Tell me about FunDLM” or “What have you built?”',
      sources: [
        { title: 'Explore research', url: '/research' },
        { title: 'Browse projects', url: '/projects' },
        { title: 'Ask Nikesh directly', url: '/contact' },
      ],
    },
  ];
}
