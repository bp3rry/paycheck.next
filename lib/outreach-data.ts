// Outreach templates for reaching hiring managers and recruiters

export interface OutreachTemplate {
  id: string;
  channel: "linkedin" | "email";
  type: "connection" | "message" | "follow-up" | "thank-you" | "referral-ask" | "cold-outreach";
  title: string;
  description: string;
  subject?: string;
  body: string;
  tips: string[];
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  placeholder: string;
  label: string;
  example: string;
}

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: "li-connection-recruiter",
    channel: "linkedin",
    type: "connection",
    title: "LinkedIn Connection — Recruiter",
    description: "Short, personalized connection request to a recruiter at a target company.",
    body: `Hi {{RECRUITER_NAME}},

I came across your profile while researching {{COMPANY_NAME}}. I'm a {{YOUR_ROLE}} with {{YEARS}} years of experience in {{SKILL_AREA}} and I'm genuinely excited about the work your team is doing — especially {{SPECIFIC_THING}}.

I'd love to connect and stay on your radar for any relevant opportunities that come up.

Thanks for your time!
{{YOUR_NAME}}`,
    tips: [
      "Keep it under 300 characters if sending a basic connection request (LinkedIn limit).",
      "Reference something specific about the company or recruiter's posts to stand out.",
      "Don't ask for a job in the first message — lead with value and curiosity.",
      "Personalize the 'SPECIFIC_THING' field with a recent product launch, blog post, or company news.",
    ],
    variables: [
      { placeholder: "{{RECRUITER_NAME}}", label: "Recruiter's First Name", example: "Sarah" },
      { placeholder: "{{COMPANY_NAME}}", label: "Company Name", example: "Stripe" },
      { placeholder: "{{YOUR_ROLE}}", label: "Your Job Title", example: "Senior Software Engineer" },
      { placeholder: "{{YEARS}}", label: "Years of Experience", example: "7" },
      { placeholder: "{{SKILL_AREA}}", label: "Primary Skill / Domain", example: "distributed systems" },
      { placeholder: "{{SPECIFIC_THING}}", label: "Specific Company Initiative", example: "your recent expansion into embedded finance" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
    ],
  },
  {
    id: "li-message-hiring-manager",
    channel: "linkedin",
    type: "message",
    title: "LinkedIn DM — Hiring Manager (After Applying)",
    description: "Follow-up message to a hiring manager after submitting a formal application.",
    body: `Hi {{HM_NAME}},

I just applied for the {{ROLE_TITLE}} role at {{COMPANY_NAME}} (Req ID: {{REQ_ID}}) and wanted to reach out directly.

I've spent the last {{YEARS}} years {{ACHIEVEMENT_SUMMARY}} — including {{SPECIFIC_ACCOMPLISHMENT}}. I believe I can bring that same approach to {{COMPANY_NAME}}'s {{TEAM_OR_PRODUCT}}.

I know you're busy, but I'd welcome a 15-minute call to learn more about the team's current priorities. Happy to share more context if helpful.

Thanks,
{{YOUR_NAME}}`,
    tips: [
      "Send this 24–48 hours after applying — gives the application time to land in their system.",
      "Include the Req ID so they can quickly find your application.",
      "Lead with a concrete accomplishment, not a generic summary.",
      "Be specific about why THIS company — not just why you want a new job.",
      "Hiring managers get many messages; keep it to 150 words or fewer.",
    ],
    variables: [
      { placeholder: "{{HM_NAME}}", label: "Hiring Manager's First Name", example: "Marcus" },
      { placeholder: "{{ROLE_TITLE}}", label: "Role You Applied For", example: "Staff Engineer" },
      { placeholder: "{{COMPANY_NAME}}", label: "Company Name", example: "Notion" },
      { placeholder: "{{REQ_ID}}", label: "Job Req ID (if available)", example: "R-1042" },
      { placeholder: "{{YEARS}}", label: "Relevant Years of Experience", example: "5" },
      { placeholder: "{{ACHIEVEMENT_SUMMARY}}", label: "High-level Achievement Summary", example: "building high-throughput data pipelines processing 10B+ events/day" },
      { placeholder: "{{SPECIFIC_ACCOMPLISHMENT}}", label: "One Specific Accomplishment", example: "reducing P99 latency by 60% at Acme Corp" },
      { placeholder: "{{TEAM_OR_PRODUCT}}", label: "Team or Product Area", example: "API platform" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
    ],
  },
  {
    id: "email-cold-hiring-manager",
    channel: "email",
    type: "cold-outreach",
    title: "Cold Email — Hiring Manager",
    description: "Direct cold email to a hiring manager when no open role is listed.",
    subject: "{{YOUR_ROLE}} interested in {{COMPANY_NAME}} — quick intro",
    body: `Hi {{HM_NAME}},

My name is {{YOUR_NAME}} and I'm a {{YOUR_ROLE}} who has spent {{YEARS}} years helping companies {{VALUE_PROP}}.

I'm reaching out because {{COMPANY_NAME}} stands out to me for {{REASON}}. I'd love to learn about the problems your team is working on and explore whether there's a fit.

A few things I've shipped that might be relevant:
• {{ACCOMPLISHMENT_1}}
• {{ACCOMPLISHMENT_2}}
• {{ACCOMPLISHMENT_3}}

If you're open to a 20-minute call, I'd be happy to share more. If now isn't the right time, I completely understand — I'll keep an eye out for open roles.

Thanks for your time,
{{YOUR_NAME}}
{{LINKEDIN_URL}}
{{PHONE_NUMBER}}`,
    tips: [
      "Find email addresses using Hunter.io, Rocket Reach, or Apollo.io.",
      "Keep the subject line specific — include your role and the company name.",
      "Three concise bullet accomplishments are more powerful than a paragraph.",
      "Send on Tuesday–Thursday between 8–10 AM local time for best open rates.",
      "Follow up once after 5 business days if you don't hear back.",
    ],
    variables: [
      { placeholder: "{{HM_NAME}}", label: "Hiring Manager's First Name", example: "Jordan" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
      { placeholder: "{{YOUR_ROLE}}", label: "Your Job Title", example: "Senior Product Manager" },
      { placeholder: "{{YEARS}}", label: "Years of Experience", example: "8" },
      { placeholder: "{{VALUE_PROP}}", label: "Core Value You Deliver", example: "launch 0→1 products that scale to millions of users" },
      { placeholder: "{{COMPANY_NAME}}", label: "Company Name", example: "Linear" },
      { placeholder: "{{REASON}}", label: "Specific Reason You're Interested", example: "your focus on developer experience and async-first culture" },
      { placeholder: "{{ACCOMPLISHMENT_1}}", label: "Accomplishment 1", example: "Grew DAU 3x in 6 months by launching a mobile-first redesign" },
      { placeholder: "{{ACCOMPLISHMENT_2}}", label: "Accomplishment 2", example: "Cut churn by 25% by rebuilding the onboarding flow" },
      { placeholder: "{{ACCOMPLISHMENT_3}}", label: "Accomplishment 3", example: "Led a team of 6 to ship an AI feature that drove $2M ARR" },
      { placeholder: "{{LINKEDIN_URL}}", label: "LinkedIn URL", example: "linkedin.com/in/alexjohnson" },
      { placeholder: "{{PHONE_NUMBER}}", label: "Phone Number", example: "(415) 555-0123" },
    ],
  },
  {
    id: "email-follow-up",
    channel: "email",
    type: "follow-up",
    title: "Follow-up Email — After Interview",
    description: "Thank-you / follow-up note to send within 24 hours of an interview.",
    subject: "Thank you — {{ROLE_TITLE}} interview",
    body: `Hi {{INTERVIEWER_NAME}},

Thank you for taking the time to speak with me today about the {{ROLE_TITLE}} role.

I enjoyed learning about {{TOPIC_FROM_INTERVIEW}} — it confirmed for me that this is a problem space I'm genuinely excited to work on. Specifically, the challenge of {{SPECIFIC_CHALLENGE}} resonates with experience I gained at {{YOUR_COMPANY}} where {{YOUR_RELEVANT_EXPERIENCE}}.

I'm excited about the opportunity and look forward to the next steps. Please don't hesitate to reach out if you need any additional information.

Best,
{{YOUR_NAME}}`,
    tips: [
      "Send within 24 hours of the interview — ideally within 2–4 hours.",
      "Reference a specific moment from the conversation to show you were engaged.",
      "Tie one thing they mentioned to a concrete example from your background.",
      "Keep it short: 3–4 sentences is ideal. This is a thank-you, not a cover letter.",
      "Send a separate email to each interviewer; personalize each one.",
    ],
    variables: [
      { placeholder: "{{INTERVIEWER_NAME}}", label: "Interviewer's First Name", example: "Emily" },
      { placeholder: "{{ROLE_TITLE}}", label: "Role Title", example: "Data Scientist" },
      { placeholder: "{{TOPIC_FROM_INTERVIEW}}", label: "Topic Discussed in Interview", example: "your plans to expand the recommendation engine" },
      { placeholder: "{{SPECIFIC_CHALLENGE}}", label: "Specific Problem They Mentioned", example: "scaling personalization to cold-start users" },
      { placeholder: "{{YOUR_COMPANY}}", label: "Your Previous/Current Company", example: "Netflix" },
      { placeholder: "{{YOUR_RELEVANT_EXPERIENCE}}", label: "Relevant Experience You Have", example: "I built a cold-start solution that improved new user retention by 18%" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
    ],
  },
  {
    id: "li-referral-ask",
    channel: "linkedin",
    type: "referral-ask",
    title: "LinkedIn — Referral Request from Connection",
    description: "Asking a 2nd-degree connection for an internal referral.",
    body: `Hi {{CONNECTION_NAME}},

Hope you're doing well! I've been following your work at {{COMPANY_NAME}} and I'm really impressed by {{SPECIFIC_THING}}.

I'm reaching out because I'm actively exploring new opportunities and came across the {{ROLE_TITLE}} opening on your team / at {{COMPANY_NAME}}. Given your experience there, I was hoping you'd be open to sharing some insights about the culture and the team.

If you feel comfortable, I'd also really appreciate a referral — referred candidates are typically reviewed more quickly. That said, I completely understand if it's not something you're comfortable doing.

Either way, would you be open to a quick 15-minute chat? I'd value your perspective.

Thanks so much,
{{YOUR_NAME}}`,
    tips: [
      "Only ask for a referral AFTER you've had a genuine conversation — don't ask immediately.",
      "Give them an easy out — people are more likely to help when they don't feel pressured.",
      "Come prepared with your resume and a clear pitch so you make it easy for them.",
      "Referred candidates are 15x more likely to be hired — this is your highest-leverage action.",
      "Follow up once if no response in 5 days; then let it go.",
    ],
    variables: [
      { placeholder: "{{CONNECTION_NAME}}", label: "Connection's First Name", example: "Taylor" },
      { placeholder: "{{COMPANY_NAME}}", label: "Company Name", example: "Figma" },
      { placeholder: "{{SPECIFIC_THING}}", label: "Something Specific About Their Company", example: "the Config 2024 keynote" },
      { placeholder: "{{ROLE_TITLE}}", label: "Role You're Targeting", example: "Principal Designer" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
    ],
  },
  {
    id: "email-recruiter-agency",
    channel: "email",
    type: "cold-outreach",
    title: "Cold Email — Agency Recruiter",
    description: "Email to an external recruiter to get on their radar for placements.",
    subject: "{{YOUR_ROLE}} open to new opportunities — {{SKILL_AREA}}",
    body: `Hi {{RECRUITER_NAME}},

I'm a {{YOUR_ROLE}} with {{YEARS}} years of experience in {{SKILL_AREA}} currently open to new senior-level opportunities.

A quick snapshot of my background:
• {{ACCOMPLISHMENT_1}}
• {{ACCOMPLISHMENT_2}}
• Currently / most recently at {{CURRENT_COMPANY}} as {{CURRENT_TITLE}}

I'm targeting {{TARGET_COMPANIES}} or similar, ideally in the {{TARGET_INDUSTRY}} space. Compensation range: {{COMP_RANGE}}.

Do you work with companies in this space? If so, I'd love a quick call to see if there's a fit.

My resume is attached.

Thanks,
{{YOUR_NAME}}
{{LINKEDIN_URL}}`,
    tips: [
      "Agency recruiters are paid a placement fee — make it easy for them to pitch you.",
      "Be explicit about your target comp range; it saves everyone time.",
      "Attach your resume directly — don't make them ask.",
      "Name specific company types you're targeting so they can match you.",
      "Follow up after 1 week if no response.",
    ],
    variables: [
      { placeholder: "{{RECRUITER_NAME}}", label: "Recruiter's First Name", example: "Chris" },
      { placeholder: "{{YOUR_ROLE}}", label: "Your Job Title", example: "DevOps Engineer" },
      { placeholder: "{{YEARS}}", label: "Years of Experience", example: "6" },
      { placeholder: "{{SKILL_AREA}}", label: "Primary Skill Area", example: "cloud infrastructure and Kubernetes" },
      { placeholder: "{{ACCOMPLISHMENT_1}}", label: "Accomplishment 1", example: "Reduced infrastructure costs by 40% through rightsizing at a Series C startup" },
      { placeholder: "{{ACCOMPLISHMENT_2}}", label: "Accomplishment 2", example: "Built a zero-downtime deployment pipeline for 200+ microservices" },
      { placeholder: "{{CURRENT_COMPANY}}", label: "Current / Most Recent Company", example: "TechCorp" },
      { placeholder: "{{CURRENT_TITLE}}", label: "Your Current Title", example: "Senior DevOps Engineer" },
      { placeholder: "{{TARGET_COMPANIES}}", label: "Target Company Types", example: "Series B–D startups or growth-stage tech companies" },
      { placeholder: "{{TARGET_INDUSTRY}}", label: "Target Industry", example: "fintech or SaaS" },
      { placeholder: "{{COMP_RANGE}}", label: "Compensation Range", example: "$180K–$220K base" },
      { placeholder: "{{YOUR_NAME}}", label: "Your Full Name", example: "Alex Johnson" },
      { placeholder: "{{LINKEDIN_URL}}", label: "LinkedIn URL", example: "linkedin.com/in/alexjohnson" },
    ],
  },
];
