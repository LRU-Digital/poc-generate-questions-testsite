import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ChapterNav from "@/components/ChapterNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skagensmalere",
  description: "Et undervisningsforløb om skagensmalerne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <head> 
        <script type="module" src="https://claude-bot-sigma.vercel.app/teacher-tool-widget.js"></script>
      </head>
      <body className={`${geistSans.variable} antialiased flex min-h-screen`}>
        {/* Left sidebar */}
        <aside className="w-60 flex-shrink-0 bg-[#f0f0f0] flex flex-col min-h-screen">
          {/* Portal title */}
          <div className="px-4 py-5 border-b border-[#d8d8d8]">
            <h1 className="text-base font-bold text-gray-900 leading-tight">Skagensmalere</h1>
          </div>

          {/* Chapter navigation */}
          <ChapterNav />
        </aside>

        {/* Main content area */}
        <main className="flex-1 bg-white overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
