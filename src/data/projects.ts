export interface Project {
  slug: string;
  name: string;
  summary: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    slug: 'fundlm',
    name: 'FunDLM',
    title: 'FunDLM: Foundation models for fungal genomes',
    subtitle: 'Foundation Models / Computational Biology',
    period: 'Ongoing',
    summary: 'Learning the language of fungal genomes, one sequence at a time.',
    description:
      'My current research at Kansas State University explores foundation language models for fungal genomes, using large-scale genomic sequence data and scalable training pipelines. This work follows my earlier experiments with FunBERT.',
    highlights: [
      'Pre-training foundational language models with up to 1.3B parameters on fungal genomic sequences',
      'Building HPC/ACCESS pipelines for genome-scale data processing and model training',
      'Working across computer science and plant pathology to connect learned representations with biological questions',
    ],
  },
  {
    slug: 'gunstance',
    name: 'GunStance',
    summary:
      'A dataset and hybrid language-model approach to understanding stance.',
    title: 'GunStance: Stance Detection for Gun Control and Gun Regulation',
    subtitle: 'NLP + Large Language Models',
    period: 'Ongoing',
    description:
      'The first publicly available machine-learning dataset focused squarely on "banning guns" and "regulating guns", built from tweets collected after high-profile shootings and released with strong baselines.',
    highlights: [
      'Hybrid method AUM-ST + ChatGPT achieves up to ten F1 points over the next-best method on unseen events',
      'Published at ACL 2024 (Volume 1: Long Papers), pp. 12027-12044',
      'Code and dataset released openly on GitHub',
    ],
    link: 'https://github.com/gnikesh/gunstance',
    linkLabel: 'View code & dataset',
  },
  {
    slug: 'crash-severity',
    name: 'Crash severity prediction',
    summary:
      'Explainable machine learning for transportation safety in Kansas.',
    title: 'Commercial Motor Vehicle crash severity prediction',
    subtitle: 'Machine Learning + Transportation Safety',
    period: 'Aug 2022 - Dec 2023',
    description:
      'Collaboration with the Civil Engineering Department at Kansas State University and the Kansas State Department of Transportation to develop ML models that predict crash severity in Commercial Motor Vehicles (CMVs).',
    highlights: [
      'Compared Random Forest, Gradient Boost, XGBoost, CatBoost, and transformer-based TabNet on tabular data',
      'Built a deep learning OCR pipeline to parse PDF crash forms',
      'Created analytics dashboards and reports to visualize the data',
    ],
  },
  {
    slug: 'funbert',
    name: 'FunBERT',
    summary:
      'Pre-training a transformer on the DNA language of fungal genomes.',
    title:
      'FunBERT: A pre-trained BERT model for DNA language in Fungal Genome',
    subtitle: 'Deep Learning + Bioinformatics',
    period: 'Aug 2023 - Dec 2024',
    description:
      'Pre-trained a Transformer model from scratch on fungal genomic sequences for downstream tasks such as sequence classification, missense variant effect prediction, and identification of important sequence motifs.',
    highlights: [
      'Self-supervised pre-training on large fungal genome corpora',
      'Applied to supernumerary chromosome detection in blast disease strains',
      'Related findings published in NAR Genomics and Bioinformatics',
    ],
  },
  {
    slug: 'vaccine-discourse',
    name: 'Vaccine discourse',
    summary:
      'A decade of social media, public perception, and vaccine sentiment.',
    title:
      'Public Perception of Vaccines: Before and After the COVID-19 Outbreak',
    subtitle: 'Social Media + NLP',
    period: 'Dec 2022 - May 2023',
    description:
      'A study of how people talked about vaccines on social media, crawling ten years (2013-2022) of vaccine-related tweets and using lexicon-based analysis to measure the polarity and perception shift over the years.',
    highlights: [
      'Crawled and processed a decade of vaccine-related Twitter data',
      'Performed lexicon-based sentiment and polarity analysis',
      'Quantified the shift in public perception around the COVID-19 outbreak',
    ],
    link: 'https://github.com/gnikesh/vaccine-dataset',
    linkLabel: 'View dataset & code',
  },
  {
    slug: 'gpu-monitor',
    name: 'GPU Monitor',
    summary: 'A small window into the GPUs doing the heavy lifting.',
    title: 'GPU Monitoring web app',
    subtitle: 'Django + Python',
    period: '2025',
    description:
      'A tiny GPU monitoring web app built with Django and gpustat that shows real-time GPU usage, memory, and active processes per user - handy in shared research labs and clusters.',
    highlights: [
      'Real-time monitoring of GPU usage and memory stats',
      'Lists per-user processes using the GPU',
      'Lightweight web interface, easy to deploy',
    ],
    link: 'https://github.com/gnikesh/gpu-monitor',
    linkLabel: 'View source',
  },
  {
    slug: 'catan-generator',
    name: 'Catan Board Generator',
    title: 'Catan Board Generator',
    subtitle: 'JavaScript / Algorithms',
    period: '2026',
    summary: 'A weekend idea turned into a balanced board generator.',
    description:
      'A browser-based Catan board generator that uses constraint checking to create balanced resource and number layouts. Built with vanilla JavaScript and SVG, with an AI-assisted development workflow.',
    highlights: [
      'Configurable adjacency constraints for numbers and resource tiles',
      'Fisher-Yates shuffling with a constraint retry loop',
      'Vanilla JavaScript and SVG, bundled with Vite and deployed through GitHub Actions',
    ],
    link: 'https://github.com/gnikesh/catan-map-generator',
    linkLabel: 'View source',
  },
  {
    slug: 'docker-notes',
    name: 'Dockerized microservices',
    title: 'Dockerized notes and notebooks backend',
    subtitle: 'Systems / Docker / Express / MongoDB',
    period: '2026',
    summary:
      'Independent services, clear boundaries, and reproducible environments.',
    description:
      'A note-taking API split into notes and notebooks services, each with its own MongoDB instance, behind an Nginx reverse proxy. A hands-on exploration of the engineering practices behind reliable systems.',
    highlights: [
      'Independent Express services and isolated Docker networks',
      'Explicit validation across service boundaries',
      'Consistent development and production environments with Docker Compose',
    ],
    link: 'https://github.com/gnikesh/docker-notes-app',
    linkLabel: 'View source',
  },
];
