/**
 * All site content lives in this file.
 * Edit text, add publications, or add demo videos here — no HTML needed.
 */

export interface Link {
  label: string;
  url: string;
}

export interface Demo {
  title: string;
  description: string;
  /** Leave the whole `video` out to show a "coming soon" placeholder. */
  video?:
    | { kind: 'youtube'; id: string }
    | { kind: 'vimeo'; id: string }
    /** A file in public/videos, e.g. 'videos/tacit-knowledge.mp4'. Keep files under ~50 MB. */
    | { kind: 'file'; src: string; poster?: string };
  links?: Link[];
  /** Shown under the description as "Sponsored by <logo>". */
  sponsor?: Sponsor;
}

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

export interface Project {
  title: string;
  status: string;
  body: string;
  /** Extra lines, e.g. talks or outcomes. */
  notes?: string[];
  links: Link[];
  /** Project logo shown beside the entry. */
  logo?: { src: string; alt: string; url?: string };
  sponsor?: Sponsor;
}

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: number;
  url?: string;
  type: 'journal' | 'conference' | 'preprint' | 'thesis';
}

export interface Role {
  title: string;
  org: string;
  place: string;
  start: string;
  end: string;
  points: string[];
}

export const profile = {
  name: 'Yingyan Zeng',
  role: 'Assistant Professor, University of Cincinnati',
  headline:
    'I build data-centric AI that stays reliable when real-world data is scarce, noisy, or sensitive.',
  summary:
    'I lead the Data-Centric Intelligence Lab in the Department of Mechanical and Materials Engineering at the University of Cincinnati. My work spans data valuation and selection, active learning, synthetic data, privacy-preserving data sharing, and statistical learning for complex data — applied to manufacturing, robotics, semiconductors, and healthcare.',
  photo: 'img/yingyan-zeng',
  email: 'zengyy@ucmail.uc.edu',
  /** Put resume.pdf in the public/ folder, then set this to 'resume.pdf'. Empty hides the button. */
  resumeUrl: '',
  links: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=9rM8HmwAAAAJ' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yingyan-zeng-8659a514b/' },
    { label: 'GitHub', url: 'https://github.com/yyzeng43' },
  ] as Link[],
};

export const highlights: string[] = [
  'First-author paper at ICML 2026 on online change-point detection for distribution-valued data',
  'Papers at NeurIPS 2026 (Riemannian ordinary least squares) and AAAI 2026',
  '19 peer-reviewed papers, including IEEE SaTML, IEEE T-ASE, and ACM TIST',
  '$80K in industry-institute funding as PI on two projects',
];

export const about = {
  lab: { name: 'Data-Centric Intelligence Lab', logo: 'logos/dci-lab.png' },
  paragraphs: [
    'My research creates a data quality assurance paradigm so that AI models perform well in the manufacturing industrial internet. I have developed methods for data generation, acquisition, valuation, and sharing, with applications in additive manufacturing, bio-manufacturing, semiconductors, and IoT infrastructure design — combining statistical models, machine learning, and optimization.',
    'I also work on interpretable machine learning, predictive modeling with statistical models, and supply chain optimization with operations research. I received my Ph.D. from the Grado Department of Industrial and Systems Engineering at Virginia Tech, advised by Prof. Ran Jin.',
  ],
  advisor: { label: 'Prof. Ran Jin', url: 'https://scholar.google.ca/citations?user=iFTR6Y8AAAAJ' },
  interests: [
    'Data quality',
    'Data valuation',
    'Data sharing and exchange',
    'Manufacturing industrial internet',
    'Healthcare systems',
    'Statistical and machine learning',
  ],
  education: [
    { degree: 'Ph.D., Industrial and Systems Engineering', school: 'Virginia Tech', years: '2019–2024' },
    { degree: 'M.S., Computer Engineering', school: 'Virginia Tech', years: '2021–2024' },
    { degree: 'B.Eng., Industrial and Systems Engineering', school: 'Shanghai Jiao Tong University', years: '2015–2019' },
  ],
};

/**
 * Demo videos. Examples:
 *   video: { kind: 'youtube', id: 'dQw4w9WgXcQ' }          // from youtube.com/watch?v=<id>
 *   video: { kind: 'vimeo', id: '123456789' }
 *   video: { kind: 'file', src: 'videos/demo.mp4', poster: 'videos/demo.jpg' }
 */
const valvoline: Sponsor = { name: 'Valvoline', logo: 'logos/valvoline.png', url: 'https://www.valvoline.com/' };

export const demos: Demo[] = [
  {
    title: 'AI decision support for industrial blending',
    description:
      'A GNN screens each lot order, XGBoost predicts quality specs, Bayesian optimization recommends material adjustments, and an LLM explains the decision with historical cases. Component codes and quantities are blurred.',
    video: { kind: 'file', src: 'videos/valvoline-demo.mp4', poster: 'videos/valvoline-demo.jpg' },
    sponsor: valvoline,
  },
  {
    title: 'Human digital twin',
    description:
      'Generative models and data synthesis for personalized, adaptive decision making in healthcare, with UC Health.',
  },
];

export const projects: Project[] = [
  {
    title: 'Tacit domain knowledge and AI-driven reinforcement learning for factory operations',
    status: 'Industry project, Apr 2025 – present',
    body: 'With the MME Industry 4.0/5.0 Institute and Prof. Sam Anand. A knowledge-capture and continual-learning framework with an agentic AI backbone for factory operations and process optimization, deployed as an end-to-end decision-support system for industrial blending.',
    links: [
      { label: 'Watch the demo', url: '#demos' },
      { label: 'Prof. Sam Anand', url: 'https://researchdirectory.uc.edu/p/anands' },
    ],
    sponsor: valvoline,
  },
  {
    title: 'AI for healthcare: human digital twins and neuro-oncology',
    status: 'With UC Health',
    body: 'Human digital twin modeling through data synthesis and generative AI, supporting personalized and adaptive decision making in healthcare. With Dr. Jonathan Forbes, I co-lead the development of the AI database for UC neuro-oncology, integrating multimodal imaging and longitudinal patient data.',
    notes: [
      'Talk: “AI-Driven Multimodal Imaging Integration: Bridging Radiology, Pathology, and Longitudinal Data for Predictive Oncology.” UC Health Neuro-Oncology Symposium, 2026.',
    ],
    links: [],
  },
  {
    title: 'MultiphaseHUB: a living data hub for thermal and multiphase systems',
    status: 'Multi-university collaboration',
    body: 'A collaborative hub where researchers share, search, and download curated multiphase transport datasets from experiments and simulations, with versioned releases, rich metadata, and an agentic tool that turns papers into structured records. My work focuses on data quality, data valuation, and data sharing. With Prof. Ying Sun and Prof. Han Hu.',
    logo: { src: 'logos/multiphasehub.png', alt: 'MultiphaseHUB logo', url: 'https://www.multiphasehub.org/' },
    links: [
      { label: 'multiphasehub.org', url: 'https://www.multiphasehub.org/' },
      { label: 'Prof. Ying Sun', url: 'https://sites.google.com/view/ysunlab' },
      { label: 'Prof. Han Hu', url: 'https://engineering.uark.edu/mechanical-engineering/faculty/uid/hanhu/name/Han+Hu/' },
    ],
  },
];

export const experience: Role[] = [
  {
    title: 'Assistant Professor & Principal Investigator',
    org: 'University of Cincinnati',
    place: 'Cincinnati, OH',
    start: 'Aug 2024',
    end: 'Present',
    points: [
      'Lead an applied ML research group in data-centric and resilient AI; PI on two industry-institute projects.',
      'Developed online change-point detection for distribution-valued data streams that catches shifts in a distribution’s full shape (ICML 2026).',
      'Built an agentic AI framework that captures operators’ tacit knowledge to optimize factory operations, now extended with LLMs, GNNs, and Bayesian optimization for AR/VR workforce training.',
    ],
  },
  {
    title: 'Research Scientist Intern',
    org: 'ABB',
    place: 'Raleigh, NC',
    start: 'Aug 2023',
    end: 'Dec 2023',
    points: ['Researched vision-based object pose tracking and motion planning for industrial robotic manipulation.'],
  },
  {
    title: 'Graduate Research Assistant',
    org: 'Virginia Tech',
    place: 'Blacksburg, VA',
    start: 'Aug 2019',
    end: 'Jul 2024',
    points: [
      'Built a performance-oriented directed graph neural network that values datasets and matches them across organizations for data sharing and trading (IEEE T-ASE 2025).',
      'Created ModelPred, which predicts a trained model from its training set without retraining, enabling fast data valuation and cleaning (IEEE SaTML 2023).',
      'Designed contextual-bandit ensemble active learning that cuts labeling effort while improving accuracy in additive manufacturing (ACM TIST 2023).',
      'Industry projects: parallel meta-heuristics for large-scale facility location and vehicle routing (SWARM Engineering); a time-series quality model that automated inspection and raised prediction accuracy 5% (Yangtze Optical Fiber and Cable).',
    ],
  },
  {
    title: 'Operations Research Analyst Intern',
    org: 'Eastman Chemical',
    place: 'Shanghai',
    start: 'Jun 2018',
    end: 'Sep 2018',
    points: ['Built a mixed-integer program for lot-sizing and scheduling of a multi-stage flow line, bringing planning time under 15 minutes.'],
  },
];

export const skills = [
  {
    group: 'ML and data',
    items: ['GNNs', 'Transformers and attention', 'Generative models', 'LLMs', 'Reinforcement learning', 'Contextual bandits', 'Active learning', 'Bayesian optimization', 'Federated learning', 'Data valuation and selection', 'Synthetic data'],
  },
  {
    group: 'Statistics and OR',
    items: ['Change-point detection', 'Process control', 'Mixed-effects models', 'Time series', 'Mixed-integer programming', 'Routing', 'Meta-heuristics'],
  },
  {
    group: 'Tools',
    items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'R', 'MATLAB', 'SQL', 'C++', 'Git', 'Docker', 'Gurobi', 'CPLEX'],
  },
];

const scholar = (id: string) =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9rM8HmwAAAAJ&citation_for_view=9rM8HmwAAAAJ:${id}`;

export const publications: Publication[] = [
  { type: 'preprint', authors: 'Zeng, Y., Huang, Y., Chen, X.', title: 'Beyond Euclidean Summaries: Online Change Point Detection for Distribution-Valued Data', venue: 'arXiv preprint arXiv:2602.07252', year: 2026, url: 'https://arxiv.org/abs/2602.07252' },

  { type: 'journal', authors: 'Zeng, Y., Zhou, X., Chilukuri, P., Lourentzou, I., Jin, R.', title: 'High-Quality Dataset-Sharing and Trade Based on A Performance-Oriented Directed Graph Neural Network', venue: 'IEEE Transactions on Automation Science and Engineering', year: 2025, url: 'https://doi.org/10.1109/TASE.2025.3561081' },
  { type: 'journal', authors: 'Zeng, Y., Chen, X., Jin, R.', title: 'Ensemble Active Learning by Contextual Bandits for AI Incubation in Manufacturing', venue: 'ACM Transactions on Intelligent Systems and Technology 15(1), 1–26', year: 2023, url: 'https://dl.acm.org/doi/abs/10.1145/3627821' },
  { type: 'journal', authors: 'Chen, X., Zeng, Y., Kang, S., Jin, R.', title: 'INN: An Interpretable Neural Network for AI Incubation in Manufacturing', venue: 'ACM Transactions on Intelligent Systems and Technology 13(5), 1–23', year: 2022, url: 'https://dl.acm.org/doi/10.1145/3519313' },
  { type: 'journal', authors: 'Shohan, S., Zeng, Y.⁺, Chen, X., Jin, R., Shirwaiker, R.⁺', title: 'Investigating Dielectric Spectroscopy and Soft Sensing for Nondestructive Quality Assessment of Engineered Tissues', venue: 'Biosensors and Bioelectronics 216, 114286', year: 2022, url: 'https://www.sciencedirect.com/science/article/pii/S0956566322003268' },
  { type: 'journal', authors: 'Zeng, Y., Chen, X., Jin, R., Deng, X.', title: 'A Prediction-Oriented Optimal Design for Visualization Recommender Systems', venue: 'Statistical Theory and Related Fields 5(2), 134–148', year: 2021, url: 'https://www.tandfonline.com/doi/full/10.1080/24754269.2021.1905376' },

  { type: 'conference', authors: 'Zeng, Y., Lourentzou, I., Deng, X., Jin, R.', title: 'FAIR: Facilitating Artificial Intelligence Resilience in Manufacturing Industrial Internet', venue: 'IEEE International Conference on Cyber Security and Resilience (CSR)', year: 2025, url: scholar('Se3iqnhoufwC') },
  { type: 'conference', authors: 'Jin, X., Zeng, Y., Liu, H., Jin, R.', title: 'Contrastive Ensemble Active Learning for Data Quality Improvements for Resilient Manufacturing AI Model Prediction', venue: 'IEEE International Conference on Data Mining (ICDM), Resilient AI Workshop', year: 2025, url: scholar('5nxA0vEk-isC') },
  { type: 'conference', authors: 'Liu, H., Qiao, G., Piliptchak, P., Moore, J., Sawyer, D., Zeng, Y., Jin, R.', title: 'DCAF: Dynamic Cross-Attention Feature Fusion from Robotic Anomaly Detection to Position Accuracy Modeling', venue: 'IEEE 21st International Conference on Automation Science and Engineering (CASE)', year: 2025, url: scholar('hqOjcs7Dif8C') },
  { type: 'conference', authors: 'Liu, H., Zeng, Y., Chilukuri, P., Jin, R.', title: 'High-Quality Privacy Preserving Text Data Sharing for Manufacturing Machine Learning Data Market', venue: 'IISE Annual Conference and Expo', year: 2025, url: scholar('UebtZRa9Y70C') },
  { type: 'conference', authors: 'Zeng, Y., Jin, R., Chilukuri, P.K.', title: 'Task-Aware Privacy-Preserving Dataset Valuation for Dataset Exchange in Manufacturing Industrial Internet', venue: 'IISE Annual Conference and Expo', year: 2024, url: scholar('MXK_kJrjxJIC') },
  { type: 'conference', authors: 'Zeng, Y., Thiyagarajan, P., Chan, B., Jin, R.', title: 'Synthetic Data Generation and Sampling for Online Training of DNNs in Manufacturing Supervised Learning Problems', venue: 'IEEE 19th International Conference on Automation Science and Engineering (CASE)', year: 2023, url: 'https://ieeexplore.ieee.org/document/10260330' },
  { type: 'conference', authors: 'Zeng, Y., Wang, J.T., Chen, S., Just, H.A., Jin, R., Jia, R.', title: 'ModelPred: A Framework for Predicting Trained Model from Training Data', venue: 'IEEE Conference on Secure and Trustworthy Machine Learning (SaTML)', year: 2023, url: 'https://ieeexplore.ieee.org/document/10136156' },
  { type: 'conference', authors: 'Shojaee, P., Zeng, Y., Wahed, M., Seth, A., Jin, R., Lourentzou, I.', title: 'Task-Driven Privacy-Preserving Data-Sharing Framework for Industrial Internet', venue: 'IEEE International Conference on Big Data', year: 2022, url: 'https://ieeexplore.ieee.org/document/10020861' },
  { type: 'conference', authors: 'Zeng, Y., Shojaee, P., Faruqui, S.H.A., Alaeddini, A., Jin, R.', title: 'Contextual Bandit Guided Data Farming for Deep Neural Networks in Manufacturing Industrial Internet', venue: 'IEEE 5th International Conference on Industrial Cyber-Physical Systems (ICPS)', year: 2022, url: 'https://ieeexplore.ieee.org/document/9816900' },
  { type: 'conference', authors: 'Shojaee, P., Zeng, Y., Chen, X., Jin, R., Deng, X., Zhang, C.', title: 'Deep Neural Network Pipelines for Multivariate Time Series Classification in Smart Manufacturing', venue: 'IEEE 4th International Conference on Industrial Cyber-Physical Systems (ICPS)', year: 2021, url: 'https://ieeexplore.ieee.org/document/9468245' },

  { type: 'thesis', authors: 'Zeng, Y.', title: 'Data Exchange for Artificial Intelligence Incubation in Manufacturing Industrial Internet', venue: 'Ph.D. Dissertation, Virginia Polytechnic Institute and State University', year: 2024, url: scholar('roLk4NBRz8UC') },
];

export const group = {
  phd: [
    { name: 'Avranshu Mahanty', focus: 'Data quality and continual learning for resilient AI in manufacturing' },
    { name: 'Haicheng (Chris) Wang', focus: 'Tacit knowledge modeling and disease progression modeling' },
  ],
  undergrad: [{ name: 'Jayci Nguyen', focus: 'Research co-op on the tacit knowledge project' }],
};

export const teaching = {
  instructor: [
    { course: 'Introduction to Industry 5.0', when: 'Spring 2026' },
    { course: 'ISE 2024, Probability Foundations for ISE', when: 'Summer 2023' },
  ],
  ta: [
    { course: 'ISE 2214, Manufacturing Processes Laboratory', when: 'Fall 2021, Spring 2022' },
    { course: 'ISE 2034, Data Management for Industrial Engineers', when: 'Spring 2021' },
    { course: 'ISE 3124, Facilities Planning and Material Handling', when: 'Summer 2021' },
    { course: 'ISE 4404, Statistical Quality Control', when: 'Fall 2020' },
  ],
};

export const service = {
  roles: [
    { role: 'Program Committee', org: 'IEEE Big Data 2026', when: 'Sep–Nov 2025' },
    { role: 'Workshop Committee', org: 'ASME Working Group on Robotic Arm Accuracy', when: 'Jul 2025 – present' },
    { role: 'Technical Committee', org: 'IEEE RAS on Digital Manufacturing and Human-centered Automation', when: 'Sep 2023 – present' },
    { role: 'VP Marketing and Finance', org: 'INFORMS VT Student Chapter', when: 'Aug 2020 – May 2023' },
  ],
  reviewer: [
    'IEEE Transactions on Automation Science and Engineering',
    'IISE Transactions',
    'INFORMS Journal on Computing',
    'ASME Journal of Computing and Information Science in Engineering',
    'Journal of Manufacturing Systems',
    'Journal of Manufacturing Science and Engineering',
    'Journal of Statistical Computation and Simulation',
  ],
};
