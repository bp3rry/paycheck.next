import Link from "next/link";

const TOOLS = [
  {
    href: "/ats-optimizer",
    emoji: "🎯",
    title: "ATS Optimizer",
    description:
      "Paste your resume and get an instant ATS compatibility score with actionable fixes — before a bot silently rejects it.",
    cta: "Analyze my resume →",
    color: "blue",
  },
  {
    href: "/job-matcher",
    emoji: "🔍",
    title: "Job Match Analyzer",
    description:
      "Compare your resume against any job description to see your keyword match score and exactly which terms to add.",
    cta: "Check my match score →",
    color: "purple",
  },
  {
    href: "/outreach-templates",
    emoji: "✉️",
    title: "Outreach Templates",
    description:
      "Plug-and-play templates for LinkedIn DMs, cold emails, referral requests, and post-interview follow-ups that get replies.",
    cta: "Browse templates →",
    color: "green",
  },
  {
    href: "/keywords",
    emoji: "📚",
    title: "ATS Keyword Library",
    description:
      "Browse high-value ATS keywords by role and industry to fill gaps in your skills section and beat keyword filters.",
    cta: "Explore keywords →",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-100 hover:border-blue-300",
  purple: "bg-purple-50 border-purple-100 hover:border-purple-300",
  green: "bg-green-50 border-green-100 hover:border-green-300",
  orange: "bg-orange-50 border-orange-100 hover:border-orange-300",
};

const ctaColorMap: Record<string, string> = {
  blue: "text-blue-700 hover:text-blue-900",
  purple: "text-purple-700 hover:text-purple-900",
  green: "text-green-700 hover:text-green-900",
  orange: "text-orange-700 hover:text-orange-900",
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Land interviews, not the{" "}
          <span className="text-blue-600">rejection folder</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Modern AI screening bots reject up to 75% of resumes before a human sees them.{" "}
          <strong className="text-gray-700">paycheck.next</strong> gives you the tools to
          beat those filters and get your resume in front of real hiring managers.
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`block border rounded-xl p-6 transition-all ${colorMap[tool.color]}`}
          >
            <div className="text-3xl mb-3">{tool.emoji}</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.description}</p>
            <span className={`text-sm font-medium ${ctaColorMap[tool.color]}`}>{tool.cta}</span>
          </Link>
        ))}
      </div>

      {/* How it works */}
      <div className="border border-gray-200 bg-white rounded-xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          How the AI hiring gauntlet works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-800 mb-1">Step 1 — ATS Scan</h3>
            <p>
              Your resume is parsed by an Applicant Tracking System (ATS) that extracts text and
              scores it for keyword match, formatting, and completeness. Resumes with tables,
              images, or missing keywords are filtered out automatically.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="font-semibold text-gray-800 mb-1">Step 2 — AI Ranking</h3>
            <p>
              At many companies, an AI model ranks surviving resumes by relevance to the job
              description. It looks for skill coverage, impact language, and cultural fit signals.
              Only top-ranked candidates reach the recruiter queue.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🙋</div>
            <h3 className="font-semibold text-gray-800 mb-1">Step 3 — Human Review</h3>
            <p>
              Recruiters review the shortlist — often spending only 6 seconds per resume. A clean
              structure, quantifiable wins, and a personalized outreach message dramatically
              increase your chances of landing the call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
