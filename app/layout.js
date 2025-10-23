import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "ResumeCrafter - ATS-Optimized Resume Builder",
  description:
    "Create professional, ATS-optimized resumes with real-time preview and customization",
  keywords: "resume builder, ATS optimization, resume templates, career",
  openGraph: {
    title: "ResumeCrafter - ATS-Optimized Resume Builder",
    description:
      "Create professional, ATS-optimized resumes with real-time preview and customization",
    type: "website",
  },
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
