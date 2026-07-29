"use client";

import { useState, useMemo } from "react";
import { KEYWORD_CATEGORIES, searchKeywords } from "@/lib/keywords-data";

export default function KeywordsPage() {
  const [selectedId, setSelectedId] = useState<string>(KEYWORD_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const selectedCategory = KEYWORD_CATEGORIES.find((c) => c.id === selectedId);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchKeywords(searchQuery);
  }, [searchQuery]);

  async function handleCopyKeyword(keyword: string) {
    await navigator.clipboard.writeText(keyword);
    setCopied(keyword);
    setTimeout(() => setCopied(null), 1500);
  }

  async function handleCopyAll(keywords: string[]) {
    await navigator.clipboard.writeText(keywords.join(", "));
    setCopied("__all__");
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 ATS Keyword Library</h1>
        <p className="text-gray-500">
          Browse high-value keywords by role to fill gaps in your resume. Click any keyword to
          copy it, or copy an entire section with one click.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search keywords across all roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Search results */}
      {searchResults !== null && (
        <div className="mb-8">
          {searchResults.length === 0 ? (
            <p className="text-sm text-gray-400">
              No keywords found for &quot;{searchQuery}&quot;.
            </p>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-3">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &quot;
                {searchQuery}&quot;
              </p>
              <div className="flex flex-wrap gap-2">
                {searchResults.map(({ category, section, keyword }) => (
                  <button
                    key={`${category.id}-${section.label}-${keyword}`}
                    onClick={() => handleCopyKeyword(keyword)}
                    title={`${category.role} → ${section.label}`}
                    className={`text-sm px-3 py-1 rounded-full border transition-all ${
                      copied === keyword
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {copied === keyword ? "✅ Copied" : keyword}
                    <span className="ml-1.5 text-xs text-gray-400">
                      {category.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Role tabs + content */}
      {!searchQuery.trim() && (
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Role sidebar */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Roles
            </h2>
            <div className="space-y-1">
              {KEYWORD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedId(cat.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedId === cat.id
                      ? "bg-orange-50 text-orange-800 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keyword sections */}
          {selectedCategory && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory.emoji} {selectedCategory.role}
                </h2>
                <p className="text-sm text-gray-500">{selectedCategory.description}</p>
              </div>

              <div className="space-y-5">
                {selectedCategory.sections.map((section) => (
                  <div
                    key={section.label}
                    className="bg-white border border-gray-200 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{section.label}</h3>
                      <button
                        onClick={() => handleCopyAll(section.keywords)}
                        className="text-xs text-orange-600 hover:text-orange-800"
                      >
                        {copied === "__all__" ? "✅ Copied all" : "Copy all"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {section.keywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => handleCopyKeyword(kw)}
                          className={`text-sm px-3 py-1 rounded-full border transition-all ${
                            copied === kw
                              ? "bg-green-100 border-green-300 text-green-800"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                          }`}
                        >
                          {copied === kw ? "✅ Copied" : kw}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Usage tips */}
      {!searchQuery.trim() && (
        <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-6">
          <h2 className="text-base font-bold text-orange-900 mb-3">
            How to use keywords effectively
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-orange-900">
            <ul className="space-y-1.5">
              <li>✅ Use keywords naturally in bullet points, not as a list</li>
              <li>✅ Mirror exact phrasing from the job description</li>
              <li>✅ Include both spelled-out terms and acronyms (e.g., &quot;CI/CD&quot; and &quot;continuous integration&quot;)</li>
            </ul>
            <ul className="space-y-1.5">
              <li>❌ Don&apos;t keyword-stuff — it reads as spam</li>
              <li>❌ Don&apos;t list skills you can&apos;t speak to in an interview</li>
              <li>❌ Avoid hiding keywords in white text (recruiters and ATS flag this)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
