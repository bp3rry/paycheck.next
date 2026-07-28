"use client";

import { useState } from "react";
import { analyzeResume, type AtsAnalysisResult } from "@/lib/ats-analyzer";

const SAMPLE_RESUME = `Jane Smith
jane.smith@email.com | (555) 867-5309 | linkedin.com/in/janesmith | github.com/janesmith

SUMMARY
Software engineer with 5 years of experience building scalable web applications using React and Node.js. Passionate about developer experience and mentoring junior engineers.

EXPERIENCE

Senior Software Engineer — Acme Corp, San Francisco, CA (2021 – Present)
• Led migration of monolithic codebase to microservices, reducing deploy time by 60%
• Designed and shipped a real-time notification system serving 2M+ daily active users
• Mentored 3 junior engineers, driving 2 promotions within 18 months
• Collaborated cross-functionally with Product and Design to ship 4 major features per quarter

Software Engineer — StartupXYZ, Remote (2019 – 2021)
• Built a GraphQL API that reduced client data-fetching overhead by 40%
• Implemented automated testing suite, increasing code coverage from 45% to 89%
• Optimized PostgreSQL queries, cutting page load times by 35%

EDUCATION
B.S. Computer Science — University of California, Berkeley (2019)

SKILLS
TypeScript, JavaScript, React, Next.js, Node.js, GraphQL, PostgreSQL, Redis, Docker, Kubernetes, AWS, CI/CD, Git`;

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const color =
    score >= 90
      ? "text-green-600"
      : score >= 75
      ? "text-blue-600"
      : score >= 60
      ? "text-yellow-600"
      : score >= 45
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className={`text-center ${color}`}>
      <div className="text-6xl font-bold">{score}</div>
      <div className="text-2xl font-semibold">Grade: {grade}</div>
      <div className="text-sm text-gray-500 mt-1">ATS Compatibility Score</div>
    </div>
  );
}

function CheckRow({
  check,
}: {
  check: AtsAnalysisResult["checks"][0];
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-lg mt-0.5 flex-shrink-0">
        {check.passed ? "✅" : "❌"}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mr-2">
              {check.category}
            </span>
            <span className="font-medium text-gray-900">{check.label}</span>
          </div>
          <span className="text-sm text-gray-500 flex-shrink-0">
            {check.score}/{check.maxScore} pts
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{check.message}</p>
        {check.suggestion && (
          <p className="text-sm text-blue-700 mt-1 bg-blue-50 rounded px-2 py-1">
            💡 {check.suggestion}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AtsOptimizerPage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<AtsAnalysisResult | null>(null);

  function handleAnalyze() {
    if (!resumeText.trim()) return;
    setResult(analyzeResume(resumeText));
  }

  function handleLoadSample() {
    setResumeText(SAMPLE_RESUME);
    setResult(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 ATS Optimizer</h1>
        <p className="text-gray-500">
          Paste the plain text of your resume below. The analyzer checks for the most common
          reasons ATS bots reject resumes and gives you a score out of 100.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Resume text (plain text, no formatting)
            </label>
            <button
              onClick={handleLoadSample}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Load sample resume
            </button>
          </div>
          <textarea
            className="w-full h-80 border border-gray-300 rounded-lg p-3 text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              setResult(null);
            }}
          />
          <p className="text-xs text-gray-400 mt-1">
            {resumeText.split(/\s+/).filter(Boolean).length} words
          </p>
          <button
            onClick={handleAnalyze}
            disabled={!resumeText.trim()}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Analyze Resume
          </button>
        </div>

        {/* Results panel */}
        <div>
          {result ? (
            <div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                <ScoreRing score={result.overallScore} grade={result.grade} />
              </div>

              {result.topSuggestions.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-amber-800 mb-2">
                    🚀 Top improvements
                  </h3>
                  <ul className="space-y-1.5">
                    {result.topSuggestions.map((s, i) => (
                      <li key={i} className="text-sm text-amber-900">
                        {i + 1}. {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Detailed checks</h3>
                {result.checks.map((check) => (
                  <CheckRow key={check.id} check={check} />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
              <div>
                <div className="text-4xl mb-3">📄</div>
                <p className="text-sm">
                  Paste your resume on the left and click{" "}
                  <strong>Analyze Resume</strong> to see your ATS score.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips section */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ATS Optimization Quick Guide</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">✅ Do this</h3>
            <ul className="space-y-1.5">
              <li>Use standard section headers (Experience, Education, Skills)</li>
              <li>Save as .docx or a simple PDF with selectable text</li>
              <li>Start bullet points with strong action verbs</li>
              <li>Include numbers: %, $, headcount, timeframes</li>
              <li>Mirror the exact language from the job description</li>
              <li>Include your email, phone, and LinkedIn URL</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">❌ Avoid this</h3>
            <ul className="space-y-1.5">
              <li>Tables, columns, text boxes, or headers/footers</li>
              <li>Images, icons, or graphical skill bars</li>
              <li>Phrases like &quot;responsible for&quot; or &quot;helped with&quot;</li>
              <li>Submitting a scanned PDF (text can&apos;t be parsed)</li>
              <li>Fancy fonts or colored backgrounds</li>
              <li>One-page cramming if you have 7+ years of experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
