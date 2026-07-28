"use client";

import { useState } from "react";
import { matchJobDescription, type JobMatchResult } from "@/lib/job-matcher";

const SAMPLE_JD = `We are looking for a Senior Software Engineer to join our Backend Platform team.

Responsibilities:
- Design, build, and maintain scalable backend systems using Python and Go
- Lead technical design reviews and mentor junior engineers
- Drive adoption of best practices including TDD, code review, and CI/CD
- Collaborate cross-functionally with Product, Data, and Infrastructure teams
- Own reliability and performance of our core APIs (REST and GraphQL)

Requirements:
- 5+ years of professional software engineering experience
- Proficiency in Python or Go; experience with TypeScript a plus
- Deep knowledge of distributed systems and microservices architecture
- Experience with cloud platforms (AWS preferred; GCP or Azure acceptable)
- Strong SQL skills and familiarity with NoSQL databases (Redis, MongoDB)
- Hands-on with Docker, Kubernetes, and CI/CD pipelines
- Excellent communication and stakeholder management skills

Nice to have:
- Experience with Kafka or other event streaming platforms
- Background in data engineering or ML infrastructure
- Knowledge of observability tools (Datadog, Prometheus, Grafana)`;

function ScoreBar({
  score,
  maxScore,
  label,
}: {
  score: number;
  maxScore: number;
  label: string;
}) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const color =
    pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-400";

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          {score}/{maxScore} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BigScore({ score }: { score: number }) {
  const color =
    score >= 75
      ? "text-green-600"
      : score >= 50
      ? "text-yellow-600"
      : "text-red-600";
  const label =
    score >= 75 ? "Strong Match" : score >= 50 ? "Partial Match" : "Weak Match";

  return (
    <div className={`text-center ${color}`}>
      <div className="text-6xl font-bold">{score}%</div>
      <div className="text-lg font-semibold">{label}</div>
      <div className="text-sm text-gray-500 mt-1">Keyword Match Score</div>
    </div>
  );
}

export default function JobMatcherPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState<JobMatchResult | null>(null);

  function handleMatch() {
    if (!resumeText.trim() || !jobText.trim()) return;
    setResult(matchJobDescription(resumeText, jobText));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Job Match Analyzer</h1>
        <p className="text-gray-500">
          Paste your resume and a job description to see how well your resume matches the role.
          The analyzer breaks down your keyword coverage by category and lists the exact terms
          you should add.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your resume (plain text)
          </label>
          <textarea
            className="w-full h-60 border border-gray-300 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              setResult(null);
            }}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Job description
            </label>
            <button
              onClick={() => {
                setJobText(SAMPLE_JD);
                setResult(null);
              }}
              className="text-xs text-purple-600 hover:text-purple-800"
            >
              Load sample JD
            </button>
          </div>
          <textarea
            className="w-full h-60 border border-gray-300 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            placeholder="Paste the job description here..."
            value={jobText}
            onChange={(e) => {
              setJobText(e.target.value);
              setResult(null);
            }}
          />
        </div>
      </div>

      <button
        onClick={handleMatch}
        disabled={!resumeText.trim() || !jobText.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors mb-8"
      >
        Analyze Match
      </button>

      {result && (
        <div className="space-y-6">
          {/* Score */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <BigScore score={result.matchScore} />
          </div>

          {/* Recommendations */}
          {result.topRecommendations.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <h3 className="font-semibold text-purple-900 mb-2">🚀 Top recommendations</h3>
              <ul className="space-y-1.5">
                {result.topRecommendations.map((r, i) => (
                  <li key={i} className="text-sm text-purple-900">
                    {i + 1}. {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section scores */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Score by category</h3>
            <div className="space-y-4">
              {result.sectionScores.map((sec) => (
                <ScoreBar
                  key={sec.name}
                  label={sec.name}
                  score={sec.score}
                  maxScore={sec.maxScore}
                />
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-800 mb-3">
                ✅ Matched keywords ({result.matchedKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-semibold text-red-800 mb-3">
                ❌ Missing keywords ({result.missingKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tip box */}
      {!result && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-blue-900">
          <strong>Pro tip:</strong> For each job you apply to, tailor your resume by adding the
          missing keywords — naturally woven into your experience bullets. Aim for a 70%+ match
          score. Don&apos;t keyword-stuff; ATS systems and human reviewers both penalize this.
        </div>
      )}
    </div>
  );
}
