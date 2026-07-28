// Job description matching utilities

export interface JobMatchResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  sectionScores: SectionScore[];
  topRecommendations: string[];
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  matchedTerms: string[];
  missingTerms: string[];
}

// Common stopwords to filter out of keyword extraction
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "as", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "dare",
  "this", "that", "these", "those", "i", "you", "he", "she", "it", "we",
  "they", "what", "which", "who", "when", "where", "why", "how", "all",
  "each", "every", "both", "few", "more", "most", "other", "some", "such",
  "no", "not", "only", "same", "so", "than", "too", "very", "just",
  "our", "your", "their", "its", "my", "his", "her", "us", "them",
  "from", "up", "about", "into", "through", "during", "before", "after",
  "above", "below", "between", "out", "off", "over", "under", "again",
  "further", "then", "once", "here", "there", "any", "own", "while",
  "because", "if", "until", "although", "also", "well", "new", "work",
  "working", "using", "use", "used", "including", "experience", "strong",
  "ability", "excellent", "knowledge", "understanding", "demonstrated",
  "proven", "required", "preferred", "plus", "etc", "including",
  "responsibilities", "qualifications", "requirements", "position", "role",
  "job", "company", "team", "will", "opportunity", "looking", "seeking",
]);

// Patterns that indicate important multi-word skills/terms
const MULTI_WORD_PATTERNS = [
  /\b(machine learning|ml)\b/gi,
  /\b(natural language processing|nlp)\b/gi,
  /\b(large language model|llm)\b/gi,
  /\b(deep learning)\b/gi,
  /\b(artificial intelligence|ai)\b/gi,
  /\b(product management|pm)\b/gi,
  /\b(project management|pmp)\b/gi,
  /\b(agile|scrum|kanban)\b/gi,
  /\b(continuous integration|ci\/cd|cicd)\b/gi,
  /\b(cloud computing|aws|gcp|azure)\b/gi,
  /\b(data analysis|data analytics)\b/gi,
  /\b(software development|software engineering)\b/gi,
  /\b(full.?stack|frontend|back.?end)\b/gi,
  /\b(rest api|restful api|graphql)\b/gi,
  /\b(test driven development|tdd)\b/gi,
  /\b(object oriented|oop)\b/gi,
  /\b(microservices|micro.services)\b/gi,
  /\b(version control|git|github)\b/gi,
  /\b(sql|mysql|postgresql|mongodb|nosql)\b/gi,
  /\b(kubernetes|docker|containerization)\b/gi,
  /\b(typescript|javascript|python|java|golang|rust|c\+\+|c#)\b/gi,
  /\b(react|angular|vue|next\.?js|node\.?js)\b/gi,
  /\b(cross.?functional)\b/gi,
  /\b(stakeholder management)\b/gi,
  /\b(data.?driven)\b/gi,
  /\b(a\/b testing)\b/gi,
];

function extractKeywords(text: string): Set<string> {
  const found = new Set<string>();
  const lower = text.toLowerCase();

  // Extract multi-word patterns first
  for (const pattern of MULTI_WORD_PATTERNS) {
    const matches = lower.match(pattern);
    if (matches) {
      matches.forEach((m) => found.add(m.toLowerCase().trim()));
    }
  }

  // Extract single significant words (4+ chars, not stopwords)
  const words = lower.match(/\b[a-z][a-z0-9+#.-]{2,}\b/g) ?? [];
  for (const word of words) {
    if (!STOPWORDS.has(word) && word.length >= 3) {
      found.add(word);
    }
  }

  return found;
}

function scoreSection(
  name: string,
  jdTerms: string[],
  resumeKeywords: Set<string>,
  maxScore: number
): SectionScore {
  const matched = jdTerms.filter((t) => resumeKeywords.has(t));
  const missing = jdTerms.filter((t) => !resumeKeywords.has(t));
  const score =
    jdTerms.length === 0
      ? maxScore
      : Math.round((matched.length / jdTerms.length) * maxScore);

  return {
    name,
    score,
    maxScore,
    matchedTerms: matched.slice(0, 10),
    missingTerms: missing.slice(0, 10),
  };
}

export function matchJobDescription(
  resumeText: string,
  jobDescription: string
): JobMatchResult {
  const resumeKeywords = extractKeywords(resumeText);
  const jdKeywords = extractKeywords(jobDescription);

  // Remove very common single-char or extremely generic tokens from JD keywords
  const jdTerms = Array.from(jdKeywords).filter((k) => k.length >= 3);

  const matchedKeywords = jdTerms.filter((k) => resumeKeywords.has(k));
  const missingKeywords = jdTerms.filter((k) => !resumeKeywords.has(k));

  // Group JD keywords by rough category for section scoring
  const techPattern =
    /typescript|javascript|python|java|golang|rust|sql|react|angular|vue|node|docker|kubernetes|aws|gcp|azure|git|linux|api|rest|graphql|ci\/cd|agile|scrum/;
  const softPattern =
    /communication|collaboration|leadership|problem.?solving|analytical|creative|initiative|adaptable|mentoring|strategic/;
  const domainPattern =
    /machine learning|deep learning|nlp|data science|product|management|marketing|finance|sales|security|cloud|devops|sre|platform/;

  const techTerms = jdTerms.filter((k) => techPattern.test(k));
  const softTerms = jdTerms.filter((k) => softPattern.test(k));
  const domainTerms = jdTerms.filter((k) => domainPattern.test(k));
  const otherTerms = jdTerms.filter(
    (k) => !techPattern.test(k) && !softPattern.test(k) && !domainPattern.test(k)
  );

  const sectionScores: SectionScore[] = [
    scoreSection("Technical Skills", techTerms, resumeKeywords, 35),
    scoreSection("Domain Knowledge", domainTerms, resumeKeywords, 25),
    scoreSection("Soft Skills", softTerms, resumeKeywords, 20),
    scoreSection("General Keywords", otherTerms.slice(0, 20), resumeKeywords, 20),
  ];

  const totalScore = sectionScores.reduce((s, sec) => s + sec.score, 0);
  const maxTotal = sectionScores.reduce((s, sec) => s + sec.maxScore, 0);
  const matchScore = Math.min(100, Math.round((totalScore / maxTotal) * 100));

  // Build recommendations based on most impactful missing keywords
  const topRecommendations: string[] = [];
  if (missingKeywords.length > 0) {
    const sample = missingKeywords.slice(0, 6);
    topRecommendations.push(
      `Add these high-priority missing keywords to your resume: ${sample.join(", ")}.`
    );
  }
  if (matchScore < 60) {
    topRecommendations.push(
      "Your resume matches less than 60% of the job description. Tailor your experience section to mirror the language used in the job posting."
    );
  }
  if (techTerms.length > 0 && sectionScores[0].score < sectionScores[0].maxScore * 0.6) {
    const missingTech = techTerms.filter((k) => !resumeKeywords.has(k));
    if (missingTech.length > 0) {
      topRecommendations.push(
        `Consider adding a Technical Skills section that explicitly lists: ${missingTech.slice(0, 5).join(", ")}.`
      );
    }
  }
  topRecommendations.push(
    "Mirror the exact terminology used in the job description — if they say \"cross-functional\" use that phrase, not synonyms."
  );

  return {
    matchScore,
    matchedKeywords: matchedKeywords.slice(0, 30),
    missingKeywords: missingKeywords.slice(0, 30),
    sectionScores,
    topRecommendations: topRecommendations.slice(0, 4),
  };
}
