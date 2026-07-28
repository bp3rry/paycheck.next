import { describe, it, expect } from "vitest";
import { analyzeResume } from "../ats-analyzer";

// ---------------------------------------------------------------------------
// Sample resume fixture – a realistic software-engineer resume used across
// multiple test cases.
// ---------------------------------------------------------------------------
const SAMPLE_RESUME = `
Jane Doe
jane.doe@example.com
(555) 867-5309
linkedin.com/in/janedoe

SUMMARY
Results-oriented software engineer with 6 years of experience building scalable, reliable web
services at high-growth startups and Fortune 500 companies. Proven track record of leading
cross-functional teams, driving architectural improvements, and delivering measurable business
impact. Passionate about developer productivity, distributed systems, and engineering culture.

EXPERIENCE

Senior Software Engineer - Acme Corp (2021-Present)
- Designed and implemented a real-time event pipeline that processed 10M events per day,
  eliminating data loss and enabling faster product iteration
- Reduced p99 API latency by 40% through strategic caching layers and query optimization,
  improving customer satisfaction scores by 15 points
- Led a team of 5 engineers to deliver a new billing module generating 2M in annual revenue,
  completed two weeks ahead of the original schedule
- Refactored a legacy monolith into 12 independent microservices, cutting mean deployment time
  by 60% and reducing inter-team coupling significantly
- Spearheaded the company-wide migration to Kubernetes and automated canary deployments,
  improving production uptime from 99.5% to 99.99%
- Partnered with the data engineering team to establish a unified observability platform using
  Prometheus and Grafana, reducing mean time to detection from 45 minutes to under 5 minutes

Software Engineer - Beta Inc (2018-2021)
- Built and shipped a self-serve analytics dashboard adopted by 3000 enterprise customers
  within its first quarter of general availability
- Developed a CI/CD pipeline framework that cut the release cycle from 2 weeks to 1 day,
  enabling the team to ship 4x more frequently with higher confidence
- Implemented a comprehensive automated testing suite, increasing code coverage from 45% to 92%
  and eliminating an entire class of production regressions
- Managed the on-call rotation and resolved over 100 production incidents with a mean time to
  resolution under 30 minutes, maintaining a strong service-level agreement
- Optimized PostgreSQL query performance across 3 critical reporting endpoints, reducing
  database load by 35% and cutting monthly cloud costs by 8000 dollars

EDUCATION
Bachelor of Science in Computer Science - State University (2018)
GPA 3.8 out of 4.0, Deans List all 8 semesters

SKILLS
TypeScript, Python, Go, Java, React, Node.js, PostgreSQL, Redis, Elasticsearch, Kafka,
Kubernetes, Docker, Terraform, AWS (EC2, S3, RDS, Lambda, EKS), distributed systems,
microservices architecture, system design, REST and GraphQL APIs, CI/CD, test-driven
development, agile methodologies, technical mentorship
`;

// A bare-bones resume that deliberately fails most checks (used to test
// low-score and suggestion paths).
const MINIMAL_RESUME = "I am a developer who worked on things.";

// A resume that contains formatting ATS can't parse (tables, images).
const FORMATTED_RESUME = `
John Smith
john@example.com | (555) 000-1234 | LinkedIn

SUMMARY
Software developer.

EXPERIENCE
Developer | Foo Corp

EDUCATION
B.S. CS

SKILLS
Python

Column A        | Column B
Value 1         | Value 2
`;

// ---------------------------------------------------------------------------
// analyzeResume – overall shape
// ---------------------------------------------------------------------------
describe("analyzeResume", () => {
  it("returns an object with overallScore, grade, checks, and topSuggestions", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(result).toHaveProperty("overallScore");
    expect(result).toHaveProperty("grade");
    expect(result).toHaveProperty("checks");
    expect(result).toHaveProperty("topSuggestions");
  });

  it("overall score is between 0 and 100", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);
  });

  it("grade is one of A B C D F", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(["A", "B", "C", "D", "F"]).toContain(result.grade);
  });

  it("checks array is non-empty and each check has required fields", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(result.checks.length).toBeGreaterThan(0);
    for (const c of result.checks) {
      expect(c).toHaveProperty("id");
      expect(c).toHaveProperty("category");
      expect(c).toHaveProperty("label");
      expect(typeof c.passed).toBe("boolean");
      expect(c.score).toBeGreaterThanOrEqual(0);
      expect(c.score).toBeLessThanOrEqual(c.maxScore);
    }
  });

  it("topSuggestions contains at most 4 items", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(result.topSuggestions.length).toBeLessThanOrEqual(4);
  });
});

// ---------------------------------------------------------------------------
// Grade thresholds
// ---------------------------------------------------------------------------
describe("grade thresholds", () => {
  it("strong resume scores A or B", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    expect(["A", "B"]).toContain(result.grade);
    expect(result.overallScore).toBeGreaterThanOrEqual(75);
  });

  it("near-empty resume scores D or F", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    expect(["D", "F"]).toContain(result.grade);
    expect(result.overallScore).toBeLessThan(60);
  });
});

// ---------------------------------------------------------------------------
// Contact information checks
// ---------------------------------------------------------------------------
describe("contact info checks", () => {
  it("detects email address in sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const emailCheck = result.checks.find((c) => c.id === "email")!;
    expect(emailCheck.passed).toBe(true);
    expect(emailCheck.score).toBe(emailCheck.maxScore);
  });

  it("detects phone number in sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const phoneCheck = result.checks.find((c) => c.id === "phone")!;
    expect(phoneCheck.passed).toBe(true);
  });

  it("detects linkedin mention in sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const liCheck = result.checks.find((c) => c.id === "linkedin")!;
    expect(liCheck.passed).toBe(true);
  });

  it("fails email check when email is absent", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    const emailCheck = result.checks.find((c) => c.id === "email")!;
    expect(emailCheck.passed).toBe(false);
    expect(emailCheck.score).toBe(0);
    expect(emailCheck.suggestion).toBeTruthy();
  });

  it("fails phone check when phone is absent", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    const phoneCheck = result.checks.find((c) => c.id === "phone")!;
    expect(phoneCheck.passed).toBe(false);
    expect(phoneCheck.score).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Word count check
// ---------------------------------------------------------------------------
describe("word count check", () => {
  it("passes for sample resume (300–900 words)", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const wc = result.checks.find((c) => c.id === "word-count")!;
    expect(wc.passed).toBe(true);
  });

  it("fails and flags as too short for minimal resume", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    const wc = result.checks.find((c) => c.id === "word-count")!;
    expect(wc.passed).toBe(false);
    expect(wc.message).toMatch(/too short/i);
  });

  it("fails and flags as too long for a very large resume", () => {
    const longResume =
      "experience skills education summary " + "word ".repeat(1000);
    const result = analyzeResume(longResume);
    const wc = result.checks.find((c) => c.id === "word-count")!;
    expect(wc.passed).toBe(false);
    expect(wc.message).toMatch(/too long/i);
  });
});

// ---------------------------------------------------------------------------
// Standard sections check
// ---------------------------------------------------------------------------
describe("sections check", () => {
  it("finds all 4 standard sections in sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const sec = result.checks.find((c) => c.id === "sections")!;
    expect(sec.passed).toBe(true);
    expect(sec.message).toMatch(/4/);
  });

  it("fails sections check for minimal resume", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    const sec = result.checks.find((c) => c.id === "sections")!;
    expect(sec.passed).toBe(false);
    expect(sec.suggestion).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Quantifiable achievements check
// ---------------------------------------------------------------------------
describe("quantifiable achievements check", () => {
  it("finds multiple quantifiable achievements in sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const ach = result.checks.find((c) => c.id === "achievements")!;
    expect(ach.passed).toBe(true);
    expect(ach.score).toBeGreaterThan(0);
  });

  it("fails for minimal resume with no metrics", () => {
    const result = analyzeResume(MINIMAL_RESUME);
    const ach = result.checks.find((c) => c.id === "achievements")!;
    expect(ach.passed).toBe(false);
    expect(ach.suggestion).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Action verbs check
// ---------------------------------------------------------------------------
describe("action verbs check", () => {
  it("passes action-verb check for sample resume", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const av = result.checks.find((c) => c.id === "action-verbs")!;
    expect(av.passed).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Filler phrases check
// ---------------------------------------------------------------------------
describe("filler phrases check", () => {
  it("passes for sample resume with no filler phrases", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const fp = result.checks.find((c) => c.id === "filler-words")!;
    expect(fp.passed).toBe(true);
    expect(fp.score).toBe(fp.maxScore);
  });

  it("fails when resume contains filler phrases", () => {
    const fillerResume = `
      jane@example.com | (555) 000-1234 | LinkedIn
      SUMMARY EXPERIENCE EDUCATION SKILLS
      - Was responsible for managing the deployment pipeline
      - Assisted with the migration to cloud services
      - Helped with team onboarding
    `;
    const result = analyzeResume(fillerResume);
    const fp = result.checks.find((c) => c.id === "filler-words")!;
    expect(fp.passed).toBe(false);
    expect(fp.score).toBeLessThan(fp.maxScore);
    expect(fp.suggestion).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// ATS-safe formatting check
// ---------------------------------------------------------------------------
describe("ATS-safe formatting check", () => {
  it("passes for sample resume with no tables or images", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const fmt = result.checks.find((c) => c.id === "tables")!;
    expect(fmt.passed).toBe(true);
    expect(fmt.score).toBe(fmt.maxScore);
  });

  it("fails for resume containing pipe-based table formatting", () => {
    const result = analyzeResume(FORMATTED_RESUME);
    const fmt = result.checks.find((c) => c.id === "tables")!;
    expect(fmt.passed).toBe(false);
    expect(fmt.suggestion).toBeTruthy();
  });

  it("fails for resume with image placeholder", () => {
    const imgResume = `
      jane@example.com | (555) 000-1234 | LinkedIn
      SUMMARY EXPERIENCE EDUCATION SKILLS
      [Image] Profile photo
    `;
    const result = analyzeResume(imgResume);
    const fmt = result.checks.find((c) => c.id === "tables")!;
    expect(fmt.passed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe("edge cases", () => {
  it("handles empty string without throwing", () => {
    expect(() => analyzeResume("")).not.toThrow();
    const result = analyzeResume("");
    expect(result.grade).toBe("F");
  });

  it("score per check never exceeds maxScore", () => {
    for (const resume of [SAMPLE_RESUME, MINIMAL_RESUME, FORMATTED_RESUME, ""]) {
      const result = analyzeResume(resume);
      for (const c of result.checks) {
        expect(c.score).toBeLessThanOrEqual(c.maxScore);
        expect(c.score).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("sum of check scores equals derived overall score", () => {
    const result = analyzeResume(SAMPLE_RESUME);
    const total = result.checks.reduce((s, c) => s + c.score, 0);
    const max = result.checks.reduce((s, c) => s + c.maxScore, 0);
    expect(result.overallScore).toBe(Math.round((total / max) * 100));
  });
});
