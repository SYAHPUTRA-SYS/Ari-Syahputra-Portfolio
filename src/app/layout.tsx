import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ari Syahputra — Full Stack Developer",
    template: "%s | Ari Syahputra",
  },
  description:
    "Portfolio of Ari Syahputra, a Full Stack Developer specializing in building modern, responsive, and functional web applications with PHP, Laravel, JavaScript, and MySQL.",
  keywords: [
    "Ari Syahputra",
    "Full Stack Developer",
    "Web Developer",
    "Laravel",
    "PHP",
    "JavaScript",
    "Portfolio",
  ],
  authors: [{ name: "Ari Syahputra" }],
  openGraph: {
    title: "Ari Syahputra — Full Stack Developer",
    description:
      "Portfolio of Ari Syahputra, a Full Stack Developer specializing in modern and functional web applications.",
    type: "website",
    locale: "en_US",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('globalTheme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <div className="h-20" />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
