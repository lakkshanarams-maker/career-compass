export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface JobRole {
  id: string;
  title: string;
  company: string;
  matchPercentage: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  salary: string;
  type: string;
  description: string;
}

export interface CareerPath {
  id: string;
  role: string;
  level: string;
  yearsExperience: string;
  skills: string[];
  salary: string;
  nextRoles: string[];
}

export interface LearningResource {
  id: string;
  skill: string;
  title: string;
  platform: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url: string;
}

export const userSkills: Skill[] = [
  { name: "JavaScript", level: 85, category: "Programming" },
  { name: "React", level: 75, category: "Framework" },
  { name: "Python", level: 60, category: "Programming" },
  { name: "HTML/CSS", level: 90, category: "Web" },
  { name: "Node.js", level: 55, category: "Backend" },
  { name: "Git", level: 70, category: "Tools" },
  { name: "SQL", level: 50, category: "Database" },
  { name: "TypeScript", level: 65, category: "Programming" },
];

export const jobRoles: JobRole[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    matchPercentage: 87,
    requiredSkills: ["JavaScript", "React", "HTML/CSS", "TypeScript", "Git"],
    matchedSkills: ["JavaScript", "React", "HTML/CSS", "TypeScript", "Git"],
    missingSkills: [],
    salary: "$70,000 - $90,000",
    type: "Full-time",
    description: "Build responsive web applications using modern frameworks.",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    matchPercentage: 72,
    requiredSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
    matchedSkills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    missingSkills: ["AWS"],
    salary: "$85,000 - $110,000",
    type: "Full-time",
    description: "End-to-end development of web applications and APIs.",
  },
  {
    id: "3",
    title: "React Developer",
    company: "DigitalAgency",
    matchPercentage: 92,
    requiredSkills: ["JavaScript", "React", "TypeScript", "HTML/CSS"],
    matchedSkills: ["JavaScript", "React", "TypeScript", "HTML/CSS"],
    missingSkills: [],
    salary: "$75,000 - $95,000",
    type: "Full-time",
    description: "Create beautiful user interfaces with React and TypeScript.",
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "BigTech Inc",
    matchPercentage: 65,
    requiredSkills: ["Python", "Java", "SQL", "System Design", "Data Structures"],
    matchedSkills: ["Python", "SQL"],
    missingSkills: ["Java", "System Design", "Data Structures"],
    salary: "$100,000 - $140,000",
    type: "Full-time",
    description: "Build scalable backend systems and services.",
  },
  {
    id: "5",
    title: "Junior Data Analyst",
    company: "DataCo",
    matchPercentage: 58,
    requiredSkills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
    matchedSkills: ["Python", "SQL"],
    missingSkills: ["Excel", "Tableau", "Statistics"],
    salary: "$55,000 - $70,000",
    type: "Full-time",
    description: "Analyze data and create insights for business decisions.",
  },
];

export const careerPaths: CareerPath[] = [
  {
    id: "1",
    role: "Junior Developer",
    level: "Entry",
    yearsExperience: "0-2 years",
    skills: ["HTML/CSS", "JavaScript", "Git"],
    salary: "$50,000 - $70,000",
    nextRoles: ["2", "3"],
  },
  {
    id: "2",
    role: "Frontend Developer",
    level: "Mid",
    yearsExperience: "2-4 years",
    skills: ["React", "TypeScript", "Testing"],
    salary: "$70,000 - $95,000",
    nextRoles: ["4", "5"],
  },
  {
    id: "3",
    role: "Backend Developer",
    level: "Mid",
    yearsExperience: "2-4 years",
    skills: ["Node.js", "Python", "SQL", "APIs"],
    salary: "$75,000 - $100,000",
    nextRoles: ["4", "6"],
  },
  {
    id: "4",
    role: "Full Stack Developer",
    level: "Senior",
    yearsExperience: "4-6 years",
    skills: ["System Design", "DevOps", "Leadership"],
    salary: "$100,000 - $130,000",
    nextRoles: ["7", "8"],
  },
  {
    id: "5",
    role: "UI/UX Engineer",
    level: "Senior",
    yearsExperience: "4-6 years",
    skills: ["Design Systems", "Animation", "Accessibility"],
    salary: "$95,000 - $125,000",
    nextRoles: ["8"],
  },
  {
    id: "6",
    role: "DevOps Engineer",
    level: "Senior",
    yearsExperience: "4-6 years",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    salary: "$110,000 - $140,000",
    nextRoles: ["7"],
  },
  {
    id: "7",
    role: "Tech Lead",
    level: "Lead",
    yearsExperience: "6-10 years",
    skills: ["Architecture", "Team Management", "Strategy"],
    salary: "$140,000 - $180,000",
    nextRoles: ["9"],
  },
  {
    id: "8",
    role: "Principal Engineer",
    level: "Principal",
    yearsExperience: "8+ years",
    skills: ["Technical Vision", "Mentoring", "Innovation"],
    salary: "$160,000 - $220,000",
    nextRoles: ["9"],
  },
  {
    id: "9",
    role: "CTO / VP Engineering",
    level: "Executive",
    yearsExperience: "10+ years",
    skills: ["Business Strategy", "Organization Design", "Executive Leadership"],
    salary: "$200,000+",
    nextRoles: [],
  },
];

export const learningResources: LearningResource[] = [
  {
    id: "1",
    skill: "AWS",
    title: "AWS Cloud Practitioner Essentials",
    platform: "AWS Training",
    duration: "6 hours",
    difficulty: "Beginner",
    url: "#",
  },
  {
    id: "2",
    skill: "AWS",
    title: "AWS Solutions Architect Associate",
    platform: "Udemy",
    duration: "40 hours",
    difficulty: "Intermediate",
    url: "#",
  },
  {
    id: "3",
    skill: "System Design",
    title: "Grokking System Design",
    platform: "Educative",
    duration: "20 hours",
    difficulty: "Intermediate",
    url: "#",
  },
  {
    id: "4",
    skill: "Data Structures",
    title: "Data Structures & Algorithms",
    platform: "LeetCode",
    duration: "Self-paced",
    difficulty: "Intermediate",
    url: "#",
  },
  {
    id: "5",
    skill: "Java",
    title: "Java Programming Masterclass",
    platform: "Udemy",
    duration: "80 hours",
    difficulty: "Beginner",
    url: "#",
  },
  {
    id: "6",
    skill: "Docker",
    title: "Docker & Kubernetes Complete Guide",
    platform: "Udemy",
    duration: "22 hours",
    difficulty: "Intermediate",
    url: "#",
  },
  {
    id: "7",
    skill: "Tableau",
    title: "Tableau for Data Science",
    platform: "Coursera",
    duration: "15 hours",
    difficulty: "Beginner",
    url: "#",
  },
  {
    id: "8",
    skill: "Statistics",
    title: "Statistics for Data Science",
    platform: "Khan Academy",
    duration: "Self-paced",
    difficulty: "Beginner",
    url: "#",
  },
];

export const dashboardStats = {
  overallReadiness: 74,
  skillsAssessed: 8,
  coursesCompleted: 3,
  targetRole: "Full Stack Developer",
  weeklyProgress: [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 2 },
    { day: "Fri", hours: 1 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 2.5 },
  ],
  skillProgress: [
    { skill: "JavaScript", current: 85, target: 90 },
    { skill: "React", current: 75, target: 85 },
    { skill: "Node.js", current: 55, target: 80 },
    { skill: "AWS", current: 0, target: 70 },
    { skill: "System Design", current: 20, target: 60 },
  ],
  recentActivity: [
    { date: "Today", action: "Completed React Hooks module", type: "course" },
    { date: "Yesterday", action: "Skill assessment: TypeScript", type: "assessment" },
    { date: "2 days ago", action: "Started AWS basics course", type: "course" },
    { date: "3 days ago", action: "Updated resume", type: "resume" },
  ],
};
