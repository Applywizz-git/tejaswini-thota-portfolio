// Portfolio Content - Tejaswini Thota
// Resume-based content with TBD placeholders for missing information

export const personalInfo = {
  name: "Tejaswini Thota",
  title: "Business Intelligence (BI) Analyst",
  location: "Cary, NC, USA",
  email: "tejaswini0879@gmail.com",
  phone: "+1 (984) 332-9962",
  profileImage: "/assets/profile.jpg",
  
  socials: {
    linkedin: "https://www.linkedin.com/in/tejaswini8/",
    github: "TBD", // To be added later
    twitter: "TBD", // To be added later
  },
  
  tagline: "Business Intelligence Analyst with 4+ years building enterprise BI, ETL, and KPI dashboards improving accuracy, uptime, and leadership decision-making.",
  
  about: `Business Intelligence Analyst with 4+ years delivering BI/reporting solutions across finance, media, and tech. Experienced in Tableau, Power BI, SQL (Oracle, SQL Server, Snowflake), Python, and AWS. Built ETL pipelines, data models, and executive KPI dashboards; automated reconciliation and incident tracking; improved query performance and observability integrating Splunk/ServiceNow and CloudWatch. Worked in Agile-Scrum and ITIL settings, led BI teams, and delivered scalable solutions that reduced manual effort and boosted reporting accuracy (60%+) and system availability (99.9%). Focused on reliability, SLA adherence, and end-to-end analytics workflows.`,
};

export const experience = [
  {
    company: "Cognizant",
    role: "Lead BI Analyst",
    duration: "Jul 2021 – May 2024",
    location: "Remote",
    achievements: [
      "Led 8-member BI/analytics team; ensured 99.9% availability & SLA adherence.",
      "Built interactive Tableau executive dashboards for SLA performance & incident trends.",
      "Automated reconciliation & incident tracking (Python ETL + Snowflake + ServiceNow; ↑ accuracy 35%).",
      "Optimized Oracle/SQL Server procedures & indexing (↓ execution time 50%).",
      "Integrated Splunk + ServiceNow escalation → ↓ downtime 30%.",
      "Integrated CloudWatch metrics into Snowflake pipelines (↓ rollbacks 20%).",
      "ITIL workshops reduced recurring incidents 25%.",
      "Automated reporting suite ↑ decision accuracy 60%, ↓ manual workload 70%.",
    ],
  },
  {
    company: "Qspider",
    role: "Reporting Analyst",
    duration: "Jan 2020 – May 2021",
    location: "Hyderabad, India",
    achievements: [
      "Built Tableau dashboards and Excel KPI trackers to visualize SLA compliance and incident trends, enabling faster data-driven operational decisions.",
      "Increased reconciliation accuracy by 20% by engineering SQL queries across Oracle/SQL Server datasets.",
      "Automated anomaly detection with Python + Linux shell workflows (↓ manual effort 35%).",
      "Streamlined monthly reporting (↓ turnaround 25%) using Excel VBA macros and pivot models.",
      "Validated ETL pipelines during migration projects, resolving discrepancies and ensuring data quality.",
      "Defined KPIs with finance/ops stakeholders, aligning BI outputs with business needs.",
      "Reduced recurring issues 18% via ITIL-aligned analysis and preventive reconciliation checks.",
      "Authored BI documentation & onboarding guides (↓ ramp-up time 30%).",
    ],
  },
];

export const skills = {
  "Analytics/Visualization": [
    { name: "Tableau", percentage: "PERCENT_TBD" },
    { name: "Power BI", percentage: "PERCENT_TBD" },
    { name: "SSRS", percentage: "PERCENT_TBD" },
    { name: "Advanced Excel", percentage: "PERCENT_TBD" },
  ],
  
  "Programming/Data": [
    { name: "Python", percentage: "PERCENT_TBD" },
    { name: "SQL", percentage: "PERCENT_TBD" },
    { name: "PySpark", percentage: "PERCENT_TBD" },
    { name: "Shell/PowerShell", percentage: "PERCENT_TBD" },
  ],
  
  "Data Engineering/DB": [
    { name: "Snowflake", percentage: "PERCENT_TBD" },
    { name: "Oracle", percentage: "PERCENT_TBD" },
    { name: "SQL Server", percentage: "PERCENT_TBD" },
    { name: "MongoDB", percentage: "PERCENT_TBD" },
    { name: "ETL/DWH", percentage: "PERCENT_TBD" },
    { name: "Data Governance", percentage: "PERCENT_TBD" },
  ],
  
  "Cloud/DevOps": [
    { name: "AWS", percentage: "PERCENT_TBD" },
    { name: "Docker", percentage: "PERCENT_TBD" },
    { name: "Kubernetes", percentage: "PERCENT_TBD" },
    { name: "Jenkins", percentage: "PERCENT_TBD" },
    { name: "Terraform", percentage: "PERCENT_TBD" },
  ],
  
  "Monitoring/ITSM": [
    { name: "ServiceNow", percentage: "PERCENT_TBD" },
    { name: "Splunk", percentage: "PERCENT_TBD" },
    { name: "Prometheus", percentage: "PERCENT_TBD" },
    { name: "Grafana", percentage: "PERCENT_TBD" },
    { name: "ELK Stack", percentage: "PERCENT_TBD" },
  ],
  
  "Process/QA": [
    { name: "Agile-Scrum", percentage: "PERCENT_TBD" },
    { name: "ITIL", percentage: "PERCENT_TBD" },
    { name: "HP ALM", percentage: "PERCENT_TBD" },
    { name: "LoadRunner", percentage: "PERCENT_TBD" },
  ],
};

export const projects = [
  {
    title: "Automated BI & Incident Analytics Platform",
    shortDesc: "Processed logs from 70+ enterprise apps using Python, Splunk, ServiceNow; automated incidents & reduced resolution time by 40%.",
    tech: ["Python", "Splunk", "ServiceNow", "AWS EC2", "Snowflake", "Tableau"],
    linkDemo: "",
    linkCode: "",
    impactMetric: "Improved SLA prioritization accuracy by 30%.",
    image: "/project1.png",
    hidden: false,
  },
  {
    title: "Data Analytics & Reporting Automation",
    shortDesc: "Built ETL pipelines with Python, SQL, Airflow; implemented CI/CD for Tableau dashboards via Git + Tableau Server.",
    tech: ["Python", "SQL", "Airflow", "Git", "Tableau", "Snowflake"],
    linkDemo: "",
    linkCode: "",
    impactMetric: "↑ reporting accuracy 80%, ↓ manual effort 80%, enabled SLA trend dashboards driving 60% faster decisions.",
    image: "/project2.png",
    hidden: false,
  },
  {
    title: "DevOps-Driven Business Health Monitoring",
    shortDesc: "Created Jenkins pipelines for automated health checks; centralized metrics in Prometheus/Grafana with Slack alerts.",
    tech: ["Jenkins", "Docker", "Python", "Shell", "Prometheus", "Grafana", "Slack"],
    linkDemo: "",
    linkCode: "",
    impactMetric: "↓ system downtime 35%, accelerated anomaly detection 45%, ↓ rollback incidents 20%.",
    image: "/project3.png",
    hidden: false,
  },
  {
    title: "TBD",
    shortDesc: "Add later",
    tech: [],
    linkDemo: "",
    linkCode: "",
    impactMetric: "",
    hidden: true,
  },
  {
    title: "TBD",
    shortDesc: "Add later",
    tech: [],
    linkDemo: "",
    linkCode: "",
    impactMetric: "",
    hidden: true,
  },
  {
    title: "TBD",
    shortDesc: "Add later",
    tech: [],
    linkDemo: "",
    linkCode: "",
    impactMetric: "",
    hidden: true,
  },
];

export const education = {
  degree: "Bachelor of Technology in Computer Science & Engineering",
  school: "Jawaharlal Nehru Technological University (JNTU)",
  location: "Hyderabad, India",
  years: "May 2016 – Sep 2020",
  brief: "Foundation in CS fundamentals, algorithms, databases, and software engineering.",
};

export const certifications = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    year: "",
  },
  {
    name: "IBM Data Analyst Professional Certificate",
    issuer: "Coursera", 
    year: "",
  },
  {
    name: "Data Visualization with Tableau",
    issuer: "Coursera",
    year: "",
  },
  {
    name: "SQL for Data Science",
    issuer: "Coursera",
    year: "",
  },
  {
    name: "Power BI Essential Training",
    issuer: "LinkedIn Learning",
    year: "",
  },
];

export const contact = {
  title: "Let's Build Something Amazing Together",
  subtitle: "Ready to transform data into actionable insights? Let's discuss your next BI project.",
  cta: "Get In Touch",
};

export const seoMeta = {
  title: "Tejaswini Thota - Business Intelligence Analyst | BI & Analytics Expert",
  description: "4+ years BI Analyst specializing in Tableau, Power BI, SQL, Python & AWS. Built enterprise dashboards, ETL pipelines & automated reporting solutions.",
  keywords: "Business Intelligence Analyst, BI Developer, Tableau Expert, Power BI, SQL, Python, Data Analytics, ETL, Snowflake, AWS",
  ogImage: "/assets/og-image.jpg",
  canonical: "https://tejaswini-portfolio.com",
};