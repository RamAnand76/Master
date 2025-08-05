import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, FileText, Settings, User } from "lucide-react";

export const metadata: Metadata = {
  title: "ResuMaster | ATS-Friendly Resume Builder",
  description: "Build a professional, ATS-friendly resume in minutes. Get AI-powered suggestions to land your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-full w-full" />,
    },
    {
      title: "My Resumes",
      href: "/",
      icon: <FileText className="h-full w-full" />,
    },
    {
        title: "Account",
        href: "#",
        icon: <User className="h-full w-full" />,
    },
    {
      title: "Settings",
      href: "#",
      icon: <Settings className="h-full w-full" />,
    }
  ];

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FloatingDock items={navItems} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
