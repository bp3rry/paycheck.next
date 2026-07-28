// ATS keyword library organized by role/industry

export interface KeywordCategory {
  id: string;
  role: string;
  emoji: string;
  description: string;
  sections: KeywordSection[];
}

export interface KeywordSection {
  label: string;
  keywords: string[];
}

export const KEYWORD_CATEGORIES: KeywordCategory[] = [
  {
    id: "software-engineer",
    role: "Software Engineer",
    emoji: "💻",
    description: "Full-stack, backend, and frontend engineering roles",
    sections: [
      {
        label: "Languages & Frameworks",
        keywords: [
          "TypeScript", "JavaScript", "Python", "Java", "Go", "Rust", "C++", "C#",
          "React", "Next.js", "Angular", "Vue.js", "Node.js", "Express", "FastAPI",
          "Spring Boot", "Django", "Rails",
        ],
      },
      {
        label: "Infrastructure & Cloud",
        keywords: [
          "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD",
          "GitHub Actions", "Jenkins", "Helm", "Linux", "Bash",
        ],
      },
      {
        label: "Data & Storage",
        keywords: [
          "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB",
          "SQL", "NoSQL", "GraphQL", "REST API", "gRPC",
        ],
      },
      {
        label: "Practices & Concepts",
        keywords: [
          "Agile", "Scrum", "TDD", "BDD", "Microservices", "System Design",
          "Distributed Systems", "Object-Oriented Programming", "Functional Programming",
          "Code Review", "Pair Programming", "Git", "Version Control",
        ],
      },
      {
        label: "Soft Skills",
        keywords: [
          "Cross-functional collaboration", "Technical leadership", "Mentoring",
          "Problem-solving", "Communication", "Stakeholder management",
        ],
      },
    ],
  },
  {
    id: "data-scientist",
    role: "Data Scientist",
    emoji: "📊",
    description: "Data science, ML engineering, and analytics roles",
    sections: [
      {
        label: "ML & AI",
        keywords: [
          "Machine Learning", "Deep Learning", "NLP", "LLM", "Generative AI",
          "Computer Vision", "Reinforcement Learning", "Feature Engineering",
          "Model Deployment", "MLOps", "A/B Testing",
        ],
      },
      {
        label: "Tools & Frameworks",
        keywords: [
          "Python", "TensorFlow", "PyTorch", "scikit-learn", "Hugging Face",
          "Spark", "Pandas", "NumPy", "Jupyter", "SQL", "dbt", "Airflow",
        ],
      },
      {
        label: "Statistics & Analysis",
        keywords: [
          "Statistical Analysis", "Hypothesis Testing", "Regression Analysis",
          "Classification", "Clustering", "Time Series", "Bayesian Inference",
          "Experimental Design", "Data Visualization",
        ],
      },
      {
        label: "Platforms",
        keywords: [
          "AWS SageMaker", "Google Vertex AI", "Azure ML", "Databricks",
          "Snowflake", "BigQuery", "Redshift",
        ],
      },
    ],
  },
  {
    id: "product-manager",
    role: "Product Manager",
    emoji: "🗺️",
    description: "Product management and product owner roles",
    sections: [
      {
        label: "Core PM Skills",
        keywords: [
          "Product Roadmap", "Product Strategy", "Go-to-Market Strategy",
          "User Research", "Customer Discovery", "Market Analysis",
          "Competitive Analysis", "Product Lifecycle Management",
          "OKRs", "KPIs", "Success Metrics",
        ],
      },
      {
        label: "Process & Methodologies",
        keywords: [
          "Agile", "Scrum", "Kanban", "Sprint Planning", "Backlog Grooming",
          "User Stories", "A/B Testing", "Data-driven Decision Making",
          "MVP", "Iteration", "Prioritization Frameworks",
        ],
      },
      {
        label: "Tools",
        keywords: [
          "Jira", "Confluence", "Figma", "Miro", "Amplitude", "Mixpanel",
          "SQL", "Looker", "Tableau", "Salesforce",
        ],
      },
      {
        label: "Soft Skills",
        keywords: [
          "Cross-functional leadership", "Stakeholder management",
          "Executive communication", "Influence without authority",
          "Strategic thinking", "Customer empathy",
        ],
      },
    ],
  },
  {
    id: "devops-sre",
    role: "DevOps / SRE",
    emoji: "⚙️",
    description: "DevOps, SRE, platform engineering, and infrastructure roles",
    sections: [
      {
        label: "Infrastructure & Cloud",
        keywords: [
          "AWS", "GCP", "Azure", "Terraform", "Ansible", "Pulumi",
          "Infrastructure as Code (IaC)", "Linux", "Networking", "DNS", "TLS/SSL",
        ],
      },
      {
        label: "Containers & Orchestration",
        keywords: [
          "Docker", "Kubernetes", "Helm", "Istio", "Service Mesh",
          "Container Security", "EKS", "GKE", "AKS",
        ],
      },
      {
        label: "CI/CD & Automation",
        keywords: [
          "CI/CD", "GitHub Actions", "Jenkins", "GitLab CI", "ArgoCD",
          "Flux", "Bash", "Python", "Automation",
        ],
      },
      {
        label: "Observability",
        keywords: [
          "Prometheus", "Grafana", "Datadog", "PagerDuty", "OpenTelemetry",
          "SLO/SLA/SLI", "Incident Management", "Observability", "Logging",
          "Monitoring", "Alerting",
        ],
      },
      {
        label: "Security & Compliance",
        keywords: [
          "DevSecOps", "Vulnerability Scanning", "SIEM", "IAM", "Zero Trust",
          "SOC 2", "GDPR", "Security Best Practices",
        ],
      },
    ],
  },
  {
    id: "data-engineer",
    role: "Data Engineer",
    emoji: "🔧",
    description: "Data engineering, data platform, and data pipeline roles",
    sections: [
      {
        label: "Languages & Frameworks",
        keywords: [
          "Python", "SQL", "Scala", "Java", "Spark", "Flink", "Kafka",
          "dbt", "Airflow", "Prefect", "Luigi",
        ],
      },
      {
        label: "Warehouses & Databases",
        keywords: [
          "Snowflake", "BigQuery", "Redshift", "Databricks", "Delta Lake",
          "Iceberg", "PostgreSQL", "MySQL", "MongoDB", "Elasticsearch",
        ],
      },
      {
        label: "Cloud & Infrastructure",
        keywords: [
          "AWS", "GCP", "Azure", "S3", "GCS", "Lambda", "EMR",
          "Dataflow", "Docker", "Kubernetes", "Terraform",
        ],
      },
      {
        label: "Data Concepts",
        keywords: [
          "ETL", "ELT", "Data Modeling", "Data Warehouse", "Data Lake",
          "Data Lakehouse", "Dimensional Modeling", "Star Schema",
          "Data Quality", "Data Governance", "Streaming", "Batch Processing",
        ],
      },
    ],
  },
  {
    id: "marketing",
    role: "Marketing",
    emoji: "📣",
    description: "Digital marketing, growth, and brand roles",
    sections: [
      {
        label: "Digital Marketing",
        keywords: [
          "SEO", "SEM", "PPC", "Google Ads", "Meta Ads", "LinkedIn Ads",
          "Email Marketing", "Content Marketing", "Social Media Marketing",
          "Conversion Rate Optimization (CRO)", "Landing Page Optimization",
        ],
      },
      {
        label: "Analytics & Tools",
        keywords: [
          "Google Analytics 4", "HubSpot", "Salesforce", "Marketo", "Mailchimp",
          "Looker", "Tableau", "SQL", "A/B Testing", "Funnel Analysis",
          "Customer Segmentation",
        ],
      },
      {
        label: "Strategy",
        keywords: [
          "Go-to-Market Strategy", "Demand Generation", "Lead Generation",
          "Customer Acquisition", "Retention Marketing", "Brand Strategy",
          "Market Research", "Competitive Analysis", "Product Marketing",
        ],
      },
      {
        label: "Metrics",
        keywords: [
          "CAC", "LTV", "ROAS", "CTR", "CPL", "MQL", "SQL",
          "Pipeline", "Revenue Growth", "Churn Rate", "NPS",
        ],
      },
    ],
  },
  {
    id: "finance",
    role: "Finance / Accounting",
    emoji: "💰",
    description: "Finance, accounting, and FP&A roles",
    sections: [
      {
        label: "Core Finance Skills",
        keywords: [
          "Financial Modeling", "Financial Analysis", "Forecasting", "Budgeting",
          "FP&A", "Variance Analysis", "DCF", "Valuation", "M&A",
          "Due Diligence", "Capital Allocation",
        ],
      },
      {
        label: "Accounting",
        keywords: [
          "GAAP", "IFRS", "Month-end Close", "General Ledger", "Accounts Payable",
          "Accounts Receivable", "Financial Statements", "Audit", "Tax",
          "Revenue Recognition",
        ],
      },
      {
        label: "Tools",
        keywords: [
          "Excel", "SAP", "Oracle", "NetSuite", "QuickBooks", "Power BI",
          "Tableau", "SQL", "Python",
        ],
      },
      {
        label: "Concepts & Metrics",
        keywords: [
          "P&L", "Balance Sheet", "Cash Flow", "EBITDA", "IRR", "NPV",
          "Working Capital", "KPIs", "Risk Management", "Compliance",
        ],
      },
    ],
  },
  {
    id: "ux-design",
    role: "UX / Product Design",
    emoji: "🎨",
    description: "UX, product design, and research roles",
    sections: [
      {
        label: "Design Skills",
        keywords: [
          "User Research", "UX Design", "UI Design", "Interaction Design",
          "Visual Design", "Information Architecture", "Wireframing",
          "Prototyping", "Usability Testing", "Accessibility",
        ],
      },
      {
        label: "Tools",
        keywords: [
          "Figma", "Sketch", "Adobe XD", "InVision", "Maze", "UserTesting",
          "Hotjar", "Optimal Workshop", "Miro",
        ],
      },
      {
        label: "Methods",
        keywords: [
          "Design Thinking", "Human-Centered Design", "Jobs-to-be-Done",
          "User Interviews", "Journey Mapping", "Persona Development",
          "A/B Testing", "Heuristic Evaluation", "Design Systems",
        ],
      },
      {
        label: "Collaboration",
        keywords: [
          "Cross-functional collaboration", "Stakeholder presentation",
          "Design critique", "Agile", "Sprint",
        ],
      },
    ],
  },
];

export function searchKeywords(
  query: string,
  categoryId?: string
): { category: KeywordCategory; section: KeywordSection; keyword: string }[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  const results: { category: KeywordCategory; section: KeywordSection; keyword: string }[] = [];
  const categories = categoryId
    ? KEYWORD_CATEGORIES.filter((c) => c.id === categoryId)
    : KEYWORD_CATEGORIES;

  for (const category of categories) {
    for (const section of category.sections) {
      for (const keyword of section.keywords) {
        if (keyword.toLowerCase().includes(lower)) {
          results.push({ category, section, keyword });
        }
      }
    }
  }

  return results;
}
