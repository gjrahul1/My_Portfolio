// Mock data for G.J. Rahul's portfolio

export const mockExperienceData = [
  {
    position: "AI/ML Product Engineer",
    company: "MNR Technologies Global Pvt Ltd",
    location: "Hyderabad, Telangana, India",
    duration: "August 2025 - September 2025 (2 months)",
    description: "Designed and developed end-to-end AI Pipelines and workflows"
  },
  {
    position: "AI Developer Intern",
    company: "MNR Technologies Global Pvt Ltd", 
    location: "Hyderabad, Telangana, India",
    duration: "June 2025 - July 2025 (2 months)",
    description: "Designed and developed end-to-end AI Pipelines and workflows"
  },
  {
    position: "Gen AI Intern",
    company: "Innomatics Research Labs",
    location: "Remote",
    duration: "January 2025 - April 2025 (4 months)",
    description: "Worked on Generative AI projects and research initiatives"
  },
  {
    position: "Machine Learning Engineer",
    company: "Feynn Labs Consultancy Services",
    location: "Remote",
    duration: "December 2024 - March 2025 (4 months)",
    description: "AI product/service Prototyping and Market Segmentation"
  },
  {
    position: "Data Science Trainee",
    company: "Meta Scifor Technologies",
    location: "Bengaluru, Karnataka, India",
    duration: "October 2024 - March 2025 (6 months)",
    description: "Comprehensive training in data science methodologies and machine learning techniques"
  }
];

export const mockEducationData = [
  {
    degree: "Bachelor of Engineering",
    field: "Information Science & Engineering",
    institution: "AMC Engineering College",
    duration: "December 2021 - August 2025",
    description: "Focused on computer science fundamentals with specialization in AI/ML"
  },
  {
    degree: "Senior Secondary (XII)",
    field: "Science",
    institution: "Surana College", 
    duration: "2019 - 2021",
    description: "Science stream with focus on Mathematics and Physics"
  },
  {
    degree: "Secondary (X)",
    field: "Science",
    institution: "A.P.S. Public School",
    duration: "2019",
    description: "Secondary education with strong foundation in sciences"
  }
];

export const mockProjectsData = [
  {
    title: "MedLabs",
    description: "AI-powered medical laboratory management system with intelligent diagnostics and automated reporting",
    technologies: ["Python", "Machine Learning", "Healthcare AI", "Data Analytics"],
    githubUrl: "https://github.com/gjrahul1/MedLabs",
    status: "Active"
  }
  // Commented out placeholder projects for future use
  /*
  {
    title: "AI Pipeline Optimizer",
    description: "End-to-end ML pipeline optimization tool for production environments",
    technologies: ["Python", "MLOps", "Docker", "Kubernetes"],
    githubUrl: "#",
    status: "In Development"
  },
  {
    title: "RAG-Enhanced Chatbot",
    description: "Retrieval-Augmented Generation chatbot for technical documentation",
    technologies: ["LangChain", "Vector Databases", "LLMs", "FastAPI"],
    githubUrl: "#",
    status: "Completed"
  },
  {
    title: "Generative AI Studio",
    description: "Multi-modal AI content generation platform",
    technologies: ["Transformers", "Diffusion Models", "React", "Node.js"],
    githubUrl: "#",
    status: "Planning"
  }
  */
];

export const mockBlogData = [
  {
    title: "The Complete AI Playground: Concepts, Challenges, and Innovations",
    excerpt: "Exploring the fascinating world of AI/ML from fundamental concepts to cutting-edge innovations. A comprehensive guide through the challenges and breakthroughs shaping the future of artificial intelligence.",
    readTime: "8 min read",
    publishDate: "Coming Soon",
    category: "AI/ML Deep Dive"
  }
];

export const mockSkillsData = {
  // Larger fonts for more important/experienced technologies
  primary: [
    { name: "Python", importance: 9 },
    { name: "Machine Learning", importance: 9 },
    { name: "Deep Learning", importance: 8 },
    { name: "LLMs", importance: 8 },
    { name: "RAG", importance: 7 }
  ],
  secondary: [
    { name: "TensorFlow", importance: 6 },
    { name: "PyTorch", importance: 6 },
    { name: "Generative AI", importance: 7 },
    { name: "MLOps", importance: 6 },
    { name: "Data Science", importance: 7 }
  ],
  tertiary: [
    { name: "Docker", importance: 5 },
    { name: "Kubernetes", importance: 5 },
    { name: "FastAPI", importance: 5 },
    { name: "React", importance: 4 },
    { name: "Node.js", importance: 4 },
    { name: "MongoDB", importance: 4 },
    { name: "Git", importance: 5 },
    { name: "AWS", importance: 5 }
  ],
  lowCode: [
    { name: "AutoML", importance: 3 },
    { name: "No-Code ML", importance: 3 },
    { name: "Zapier", importance: 2 },
    { name: "Make.com", importance: 2 }
  ]
};