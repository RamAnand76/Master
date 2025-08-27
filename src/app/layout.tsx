
"use client";

import type { Metadata } from "next";
import { usePathname } from 'next/navigation';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, FileText, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

// export const metadata: Metadata = {
//   title: "ResuMaster | ATS-Friendly Resume Builder",
//   description: "Build a professional, ATS-friendly resume in minutes. Get AI-powered suggestions to land your dream job.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showDock = !['/login', '/signup'].includes(pathname);
  const isWalletFlow = ['/wallet', '/billing'].includes(pathname);


  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-full w-full" />,
    },
    {
      title: "Templates",
      href: "/templates",
      icon: <FileText className="h-full w-full" />,
    },
    {
        title: "Account",
        href: "#",
        icon: <User className="h-full w-full" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-full w-full" />,
    }
  ];

  return (
    <html lang="en" className="dark">
      <head>
        <title>ResuMaster | ATS-Friendly Resume Builder</title>
        <meta name="description" content="Build a professional, ATS-friendly resume in minutes. Get AI-powered suggestions to land your dream job." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased", isWalletFlow && "wallet-bg")}>
        {showDock && <FloatingDock items={navItems} />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}

    