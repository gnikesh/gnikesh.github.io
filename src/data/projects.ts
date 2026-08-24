export interface Project {
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
    title: 'FunBERT: A pre-trained BERT model for DNA language in Fungal Genome',
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
    title: 'Public Perception of Vaccines: Before and After the COVID-19 Outbreak',
    subtitle: 'Social Media + NLP',
    period: 'Dec 2022 - May 2023',
    description:
      'A study of how people talked about vaccines on social media, crawling ten years (2013-2022) of vaccine-related tweets and using lexicon-based analysis to measure the polarity and perception shift over the years.',
    highlights: [
      'Crawled and processed a decade of vaccine-related Twitter data',
      'Performed lexicon-based sentiment and polarity analysis',
      'Quantified the shift in public perception around the COVID-19 outbreak',
    ],
  },
  {
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
];
