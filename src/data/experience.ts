export interface EducationItem {
  degree: string;
  school: string;
  location?: string;
  period: string;
  note?: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  location: string;
  period: string;
  items: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const education: EducationItem[] = [
  {
    degree: 'Ph.D. in Computer Science',
    school: 'Kansas State University',
    location: 'Manhattan, KS',
    period: 'Dec 2025',
  },
  {
    degree: 'M.S. in Computer Science',
    school: 'Kansas State University',
    location: 'Manhattan, KS',
    period: 'Aug 2025',
  },
  {
    degree: 'Bachelor\u2019s Degree in Computer Engineering',
    school: 'Tribhuvan University',
    location: 'Nepal',
    period: 'Oct 2016',
  },
];

export const experience: ExperienceItem[] = [
  {
    title: 'Postdoctoral Fellow',
    org: 'Department of Plant Pathology, Kansas State University',
    location: 'Manhattan, KS',
    period: 'Sep 2025 - Present',
    items: [
      'Pre-training a foundational LLM model with up to 1.3B parameters for fungal genomes using large-scale genomic sequence data.',
      'Building scalable HPC/ACCESS training pipelines for genome-scale data processing and model optimization.',
      'Collaborating with computer scientists and plant pathologists to integrate biological insights from model development.',
    ],
  },
  {
    title: 'Graduate Research Assistant',
    org: 'Machine Learning & Data Science (MLDS) Lab, Kansas State University',
    location: 'Manhattan, KS',
    period: 'Jan 2023 - Aug 2025',
    items: [
      'Developed advanced transformer and LLM models for NLP tasks like stance detection across multiple domains, including tweets and financial text data from quarterly call reports.',
      'Leveraged Retrieval-Augmented Generation (RAG) and prompt engineering techniques to extract valuable insights from Large Language Models (LLMs).',
      'Optimized LLMs using Reinforcement Learning from Human Feedback (RLHF) to enhance response quality and alignment.',
      'Implemented state-of-the-art AI research from paper to code, adapting it for custom research requirements.',
      'Built and optimized large-scale machine learning models using Python and modern ML frameworks, using LLMs to improve semi-supervised baseline accuracy by 10% on average on a challenging dataset.',
      'Collaborated on multiple ML/NLP projects and published research papers in top-tier conferences.',
    ],
  },
  {
    title: 'Graduate Teaching Assistant',
    org: 'Department of Computer Science, Kansas State University',
    location: 'Manhattan, KS',
    period: 'Aug 2019 - Dec 2022',
    items: [
      'Created quizzes, graded assignments, and provided academic support to students on AI, machine learning, and deep learning courses and term projects.',
      'Developed and evaluated technical assignments and mentored students on programming and database projects for Programming Languages, Database System, and Computer and Information Security courses.',
    ],
  },
  {
    title: 'University Research Internship',
    org: 'LiuLab, Department of Plant Pathology, Kansas State University',
    location: 'Manhattan, KS',
    period: 'May 2021 - Aug 2021, May 2022 - Aug 2022',
    items: [
      'Applied Recurrent Neural Networks (RNNs), specifically Bi-LSTM models, to classify DNA sequences as core- or mini-chromosomes in Magnaporthe oryzae strains.',
      'Developed and optimized a deep learning pipeline for genomic sequence classification, achieving high accuracy in predicting mini-chromosome presence.',
      'Collaborated with an interdisciplinary team of computer scientists and plant pathologists to publish findings in a peer-reviewed journal.',
    ],
  },
  {
    title: 'Security Analytics Engineer',
    org: 'Logpoint',
    location: 'Kathmandu, Nepal',
    period: 'Aug 2017 - Jul 2019',
    items: [
      'Developed machine learning models for User and Entity Behavior Analytics (UEBA).',
      'Developed algorithms for security log analysis and pattern detection, and maintained production-grade software systems.',
      'Developed, maintained, and optimized plugins and code to efficiently parse thousands of logs using Python Regex, improving log parsing speed by 10%.',
      'Took complete ownership of the development lifecycle for the product developed.',
    ],
  },
  {
    title: 'Software Developer Intern',
    org: 'Leapfrog Technology',
    location: 'Kathmandu, Nepal',
    period: 'Dec 2016 - Feb 2017',
    items: [
      'Created a Video to Gif converter using machine learning and neural networks.',
      'Created various website templates using HTML5, CSS, and JavaScript.',
      'Collaborated with back-end developers, UI/UX designers, and managers in a professional, corporate environment to meet client requirements.',
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Programming Languages',
    items: ['Python', 'Bash', 'JavaScript', 'SQL'],
  },
  {
    title: 'Machine Learning / Data Frameworks',
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'Scikit-learn', 'Apache Spark', 'Hugging Face'],
  },
  {
    title: 'Specializations',
    items: ['Machine / Deep Learning', 'Natural Language Processing (NLP)', 'Large Language Models (LLMs)'],
  },
  {
    title: 'Data Visualization',
    items: ['Matplotlib', 'Seaborn', 'Plotly', 'PowerBI'],
  },
  {
    title: 'Tools & Technologies',
    items: ['CUDA', 'Regex', 'Django', 'HTML5', 'CSS', 'Bootstrap', 'High-Performance Computing (HPC)'],
  },
  {
    title: 'Others',
    items: ['AWS / Cloud Platform', 'ETL Pipeline', 'Prompt Engineering', 'RAG', 'RLHF', 'LangChain', 'Ollama'],
  },
];
