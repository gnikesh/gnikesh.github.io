export interface Publication {
  title: string;
  authors: string;
  venue: string;
  date: string;
  url?: string;
  note?: string;
}

export const publications: Publication[] = [
  {
    title: 'Crash Severity Prediction Using Transformer-Based ExcelFormer Model Using Kansas Crash Data',
    authors:
      'Jha, Aditya Nath, Markus Hoehn, Andrei Mazin, Nikesh Gyawali, H M Abdul Aziz, Doina Caragea, et al.',
    venue: 'International Conference on Transportation and Development 2026, pp. 60-71',
    date: '2026',
    url: 'https://ascelibrary.org/doi/abs/10.1061/9780784487013.006',
  },
  {
    title:
      'The Shifting Landscape of Vaccine Discourse: Insights from a Decade of Pre- to Post-COVID-19 Vaccine Posts on Social Media',
    authors: 'Gyawali, Nikesh, Doina Caragea, Cornelia Caragea, and Saif M. Mohammad',
    venue: 'PLOS ONE 20 (12): e0337911',
    date: 'Dec 2025',
    url: 'https://doi.org/10.1371/journal.pone.0337911',
  },
  {
    title:
      'Evaluating Large Language Models for Stance Detection on Financial Targets from SEC Filing Reports and Earnings Call Transcripts',
    authors: 'Gyawali, Nikesh, Doina Caragea, Alex Vasenkov, and Cornelia Caragea',
    venue: 'arXiv preprint arXiv:2510.23464',
    date: 'Oct 2025',
    url: 'https://arxiv.org/abs/2510.23464',
  },
  {
    title: 'Predicting Commercial Motor Vehicle Crash Severity in Kansas Using Explainable Machine Learning',
    authors: 'Gyawali, Nikesh, Sarthak Khanal, Doina Caragea, H M Abdul Aziz, and Eric J. Fitzsimmons',
    venue: 'Journal of Transportation Safety & Security 17 (12): 1580-1611',
    date: '2025',
    url: 'https://doi.org/10.1080/19439962.2025.2540388',
  },
  {
    title: 'GunStance: Stance Detection for Gun Control and Gun Regulation',
    authors:
      'Gyawali, Nikesh, Iustin Sirbu, Tiberiu Sosea, Sarthak Khanal, Doina Caragea, Traian Rebedea, and Cornelia Caragea',
    venue:
      'Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 12027-12044',
    date: 'Aug 2024',
    url: 'https://aclanthology.org/2024.acl-long.650/',
  },
  {
    title: 'Using Recurrent Neural Networks to Detect Supernumerary Chromosomes in Fungal Strains Causing Blast Diseases',
    authors:
      'Gyawali, Nikesh, Yangfan Hao, Guifang Lin, Jun Huang, Ravi Bika, Lidia Calderon Daza, Huakun Zheng, et al.',
    venue: 'NAR Genomics and Bioinformatics 6 (3): lqae108',
    date: '2024',
    url: 'https://doi.org/10.1093/nargab/lqae108',
  },
  {
    title:
      'Disaster Tweet Classification Using Fine-Tuned Deep Learning Models Versus Zero and Few-Shot Large Language Models',
    authors: 'Taghian Dinani, Soudabeh, Doina Caragea, and Nikesh Gyawali',
    venue: 'Communications in Computer and Information Science 2105 (DATA 2023), pp. 73-94',
    date: '2024',
    url: 'https://doi.org/10.1007/978-3-031-68919-2_4',
  },
  {
    title: 'Time series anomaly detection in medical break-the-glass',
    authors: 'Tasali, Qais, Nikesh Gyawali, and Eugene Y. Vasserman',
    venue: 'Proceedings of the 7th Symposium on Hot Topics in the Science of Security',
    date: 'Sep 2020',
    url: 'https://dl.acm.org/doi/abs/10.1145/3384217.3386397',
  },
];
