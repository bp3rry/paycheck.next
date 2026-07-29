import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "paycheck.next — AI-Friendly Resume & Job Search Tools",
  description:
    "Tools to build an ATS-optimized resume, match your resume to job descriptions, craft outreach messages, and discover high-value keywords for your next role.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
          paycheck.next — all analysis runs locally in your browser. Your resume data never leaves
          your device.
        </footer>
      </body>
    </html>
  );
}
