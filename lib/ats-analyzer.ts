// ATS (Applicant Tracking System) resume analysis utilities

export interface AtsCheckResult {
  id: string;
  category: string;
  label: string;
  passed: boolean;
  score: number;
  maxScore: number;
  message: string;
  suggestion?: string;
}

export interface AtsAnalysisResult {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  checks: AtsCheckResult[];
  topSuggestions: string[];
}

const ACTION_VERBS = [
  "achieved",
  "built",
  "created",
  "delivered",
  "designed",
  "developed",
  "drove",
  "established",
  "executed",
  "generated",
  "implemented",
  "improved",
  "increased",
  "launched",
  "led",
  "managed",
  "optimized",
  "oversaw",
  "partnered",
  "reduced",
  "refactored",
  "scaled",
  "shipped",
  "spearheaded",
  "streamlined",
  "transformed",
];

const STANDARD_SECTIONS = [
  { keywords: ["summary", "objective", "profile", "about"], label: "Summary" },
  {
    keywords: ["experience", "employment", "work history", "career"],
    label: "Experience",
  },
  { keywords: ["education", "degree", "university", "college"], label: "Education" },
  { keywords: ["skills", "technologies", "technical skills", "competencies"], label: "Skills" },
];

const FILLER_WORDS = [
  "responsible for",
  "duties included",
  "helped",
  "assisted with",
  "was involved in",
  "worked on",
];

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function hasContactInfo(text: string): {
  email: boolean;
  phone: boolean;
  linkedin: boolean;
} {
  return {
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text),
    phone: /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text),
    linkedin: /\blinkedin\b/i.test(text),
  };
}

function countQuantifiableAchievements(text: string): number {
  // Matches patterns like "50%", "$2M", "3x", "increased by 40", "10+ years"
  const patterns = [
    /\d+%/g,
    /\$\d+/g,
    /\d+x\b/g,
    /\d+\+/g,
    /\d{1,3}(,\d{3})+/g,
  ];
  let count = 0;
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) count += matches.length;
  }
  return count;
}

function countActionVerbBullets(text: string): {
  total: number;
  withActionVerb: number;
} {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const bulletLines = lines.filter((l) => /^[-•*\u2022\u2023\u25E6]/.test(l.trim()));
  const withVerb = bulletLines.filter((l) => {
    const firstWord = l.trim().replace(/^[-•*\u2022\u2023\u25E6]\s*/, "").split(/\s+/)[0];
    return ACTION_VERBS.includes(firstWord?.toLowerCase() ?? "");
  });
  return { total: bulletLines.length, withActionVerb: withVerb.length };
}

function countFillerWords(text: string): number {
  const lower = text.toLowerCase();
  return FILLER_WORDS.filter((fw) => lower.includes(fw)).length;
}

function hasProperSections(text: string): string[] {
  const lower = text.toLowerCase();
  return STANDARD_SECTIONS.filter((s) =>
    s.keywords.some((kw) => lower.includes(kw))
  ).map((s) => s.label);
}

function hasTablesOrColumns(text: string): boolean {
  // Simple heuristic: multiple consecutive spaces or pipe characters suggest tables
  return /\|/.test(text) || /\s{4,}[A-Z]/.test(text);
}

function hasImages(text: string): boolean {
  // Can't detect images in plain text but check for common indicators
  const lower = text.toLowerCase();
  return lower.includes("[image]") || lower.includes("[photo]") || lower.includes("[logo]");
}

export function analyzeResume(resumeText: string): AtsAnalysisResult {
  const wordCount = countWords(resumeText);
  const contact = hasContactInfo(resumeText);
  const achievements = countQuantifiableAchievements(resumeText);
  const bulletStats = countActionVerbBullets(resumeText);
  const fillerCount = countFillerWords(resumeText);
  const presentSections = hasProperSections(resumeText);
  const hasTable = hasTablesOrColumns(resumeText);
  const hasImg = hasImages(resumeText);

  const checks: AtsCheckResult[] = [
    {
      id: "word-count",
      category: "Format",
      label: "Word Count",
      passed: wordCount >= 300 && wordCount <= 900,
      score: wordCount >= 300 && wordCount <= 900 ? 8 : wordCount >= 200 ? 4 : 0,
      maxScore: 8,
      message:
        wordCount >= 300 && wordCount <= 900
          ? `Good length (${wordCount} words)`
          : `Resume is ${wordCount < 300 ? "too short" : "too long"} (${wordCount} words)`,
      suggestion:
        wordCount < 300
          ? "Aim for 400–700 words. Add more detail about your impact."
          : wordCount > 900
          ? "Aim for 400–700 words. Trim less-relevant experience."
          : undefined,
    },
    {
      id: "email",
      category: "Contact",
      label: "Email Address",
      passed: contact.email,
      score: contact.email ? 5 : 0,
      maxScore: 5,
      message: contact.email
        ? "Email address found"
        : "No email address detected",
      suggestion: contact.email
        ? undefined
        : "Include your professional email address at the top of your resume.",
    },
    {
      id: "phone",
      category: "Contact",
      label: "Phone Number",
      passed: contact.phone,
      score: contact.phone ? 4 : 0,
      maxScore: 4,
      message: contact.phone ? "Phone number found" : "No phone number detected",
      suggestion: contact.phone
        ? undefined
        : "Add a phone number so recruiters can reach you quickly.",
    },
    {
      id: "linkedin",
      category: "Contact",
      label: "LinkedIn Profile",
      passed: contact.linkedin,
      score: contact.linkedin ? 4 : 0,
      maxScore: 4,
      message: contact.linkedin
        ? "LinkedIn profile mentioned"
        : "No LinkedIn profile detected",
      suggestion: contact.linkedin
        ? undefined
        : "Include your LinkedIn URL — over 95% of recruiters use LinkedIn.",
    },
    {
      id: "sections",
      category: "Structure",
      label: "Standard Sections",
      passed: presentSections.length >= 3,
      score: Math.min(presentSections.length * 4, 15),
      maxScore: 15,
      message:
        presentSections.length >= 3
          ? `Found ${presentSections.length} standard sections: ${presentSections.join(", ")}`
          : `Only found ${presentSections.length} standard section(s): ${presentSections.join(", ") || "none"}`,
      suggestion:
        presentSections.length < 3
          ? `Add missing sections. ATS expects: ${STANDARD_SECTIONS.filter(
              (s) => !presentSections.includes(s.label)
            )
              .map((s) => s.label)
              .join(", ")}.`
          : undefined,
    },
    {
      id: "achievements",
      category: "Impact",
      label: "Quantifiable Achievements",
      passed: achievements >= 3,
      score: Math.min(achievements * 3, 15),
      maxScore: 15,
      message:
        achievements >= 3
          ? `Found ${achievements} quantifiable achievements (numbers, %, $)`
          : `Only ${achievements} quantifiable achievement${achievements === 1 ? "" : "s"} found`,
      suggestion:
        achievements < 3
          ? "Add metrics to your bullets: e.g., \"Increased revenue by 30%\", \"Managed a team of 8\"."
          : undefined,
    },
    {
      id: "action-verbs",
      category: "Impact",
      label: "Action Verbs",
      passed: bulletStats.total === 0 || bulletStats.withActionVerb / bulletStats.total >= 0.5,
      score:
        bulletStats.total === 0
          ? 5
          : Math.round((bulletStats.withActionVerb / bulletStats.total) * 10),
      maxScore: 10,
      message:
        bulletStats.total === 0
          ? "No bullet points detected (consider adding them)"
          : `${bulletStats.withActionVerb}/${bulletStats.total} bullets start with strong action verbs`,
      suggestion:
        bulletStats.total > 0 && bulletStats.withActionVerb / bulletStats.total < 0.5
          ? `Start more bullets with action verbs like: ${ACTION_VERBS.slice(0, 6).join(", ")}.`
          : undefined,
    },
    {
      id: "filler-words",
      category: "Impact",
      label: "Filler Phrases",
      passed: fillerCount === 0,
      score: fillerCount === 0 ? 10 : Math.max(0, 10 - fillerCount * 3),
      maxScore: 10,
      message:
        fillerCount === 0
          ? "No weak filler phrases found"
          : `Found ${fillerCount} weak phrase${fillerCount > 1 ? "s" : ""} (e.g., "responsible for", "helped with")`,
      suggestion:
        fillerCount > 0
          ? 'Replace passive phrases with active verbs. Instead of "responsible for managing" use "managed".'
          : undefined,
    },
    {
      id: "tables",
      category: "Format",
      label: "ATS-Safe Formatting",
      passed: !hasTable && !hasImg,
      score: !hasTable && !hasImg ? 14 : 4,
      maxScore: 14,
      message:
        !hasTable && !hasImg
          ? "No problematic tables or images detected"
          : "Potential formatting issues (tables or images) detected",
      suggestion:
        hasTable || hasImg
          ? "Remove tables, columns, text boxes, and images. ATS bots read text linearly and choke on complex formatting."
          : undefined,
    },
  ];

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const maxTotal = checks.reduce((sum, c) => sum + c.maxScore, 0);
  const overallScore = Math.round((totalScore / maxTotal) * 100);

  const grade: "A" | "B" | "C" | "D" | "F" =
    overallScore >= 90
      ? "A"
      : overallScore >= 75
      ? "B"
      : overallScore >= 60
      ? "C"
      : overallScore >= 45
      ? "D"
      : "F";

  const topSuggestions = checks
    .filter((c) => !c.passed && c.suggestion)
    .sort((a, b) => b.maxScore - b.score - (a.maxScore - a.score))
    .slice(0, 4)
    .map((c) => c.suggestion!);

  return { overallScore, grade, checks, topSuggestions };
}
