/**
 * All site content lives in this file.
 * Edit text, add publications, or add demo videos here — no HTML needed.
 */

export interface Link {
  label: string;
  url: string;
}

/** A demo video: YouTube, Vimeo, or a file in public/videos (keep files under ~50 MB). */
export type Video =
  | { kind: 'youtube'; id: string }
  | { kind: 'vimeo'; id: string }
  | { kind: 'file'; src: string; poster?: string };

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

/** A paper or talk listed at the end of a project. */
export interface Output {
  kind: 'Paper' | 'Preprint' | 'Talk' | 'Code';
  text: string;
  url?: string;
}

export interface Project {
  title: string;
  status: string;
  body: string;
  /** Static figure shown under the description. */
  figure?: { src: string; alt: string; width: number; height: number; caption?: string };
  /** Demo shown inside the project: a video, or the built-in interactive change-point demo. */
  demo?: { video: Video; caption?: string } | { interactive: 'change-point' };
  /** Short extra lines, e.g. funding. */
  notes?: string[];
  links: Link[];
  /** Project logo shown beside the entry. */
  logo?: { src: string; alt: string; url?: string };
  sponsor?: Sponsor;
  collaborators?: Link[];
  /** Poster thumbnail that opens the full poster. */
  poster?: { thumb: string; href: string; label: string };
  /** Papers and talks from this project, listed at the end. */
  outputs?: Output[];
}

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: number;
  url?: string;
  type: 'journal' | 'conference' | 'preprint' | 'thesis';
  /** Link to code, shown after the venue. */
  code?: string;
}

const xiaoyuChen: Link = { label: 'Dr. Xiaoyu Chen', url: 'https://www.acsu.buffalo.edu/~xchen325/' };

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
    'I build data-centric AI that study how data quality and geometry shape machine learning in manufacturing and healthcare systems.',
  summary:
    'I lead the Data-Centric Intelligence Lab in the Department of Mechanical, Materials, and Industrial Engineering at the University of Cincinnati. My work spans data valuation and selection, synthetic data, privacy-preserving data sharing, and statistical learning for complex manifold-valued data — applied to manufacturing, robotics, and healthcare.',
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
  'Papers at NeurIPS 2026 (Riemannian ordinary least squares) and AAAI 2026 oral (hierarchical dataset selection)',
  '19 peer-reviewed papers, including IEEE SaTML, IEEE T-ASE, and ACM TIST',
  'Industry-institute funding as PI on two projects',
  'Organizer of the first Workshop on Resilient AI for Manufacturing (RAiM) at IEEE ICDM 2025',
];

export const about = {
  lab: { name: 'Data-Centric Intelligence Lab', logo: 'logos/dci-lab.webp' },
  /** Wrap a phrase in **double asterisks** to bold it on the page. */
  paragraphs: [
    'My research focuses on **data quality assurance for machine learning** in connected manufacturing systems. Drawing on reinforcement learning, generative modeling, statistical learning, and optimization, I develop methods for **data generation, acquisition, and valuation**, as well as **data sharing under privacy constraints**. Applications include additive manufacturing, biomanufacturing, semiconductor manufacturing, and industrial Internet of Things infrastructure design.',

    'A central direction of my research is to understand how the **geometry of data** informs quality assessment and change detection. I develop statistical learning methods for **manifold-valued observations** and **online change-point detection** methods for **distribution-valued data**, with applications in manufacturing and healthcare. My earlier work includes interpretable machine learning and operations research for supply chain optimization.',

    'I received my Ph.D. from the Grado Department of Industrial and Systems Engineering at Virginia Tech, advised by Prof. Ran Jin, and a simultaneous M.S. in Computer Engineering at Virginia Tech, advised by Prof. Ruoxi Jia.',
  ],
  advisor: { label: 'Prof. Ran Jin', url: 'https://scholar.google.ca/citations?user=iFTR6Y8AAAAJ' },
  interests: [
    'Data quality',
    'Privacy-preserving data sharing',
    'Data valuation',
    'AI resilience',
    'Distribution-valued statistical learning',
    'Manifold-valued data object',
    'Manufacturing industrial internet',
    'Healthcare AI',
  ],
  honors: [
    { title: 'John Rudd Ph.D. Fellowship', when: '2022' },
    { title: 'Finalist, INFORMS QSR Best Paper Competition', when: '2022' },
    { title: 'Fabrycky Graduate Teaching Assistant', when: '2021–2022' },
  ],
  education: [
    { degree: 'Ph.D., Industrial and Systems Engineering', school: 'Virginia Tech', years: '2019–2024' },
    { degree: 'M.S., Computer Engineering', school: 'Virginia Tech', years: '2021–2024' },
    { degree: 'B.Eng., Industrial and Systems Engineering', school: 'Shanghai Jiao Tong University', years: '2015–2019' },
  ],
};

const valvoline: Sponsor = { name: 'Valvoline', logo: 'logos/valvoline.png', url: 'https://www.valvoline.com/' };

/**
 * Research projects. Each can carry a demo (video or interactive), collaborators,
 * a sponsor, and the papers and talks that came out of it.
 * Video examples:
 *   demo: { video: { kind: 'youtube', id: 'abc123XYZ' } }      // from youtube.com/watch?v=<id>
 *   demo: { video: { kind: 'file', src: 'videos/demo.mp4', poster: 'videos/demo.jpg' } }
 */
export const projects: Project[] = [
  {
    title: 'Tacit domain knowledge and AI-driven reinforcement learning for factory operations',
    status: 'Industry project, 2025 – present',
    body: 'With the MME Industry 4.0/5.0 Institute. Much of the know-how that keeps a factory running lives with experienced operators and is never written down. We capture this tacit knowledge and turn it into decision support in three phases. First, we record experts’ undocumented decision rationales and organize them in knowledge graphs. Second, humans and AI learn from each other: an agentic LLM system with hypothesis, Q&A, and explainer agents draws knowledge out of operators, while a graph neural network learns how process parameters interrelate and a subgraph-level explainer pinpoints the key ones. Third, a graph-grounded reasoning model checks the LLM’s output against the GNN’s evidence before recommending a decision and explaining why. The system is deployed end to end for industrial blending: a GNN screens each lot order, XGBoost predicts quality specs, Bayesian optimization recommends material adjustments, and an LLM explains each decision with historical cases. The 2026 phase integrates LLMs, GNNs, and Bayesian optimization with AR/VR for workforce training.',
    figure: {
      src: 'figures/tacit-knowledge-system.png',
      alt: 'System overview: machine and operational data (SOPs, manuals, historical and real-time data, machine configuration) feed a graph neural network with a subgraph-level explainer and an agentic LLM system with hypothesis, Q&A, and explainer agents, which also exchanges tacit knowledge with machine operator experts. Both feed a graph-grounded AI reasoning model that confidence-checks the GNN evidence pack against the LLM output to produce a recommendation and its reasoning.',
      width: 941,
      height: 523,
      caption: 'Conceptual overview of the system.',
    },
    demo: {
      video: { kind: 'file', src: 'videos/valvoline-demo.mp4', poster: 'videos/valvoline-demo.jpg' },
      caption: 'Demo of the decision-support system. Component codes and quantities are blurred.',
    },
    notes: ['PI on two MME Industry 4.0/5.0 Institute awards (2025 and 2026), in collaboration with Prof. Sam Anand.'],
    links: [{ label: 'Prof. Sam Anand', url: 'https://researchdirectory.uc.edu/p/anands' }],
    sponsor: valvoline,
    outputs: [
      { kind: 'Paper', text: 'Aryal, M.R., Zeng, Y., Vadde, K., Wang, H., Piatt, E., Anand, S. Tacit Domain Knowledge Extraction and AI-Driven Learning Framework for Optimization of Factory Operations. NAMRC 54, 2026.' },
    ],
  },
  {
    title: 'Online change-point detection for distribution-valued data',
    status: 'Statistical learning, ICML 2026',
    body: 'Each time step delivers a whole distribution, such as a batch of sensor readings or a histogram of intraoperative blood pressures. Classical monitoring tracks a mean and misses changes in shape. Our detector compares windows of distributions through their Wasserstein-Fréchet summaries, catching location, scale, and shape shifts online. Case study: monitoring daily Reddit discussion of COVID-19 vaccines. Try the simplified demo below: inject a shape or variance change and watch the distributional detector raise an alarm while a mean-based chart stays quiet.',
    demo: { interactive: 'change-point' },
    links: [],
    collaborators: [xiaoyuChen],
    poster: { thumb: 'posters/icml2026-idd-poster.webp', href: 'posters/icml2026-idd-poster.pdf', label: 'ICML 2026 poster (PDF)' },
    outputs: [
      { kind: 'Paper', text: 'Zeng, Y., Huang, Y., Chen, X. Beyond Euclidean Summaries: Online Change Point Detection for Distribution-Valued Data. ICML 2026.', url: 'https://arxiv.org/abs/2602.07252' },
      { kind: 'Code', text: 'github.com/yyzeng43/IDD-icml', url: 'https://github.com/yyzeng43/IDD-icml' },
    ],
  },
  {
    title: 'Riemannian ordinary least squares',
    status: 'Statistics on manifolds, NeurIPS 2026',
    body: 'Extends ordinary least squares from Euclidean space to complex data objects that live on Riemannian manifolds. Applications include brain imaging (diffusion tensors), motion capture (rotations), wind direction, mortality and single-cell distributions, and protein backbone angles.',
    figure: {
      src: 'figures/rols-applications.png',
      alt: 'Five application domains for Riemannian OLS: brain imaging with diffusion tensors Sym+(3), motion capture with rotations SO(3), wind direction on the sphere S², mortality and single-cell distributions P2(R), and protein backbone angle pairs on the torus T², each with Euclidean covariates.',
      width: 917,
      height: 402,
    },
    links: [],
    collaborators: [xiaoyuChen],
    outputs: [
      { kind: 'Paper', text: 'Chen, X., Huang, Y., Zeng, Y. Riemannian Ordinary Least Squares. NeurIPS 2026.' },
      { kind: 'Talk', text: 'Riemannian Ordinary Least Squares. INFORMS Annual Meeting, San Francisco, CA, 2026.' },
      { kind: 'Code', text: 'github.com/XiaoyuChenPub/ROLS', url: 'https://github.com/XiaoyuChenPub/ROLS' },
    ],
  },
  {
    title: 'MultiphaseHUB: a living data hub for thermal and multiphase systems',
    status: 'Multi-university collaboration',
    body: 'A community infrastructure for organizing, discovering, and reusing multiphase transport data from experiments and simulations. It links externally hosted datasets with modality-specific metadata, publications, analysis tools, and reuse boundaries. We develop LLM-assisted metadata extraction, an agentic literature analyzer that pulls quantitative values from figures, and task-aware compression guided by the quantities downstream analyses need. With Prof. Ying Sun and Prof. Han Hu.',
    logo: { src: 'logos/multiphasehub.png', alt: 'MultiphaseHUB logo', url: 'https://www.multiphasehub.org/' },
    links: [
      { label: 'multiphasehub.org', url: 'https://www.multiphasehub.org/' },
      { label: 'Prof. Ying Sun', url: 'https://sites.google.com/view/ysunlab' },
      { label: 'Prof. Han Hu', url: 'https://engineering.uark.edu/mechanical-engineering/faculty/uid/hanhu/name/Han+Hu/' },
    ],
    outputs: [
      { kind: 'Preprint', text: 'Zeng, Y., Panda, J.P., Mahanty, A., Hu, H., Xu, D., Sun, Y. MultiphaseHUB for Evidence-Grounded Metadata Curation and Task-Aware Compression of Multiphase Data. arXiv:2610.28644, 2026.', url: 'https://arxiv.org/abs/2610.28644' },
      { kind: 'Paper', text: 'Panda, J.P., Yan, L., Zeng, Y., Hu, H., Rishty, A., Plawsky, J., Sun, Y. Conditional Generative Modeling of Transient Flow Condensation Using Acoustic Signatures. AI Thermal Fluids, 100044, 2026.' },
    ],
  },
  {
    title: 'AI for healthcare: human digital twins and neuro-oncology',
    status: 'With UC Health',
    body: 'Human digital twin modeling through data synthesis and generative AI, supporting personalized and adaptive decision making in healthcare. I collaborate on the development of the AI database for UC neuro-oncology, integrating multimodal imaging and longitudinal patient data. We also develop cross-contrast super-resolution that restores anisotropic brain T2w MRI for sharper 3D analysis and better downstream tumor segmentation.',
    links: [],
    outputs: [
      { kind: 'Preprint', text: 'Shen, M., Wang, H., Trivedi, M., Wang, T.J., Xu, Y., Zeng, Y., Yuan, Y. Anatomically Consistent Cross-Contrast Super-Resolution of Anisotropic Brain T2w MRI. arXiv:2608.08401, 2026.', url: 'https://arxiv.org/abs/2608.08401' },
      { kind: 'Talk', text: 'AI-Driven Multimodal Imaging Integration: Bridging Radiology, Pathology, and Longitudinal Data for Predictive Oncology. UC Health Neuro-Oncology Symposium, 2026.' },
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
    points: [],
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
    group: 'Machine Learning and AI',
    items: ['GNNs', 'Generative models', 'Agentic LLMs', 'Reinforcement learning', 'Contextual bandits', 'Active learning', 'Bayesian optimization','Data valuation and selection', 'Synthetic data'],
  },
  {
    group: 'Statistics and OR',
    items: ['Change-point detection', 'Process control', 'Mixed-effects models', 'Time series', 'Mixed-integer programming', 'Routing', 'Meta-heuristics'],
  },
  {
    group: 'Tools',
    items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'R', 'MATLAB', 'SQL', 'C++', 'C#', 'Minitab', 'Git', 'Docker', 'Angular', 'Gurobi', 'CPLEX'],
  },
];

const scholar = (id: string) =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9rM8HmwAAAAJ&citation_for_view=9rM8HmwAAAAJ:${id}`;

export const publications: Publication[] = [
  { type: 'journal', authors: 'Panda, J.P., Yan, L., Zeng, Y., Hu, H., Rishty, A., Plawsky, J., Sun, Y.', title: 'Conditional Generative Modeling of Transient Flow Condensation Using Acoustic Signatures', venue: 'AI Thermal Fluids, 100044', year: 2026 },
  { type: 'journal', authors: 'Zeng, Y., Zhou, X., Chilukuri, P.K., Lourentzou, I., Jin, R.', title: 'High-Quality Dataset-Sharing and Trade Based on A Performance-Oriented Directed Graph Neural Network', venue: 'IEEE Transactions on Automation Science and Engineering 22, 15576–15587', year: 2025, url: 'https://doi.org/10.1109/TASE.2025.3561081' },
  { type: 'journal', authors: 'Zeng, Y., Chen, X., Jin, R.', title: 'Ensemble Active Learning by Contextual Bandits for AI Incubation in Manufacturing', venue: 'ACM Transactions on Intelligent Systems and Technology 15(1), 1–26', year: 2023, url: 'https://dl.acm.org/doi/abs/10.1145/3627821' },
  { type: 'journal', authors: 'Chen, X., Zeng, Y., Kang, S., Jin, R.', title: 'INN: An Interpretable Neural Network for AI Incubation in Manufacturing', venue: 'ACM Transactions on Intelligent Systems and Technology 13(5), 1–23', year: 2022, url: 'https://dl.acm.org/doi/10.1145/3519313' },
  { type: 'journal', authors: 'Shohan, S., Zeng, Y.⁺, Chen, X., Jin, R., Shirwaiker, R.⁺', title: 'Investigating Dielectric Spectroscopy and Soft Sensing for Nondestructive Quality Assessment of Engineered Tissues', venue: 'Biosensors and Bioelectronics 216, 114286', year: 2022, url: 'https://www.sciencedirect.com/science/article/pii/S0956566322003268' },
  { type: 'journal', authors: 'Zeng, Y., Chen, X., Jin, R., Deng, X.', title: 'A Prediction-Oriented Optimal Design for Visualization Recommender Systems', venue: 'Statistical Theory and Related Fields 5(2), 134–148', year: 2021, url: 'https://www.tandfonline.com/doi/full/10.1080/24754269.2021.1905376' },

  { type: 'conference', authors: 'Chen, X., Huang, Y., Zeng, Y.', title: 'Riemannian Ordinary Least Squares', venue: 'Conference on Neural Information Processing Systems (NeurIPS)', year: 2026 },
  { type: 'conference', authors: 'Zeng, Y., Huang, Y., Chen, X.', title: 'Beyond Euclidean Summaries: Online Change Point Detection for Distribution-Valued Data', venue: 'International Conference on Machine Learning (ICML)', year: 2026, url: 'https://arxiv.org/abs/2602.07252', code: 'https://github.com/yyzeng43/IDD-icml' },
  { type: 'conference', authors: 'Aryal, M.R., Zeng, Y., Vadde, K., Wang, H., Piatt, E., Anand, S.', title: 'Tacit Domain Knowledge Extraction and AI-Driven Learning Framework for Optimization of Factory Operations', venue: '54th North American Manufacturing Research Conference (NAMRC 54)', year: 2026 },
  { type: 'conference', authors: 'Zhou, X., Zeng, Y., Jin, R., Lourentzou, I.', title: 'Hierarchical Dataset Selection for High-Quality Data Sharing', venue: 'AAAI Conference on Artificial Intelligence 40(34), 29026–29034', year: 2026 },
  { type: 'conference', authors: 'Zeng, Y., Lourentzou, I., Deng, X., Jin, R.', title: 'FAIR: Facilitating Artificial Intelligence Resilience in Manufacturing Industrial Internet', venue: 'IEEE International Conference on Cyber Security and Resilience (CSR)', year: 2025, url: scholar('Se3iqnhoufwC') },
  { type: 'conference', authors: 'Jin, X., Zeng, Y., Liu, H., Jin, R.', title: 'Contrastive Ensemble Active Learning for Data Quality Improvements for Resilient Manufacturing AI Model Prediction', venue: 'Workshop on Resilient AI for Manufacturing (RAiM) at IEEE ICDM', year: 2025, url: scholar('5nxA0vEk-isC') },
  { type: 'conference', authors: 'Liu, H., Qiao, G., Piliptchak, P., Moore, J., Sawyer, D., Zeng, Y., Jin, R.', title: 'DCAF: Dynamic Cross-Attention Feature Fusion from Robotic Anomaly Detection to Position Accuracy Modeling', venue: 'IEEE 21st International Conference on Automation Science and Engineering (CASE)', year: 2025, url: scholar('hqOjcs7Dif8C') },
  { type: 'conference', authors: 'Liu, H., Zeng, Y., Chilukuri, P.K., Jin, R.', title: 'High-Quality Privacy Preserving Text Data Sharing for Manufacturing Machine Learning Data Market', venue: 'IISE Annual Conference and Expo', year: 2025, url: scholar('UebtZRa9Y70C') },
  { type: 'conference', authors: 'Zeng, Y., Jin, R., Chilukuri, P.K.', title: 'Task-Aware Privacy-Preserving Dataset Valuation for Dataset Exchange in Manufacturing Industrial Internet', venue: 'IISE Annual Conference and Expo', year: 2024, url: scholar('MXK_kJrjxJIC') },
  { type: 'conference', authors: 'Zeng, Y., Thiyagarajan, P., Chan, B., Jin, R.', title: 'Synthetic Data Generation and Sampling for Online Training of DNNs in Manufacturing Supervised Learning Problems', venue: 'IEEE 19th International Conference on Automation Science and Engineering (CASE)', year: 2023, url: 'https://ieeexplore.ieee.org/document/10260330' },
  { type: 'conference', authors: 'Zeng, Y., Wang, J.T., Chen, S., Just, H.A., Jin, R., Jia, R.', title: 'ModelPred: A Framework for Predicting Trained Model from Training Data', venue: 'IEEE Conference on Secure and Trustworthy Machine Learning (SaTML), acceptance rate 26.3%', year: 2023, url: 'https://ieeexplore.ieee.org/document/10136156' },
  { type: 'conference', authors: 'Shojaee, P., Zeng, Y., Wahed, M., Seth, A., Jin, R., Lourentzou, I.', title: 'Task-Driven Privacy-Preserving Data-Sharing Framework for Industrial Internet', venue: 'IEEE International Conference on Big Data', year: 2022, url: 'https://ieeexplore.ieee.org/document/10020861' },
  { type: 'conference', authors: 'Zeng, Y., Shojaee, P., Faruqui, S.H.A., Alaeddini, A., Jin, R.', title: 'Contextual Bandit Guided Data Farming for Deep Neural Networks in Manufacturing Industrial Internet', venue: 'IEEE 5th International Conference on Industrial Cyber-Physical Systems (ICPS)', year: 2022, url: 'https://ieeexplore.ieee.org/document/9816900' },
  { type: 'conference', authors: 'Shojaee, P., Zeng, Y., Chen, X., Jin, R., Deng, X., Zhang, C.', title: 'Deep Neural Network Pipelines for Multivariate Time Series Classification in Smart Manufacturing', venue: 'IEEE 4th International Conference on Industrial Cyber-Physical Systems (ICPS)', year: 2021, url: 'https://ieeexplore.ieee.org/document/9468245' },

  { type: 'preprint', authors: 'Zeng, Y., Panda, J.P., Mahanty, A., Hu, H., Xu, D., Sun, Y.', title: 'MultiphaseHUB for Evidence-Grounded Metadata Curation and Task-Aware Compression of Multiphase Data', venue: 'arXiv preprint arXiv:2610.28644', year: 2026, url: 'https://arxiv.org/abs/2610.28644' },
  { type: 'preprint', authors: 'Shen, M., Wang, H., Trivedi, M., Wang, T.J., Xu, Y., Zeng, Y., Yuan, Y.', title: 'Anatomically Consistent Cross-Contrast Super-Resolution of Anisotropic Brain T2w MRI', venue: 'arXiv preprint arXiv:2608.08401', year: 2026, url: 'https://arxiv.org/abs/2608.08401' },
  { type: 'preprint', authors: 'Liu, H., Jin, X., Zeng, Y., Jin, R.', title: 'Cross-Attention Guided Data Sharing for Knowledge Transfer in Robotic AI Systems', venue: 'Under review at IEEE Transactions on Automation Science and Engineering', year: 2026 },

  { type: 'thesis', authors: 'Zeng, Y.', title: 'Data Exchange for Artificial Intelligence Incubation in Manufacturing Industrial Internet', venue: 'Ph.D. Dissertation, Virginia Polytechnic Institute and State University', year: 2024, url: scholar('roLk4NBRz8UC') },
];

export const talks = [
  { title: 'AI-Driven Multimodal Imaging Integration: Bridging Radiology, Pathology, and Longitudinal Data for Predictive Oncology', venue: 'UC Health Neuro-Oncology Symposium', year: 2026 },
  { title: 'Riemannian Ordinary Least Squares', venue: 'INFORMS Annual Meeting, San Francisco, CA', year: 2026 },
  { title: 'Class-aware Latent Attention Replay (CLAR): Class Incremental Hazard Diagnosis for Resilient AI in the Manufacturing Industrial Internet', venue: 'INFORMS Annual Meeting, San Francisco, CA', year: 2026 },
  { title: 'Statistical Quality Control with Distribution-Valued Samples', venue: 'INFORMS Annual Meeting, Atlanta, GA', year: 2025 },
  { title: 'Data Quality Assurance for AI Incubation in Manufacturing Industrial Internet', venue: 'MME Distinguished Seminar Series, University of Cincinnati', year: 2024 },
  { title: 'Multitask Process Adjustment for Similar-but-non-identical Products and Processes in Manufacturing Industrial Internet', venue: 'INFORMS Annual Meeting, Seattle, WA', year: 2024 },
  { title: 'Investigating Dielectric Spectroscopy and Soft Sensing for Nondestructive Quality Assessment of Engineered Tissues', venue: 'INFORMS Annual Meeting, Phoenix, AZ', year: 2023 },
  { title: 'ModelPred: A Framework for Predicting Trained Model from Training Data', venue: 'IEEE SaTML, Raleigh, NC', year: 2023 },
  { title: 'Ensemble Active Learning by Contextual Bandits for AI Incubation in Manufacturing', venue: 'INFORMS Annual Meeting, Indianapolis, IN', year: 2022 },
  { title: 'Contextual Bandit Guided Data Farming for Deep Neural Networks in Manufacturing Industrial Internet', venue: 'IEEE ICPS, Coventry, UK', year: 2022 },
  { title: 'A Prediction-Oriented Optimal Design for Visualization Recommender Systems', venue: 'INFORMS Annual Meeting', year: 2021 },
];

export const group = {
  phd: [
    { name: 'Avranshu Mahanty', focus: 'Data quality and continual learning for resilient AI in manufacturing' },
  ],
  undergrad: [
    { name: 'Jayci Nguyen', focus: 'Research co-op, industry tacit knowledge project' },
    { name: 'Tam Le', focus: 'Research co-op, industry tacit knowledge project' },
    { name: 'Saksham Malhotra', focus: 'Research co-op, healthcare segmentation and progression modeling project' },
  ],
};

export const teaching = {
  instructor: [
    { course: 'ISE 5115, Data Analytics II', when: 'Fall 2026, University of Cincinnati' },
    { course: 'ISE 6151, Introduction to Industry 5.0', when: 'Spring 2026, University of Cincinnati' },
    { course: 'ISE 2010, Data Analytics I', when: 'Summer 2025 and 2026, University of Cincinnati' },
    { course: 'ISE 2024, Probability Foundations for ISE', when: 'Summer 2023, Virginia Tech' },
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
    { role: 'Fund Raiser Committee', org: 'INFORMS Quality, Statistics, and Reliability (QSR) Section', when: 'May 2026 – present' },
    { role: 'Program Committee', org: 'IEEE BigData 2026', when: 'Sep 2025 – present' },
    { role: 'Workshop Committee', org: 'ASME Working Group on Robotic Arm Accuracy', when: 'Jul 2025 – present' },
    { role: 'Graduate Recruiting Committee', org: 'College of Engineering and Applied Science, University of Cincinnati', when: 'Aug 2024 – present' },
    { role: 'Technical Committee', org: 'IEEE RAS on Digital Manufacturing and Human-centered Automation', when: 'Sep 2023 – present' },
    { role: 'VP Marketing', org: 'INFORMS VT Student Chapter', when: 'Aug 2022 – May 2023' },
    { role: 'Treasurer', org: 'INFORMS VT Student Chapter', when: 'Aug 2020 – Aug 2022' },
  ],
  organizing: [
    { role: 'Organizer, First International Workshop on Resilient Artificial Intelligence for Manufacturing (RAiM)', when: 'IEEE ICDM 2025, Washington, D.C.' },
    { role: 'Session chair, “Data Analytics with Manifold-valued Random Objects”', when: 'INFORMS Annual Meeting 2026, San Francisco' },
    { role: 'Session chair, “Statistical Models with Manifold-valued Random Objects”', when: 'INFORMS Annual Meeting 2025, Atlanta' },
    { role: 'Session chair, “Computation Services and Data Quality in Manufacturing Industrial Internet”', when: 'INFORMS Annual Meeting 2024, Seattle' },
    { role: 'Session chair, “Computation Services in Cyber-Physical Systems”', when: 'INFORMS Annual Meeting 2023, Phoenix' },
    { role: 'Session co-chair, “Computation Services in Manufacturing Industrial Internet”', when: 'INFORMS Annual Meeting 2022, Indianapolis' },
  ],
  reviewer: [
    'IISE Transactions',
    'IEEE Transactions on Industrial Informatics',
    'IEEE Transactions on Automation Science and Engineering',
    'Journal of Manufacturing Systems',
    'Journal of Manufacturing Science and Engineering',
    'ASME Journal of Computing and Information Science in Engineering',
    'INFORMS Journal on Computing',
    'Journal of Statistical Computation and Simulation',
  ],
  memberships: ['INFORMS (2019–present)', 'IEEE (2021–present)'],
};
