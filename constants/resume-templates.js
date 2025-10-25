// Resume template definitions with default data structure
export const RESUME_TEMPLATES = {
  professional: {
    id: "professional",
    name: "Professional",
    description: "A clean, ATS-friendly professional resume layout.",
    colors: {
      primary: "#1a1a1a",
      accent: "#0066cc",
      background: "#ffffff",
    },
    fonts: {
      heading: "sans-serif",
      body: "sans-serif",
    },
  },
};

// Default Resume Data (ATS-friendly)
export const DEFAULT_RESUME_DATA = {
  personalInfo: {
    fullName: "Mark Gates",
    email: "Mark123@gmail.com",
    phone: "+123-45678",
    location: "United States",
    summary:
      "Software Developer with over 5 years of experience designing, developing, and deploying scalable software solutions. Currently driving innovation at Google by enhancing high-traffic applications and integrating Google Cloud Platform services. Achieved a 30% improvement in performance through codebase optimization and reduced deployment time by 40% using CI/CD automation.",
  },

  experience: [
    {
      id: "1",
      company: "Meta",
      position: "Software Developer",
      startDate: "2022-07",
      endDate: "2025-06",
      bullets: [
        "Designed and implemented scalable software solutions for high-traffic applications used by millions of users.",
        "Collaborated with cross-functional teams to deliver new features following agile methodologies.",
        "Optimized existing codebase, improving application performance by approximately 30%.",
        "Led the integration of Google Cloud services to enhance system reliability.",
      ],
    },
    {
      id: "2",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      startDate: "2022-01",
      endDate: "2022-06",
      bullets: [
        "Developed and maintained web applications using JavaScript, React, and Node.js.",
        "Implemented RESTful APIs and integrated third-party services to extend application functionality.",
        "Participated in code reviews and contributed to improving development processes.",
        "Reduced bug rate by 25% through rigorous testing and debugging practices.",
      ],
    },
    {
      id: "3",
      company: "InnovateTech",
      position: "Junior Software Developer",
      startDate: "2018-05",
      endDate: "2018-07",
      bullets: [
        "Assisted in developing internal tools and client-facing applications.",
        "Collaborated with senior developers to learn best practices and improve coding skills.",
        "Contributed to documentation and user manuals for software deployment.",
      ],
    },
  ],

  education: [
    {
      id: "1",
      school: "Yale University",
      degree: "Bachelor's Degree in Computer Science",
      field: "Computer Science",
      graduationDate: "2016-06",
    },
  ],

  projects: [
    {
      id: "1",
      name: "Automated Deployment Pipeline (Google)",
      description:
        "Developed a CI/CD pipeline using Jenkins and Docker to automate application deployment, reducing deployment time by 40% and minimizing manual errors.",
      technologies: "Jenkins, Docker, Kubernetes, Webpack, Babel",
    },
    {
      id: "2",
      name: "Open Source Contribution: React Component Library",
      description:
        "Contributed to an open-source React component library, improving accessibility features and enhancing user experience for developers.",
      technologies: "React, TypeScript, Jest",
    },
  ],

  certifications: [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-05",
    },
    {
      id: "2",
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2022-11",
    },
  ],

  skills: [
    // Languages
    { id: "1", name: "Java", category: "Languages" },
    { id: "2", name: "C++", category: "Languages" },
    { id: "3", name: "JavaScript", category: "Languages" },
    { id: "4", name: "Python", category: "Languages" },
    { id: "5", name: "TypeScript", category: "Languages" },
    { id: "6", name: "SQL", category: "Languages" },

    // Frameworks
    { id: "7", name: "React", category: "Frameworks" },
    { id: "8", name: "Angular", category: "Frameworks" },
    { id: "9", name: "Node.js", category: "Frameworks" },
    { id: "10", name: "Express", category: "Frameworks" },
    { id: "11", name: "Spring Boot", category: "Frameworks" },
    { id: "12", name: "Django", category: "Frameworks" },

    // Tools
    { id: "13", name: "Git", category: "Tools" },
    { id: "14", name: "Docker", category: "Tools" },
    { id: "15", name: "Jenkins", category: "Tools" },
    { id: "16", name: "Kubernetes", category: "Tools" },
    { id: "17", name: "Webpack", category: "Tools" },
    { id: "18", name: "Babel", category: "Tools" },

    // Cloud & Infrastructure
    {
      id: "19",
      name: "Google Cloud Platform",
      category: "Cloud & Infrastructure",
    },
    { id: "20", name: "AWS", category: "Cloud & Infrastructure" },
    { id: "21", name: "Azure", category: "Cloud & Infrastructure" },
    { id: "22", name: "Firebase", category: "Cloud & Infrastructure" },
    { id: "23", name: "Docker Swarm", category: "Cloud & Infrastructure" },
    { id: "24", name: "Terraform", category: "Cloud & Infrastructure" },

    // Development Practices
    { id: "25", name: "Agile", category: "Dev Practices" },
    { id: "26", name: "Scrum", category: "Dev Practices" },
    { id: "27", name: "Kanban", category: "Dev Practices" },
    {
      id: "28",
      name: "Test-Driven Development (TDD)",
      category: "Dev Practices",
    },
    {
      id: "29",
      name: "Continuous Integration (CI)",
      category: "Dev Practices",
    },
    { id: "30", name: "Continuous Deployment (CD)", category: "Dev Practices" },
  ],
};

// Section visibility options
export const SECTION_VISIBILITY_OPTIONS = [
  { id: "personalInfo", label: "Personal Info", default: true },
  { id: "summary", label: "Professional Summary", default: true },
  { id: "experience", label: "Experience", default: true },
  { id: "education", label: "Education", default: true },
  { id: "projects", label: "Projects", default: true },
  {
    id: "certifications",
    label: "Certifications & Achievements",
    default: true,
  },
  { id: "skills", label: "Skills", default: true },
];

// ATS-safe font options
export const FONT_OPTIONS = [
  { value: "sans-serif", label: "Sans Serif (ATS Safe)" },
  { value: "serif", label: "Serif (ATS Safe)" },
  { value: "monospace", label: "Monospace (Clean Developer Style)" },
];

// Color presets (ATS-safe)
export const COLOR_PRESETS = [
  { name: "Blue", primary: "#0066cc", accent: "#0052a3" },
  { name: "Green", primary: "#27ae60", accent: "#229954" },
  { name: "Purple", primary: "#8e44ad", accent: "#7d3c98" },
  { name: "Red", primary: "#e74c3c", accent: "#c0392b" },
  { name: "Gray", primary: "#34495e", accent: "#2c3e50" },
  { name: "Dark", primary: "#1a1a1a", accent: "#333333" },
];
