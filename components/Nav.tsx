"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/ats-optimizer", label: "ATS Optimizer" },
  { href: "/job-matcher", label: "Job Matcher" },
  { href: "/outreach-templates", label: "Outreach Templates" },
  { href: "/keywords", label: "Keywords" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-lg text-blue-600 hover:text-blue-700">
            paycheck.next
          </Link>
          <nav className="flex items-center gap-1 text-sm overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
