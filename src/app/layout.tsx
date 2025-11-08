
"use client";

import type { Metadata } from "next";
import { usePathname } from 'next/navigation';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, FileText, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import HomeHeader from "@/components/home/home-header";
import { useState } from "react";
import ProfileDialog from "@/components/home/profile-dialog";

// export const metadata: Metadata = {
//   title: "ResuMaster | ATS-Friendly Resume Builder",
//   description: "Build a professional, ATS-friendly resume in minutes. Get AI-powered suggestions to land your dream job.",
// };

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const pathname = usePathname();
  const showDock = !['/login', '/signup'].includes(pathname);
  const showHeader = !['/login', '/signup', '/workspace/[id]'].includes(pathname) && !pathname.startsWith('/workspace/');

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
        onClick: () => setIsProfileDialogOpen(true),
        icon: <User className="h-full w-full" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-full w-full" />,
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
        {showHeader && (
          <div className="sticky top-0 z-10 w-full border-b border-solid border-border/60 bg-background/80 backdrop-blur-sm">
            <HomeHeader />
          </div>
        )}
        {children}
        {showDock && <FloatingDock items={navItems} />}
        <ProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
