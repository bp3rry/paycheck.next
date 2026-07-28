"use client";

import { useState } from "react";
import { OUTREACH_TEMPLATES, type OutreachTemplate } from "@/lib/outreach-data";

const CHANNEL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  email: "Email",
};

const TYPE_LABELS: Record<string, string> = {
  connection: "Connection Request",
  message: "DM / Message",
  "cold-outreach": "Cold Outreach",
  "follow-up": "Follow-up",
  "thank-you": "Thank You",
  "referral-ask": "Referral Request",
};

const CHANNEL_COLORS: Record<string, string> = {
  linkedin: "bg-blue-100 text-blue-700",
  email: "bg-gray-100 text-gray-700",
};

function applyVariables(
  text: string,
  values: Record<string, string>
): string {
  return Object.entries(values).reduce(
    (t, [placeholder, value]) => t.replaceAll(placeholder, value || placeholder),
    text
  );
}

function TemplateCard({ template }: { template: OutreachTemplate }) {
  const [expanded, setExpanded] = useState(false);
  const [vars, setVars] = useState<Record<string, string>>(
    Object.fromEntries(template.variables.map((v) => [v.placeholder, v.example]))
  );
  const [copied, setCopied] = useState(false);

  const filledBody = applyVariables(template.body, vars);
  const filledSubject = template.subject
    ? applyVariables(template.subject, vars)
    : null;

  async function handleCopy() {
    const text = filledSubject
      ? `Subject: ${filledSubject}\n\n${filledBody}`
      : filledBody;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${CHANNEL_COLORS[template.channel]}`}
            >
              {CHANNEL_LABELS[template.channel]}
            </span>
            <span className="text-xs text-gray-400">
              {TYPE_LABELS[template.type]}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">{template.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{template.description}</p>
        </div>
        <span className="text-gray-400 text-lg flex-shrink-0 mt-0.5">
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-5">
          {/* Variable inputs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Customize your template
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {template.variables.map((v) => (
                <div key={v.placeholder}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {v.label}
                  </label>
                  <input
                    type="text"
                    value={vars[v.placeholder] ?? ""}
                    onChange={(e) =>
                      setVars((prev) => ({
                        ...prev,
                        [v.placeholder]: e.target.value,
                      }))
                    }
                    placeholder={v.example}
                    className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
            {filledSubject && (
              <div className="text-sm bg-gray-50 border border-gray-200 rounded-t px-3 py-2 font-medium text-gray-700">
                Subject: {filledSubject}
              </div>
            )}
            <pre className="text-sm bg-gray-50 border border-gray-200 rounded-b px-3 py-3 whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {filledBody}
            </pre>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">💡 Tips</h4>
            <ul className="space-y-1">
              {template.tips.map((tip, i) => (
                <li key={i} className="text-xs text-amber-900">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
          >
            {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function OutreachTemplatesPage() {
  const [filter, setFilter] = useState<"all" | "linkedin" | "email">("all");

  const filtered =
    filter === "all"
      ? OUTREACH_TEMPLATES
      : OUTREACH_TEMPLATES.filter((t) => t.channel === filter);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✉️ Outreach Templates
        </h1>
        <p className="text-gray-500">
          Personalize and copy outreach messages for every stage of the job search. Fill in the
          fields, preview the result, and copy with one click.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "linkedin", "email"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All" : f === "linkedin" ? "LinkedIn" : "Email"}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} template{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* Best practices */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Outreach best practices
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">📊 What the research shows</h3>
            <ul className="space-y-1.5">
              <li>Referred candidates are 15× more likely to be hired</li>
              <li>Emails sent Tue–Thu 8–10 AM have the highest open rates</li>
              <li>Messages under 150 words get 2× more responses</li>
              <li>Personalizing the first sentence increases reply rates by 30%</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">🔑 Golden rules</h3>
            <ul className="space-y-1.5">
              <li>Lead with value — why should they talk to YOU?</li>
              <li>One ask per message — don&apos;t ask for too much at once</li>
              <li>Follow up once, then let it go gracefully</li>
              <li>Never attach your resume in a cold LinkedIn message</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
