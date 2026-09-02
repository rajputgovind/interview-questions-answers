import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { author } from "@/data/author";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "MERN Interview Prep | React, JS, TS Questions",
    template: "%s | MERN Interview Prep",
  },
  description:
    "115+ MERN & React interview questions with Hinglish + English answers and real-world examples. Free interview preparation for developers.",
  keywords: [
    "React interview questions",
    "JavaScript interview",
    "MERN stack interview",
    "TypeScript interview",
    "Hinglish interview prep",
    "Next.js interview",
  ],
  authors: [{ name: author.name, url: author.linkedin }],
  creator: author.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "MERN Interview Prep — 115 Questions for Developers",
    description:
      "React, JavaScript, TypeScript interview questions with Hinglish + English answers.",
    siteName: "MERN Interview Prep",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "MERN Interview Prep" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERN Interview Prep",
    description: "115+ interview questions with Hinglish + English answers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "MERN Interview Prep",
        description: metadata.description,
        author: { "@type": "Person", name: author.name },
      },
      {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        email: author.email,
        url: author.linkedin,
        sameAs: [author.linkedin, author.github],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
