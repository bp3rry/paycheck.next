# paycheck.next

> Skills to help find a new job — AI-friendly resume tools and hiring firewall bypass tactics.

**paycheck.next** is a Next.js web application that equips job seekers with practical tools to
navigate the modern AI-driven hiring gauntlet: ATS bots, AI ranking algorithms, and the 6-second
recruiter review.

## Features

### 🎯 ATS Optimizer
Paste your resume text and get an instant ATS compatibility score (0–100) with a letter grade
and prioritized improvement suggestions. Checks for:
- Contact information completeness (email, phone, LinkedIn)
- Standard section headers (Summary, Experience, Education, Skills)
- Word count (too short = sparse, too long = bloated)
- Quantifiable achievements (numbers, %, $ amounts)
- Action verb usage on bullet points
- Filler phrases that weaken impact
- ATS-hostile formatting (tables, images, columns)

### 🔍 Job Match Analyzer
Compare your resume against any job description to see your keyword match score and identify
exactly which terms to add. Breaks down coverage by:
- Technical Skills
- Domain Knowledge
- Soft Skills
- General Keywords

Shows matched keywords (green) and missing keywords (red) as a tag cloud.

### ✉️ Outreach Templates
Plug-and-play message templates for every stage of the job search. Fill in the variable fields,
preview the result, and copy with one click. Templates include:
- LinkedIn connection request to a recruiter
- LinkedIn DM to a hiring manager (post-application)
- Cold email to a hiring manager
- Post-interview thank-you / follow-up email
- Internal referral request from a connection
- Cold email to an agency recruiter

### 📚 ATS Keyword Library
Browse high-value keywords organized by role and industry. Click any keyword to copy it to
your clipboard. Roles covered:
- Software Engineer
- Data Scientist
- Product Manager
- DevOps / SRE
- Data Engineer
- Marketing
- Finance / Accounting
- UX / Product Design

## How it works

All analysis runs entirely in the browser — no resume data is ever sent to a server.

The ATS optimizer and job matcher use rule-based heuristics calibrated to the parsing behavior
of major ATS platforms (Workday, Greenhouse, Lever, iCIMS). The keyword library is curated from
job posting analysis across thousands of roles.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for production

```bash
npm run build
npm start
```

## Tech stack

- [Next.js 16](https://nextjs.org/) — App Router, React Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## The AI hiring gauntlet

Modern job applications pass through three filters before a human decision-maker sees them:

1. **ATS Scan** — Parses your resume for keywords, formatting compliance, and completeness.
   Up to 75% of resumes are auto-rejected here.

2. **AI Ranking** — Surviving resumes are ranked by relevance to the job description.
   Only the top tier reaches the recruiter queue.

3. **Human Review** — Recruiters spend ~6 seconds on each resume before deciding to read on.
   A clean structure and quantifiable wins are essential.

paycheck.next gives you the tools to clear all three filters.
