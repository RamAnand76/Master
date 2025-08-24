
"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Edit, FileText } from "lucide-react";
import { motion } from "framer-motion";

export type MobileTab = 'editor' | 'preview';

type MobileTabsProps = {
    activeTab: MobileTab;
    setActiveTab: (tab: MobileTab) => void;
};

const tabs: { id: MobileTab; label: string; icon: React.ElementType }[] = [
    { id: 'editor', label: 'Editor', icon: Edit },
    { id: 'preview', label: 'Preview', icon: FileText },
];

export default function MobileTabs({ activeTab, setActiveTab }: MobileTabsProps) {
    return (
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="flex items-center gap-2 p-1.5 bg-card/80 backdrop-blur-lg border border-border/30 rounded-full shadow-lg">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "relative flex items-center justify-center gap-2 w-full px-4 py-1.5 text-sm font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="bubble"
                                className="absolute inset-0 z-10 bg-primary/20"
                                style={{ borderRadius: 9999 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <tab.icon className="w-4 h-4 z-20" />
                        <span className="z-20">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
