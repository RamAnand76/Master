
"use client";

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

type HomeHeroProps = {
    onNewResumeClick: () => void;
    hasReachedLimit: boolean;
};

export default function HomeHero({ onNewResumeClick, hasReachedLimit }: HomeHeroProps) {
    const { user } = useUser();
    const name = user.name || 'there';
    const { theme } = useTheme();

    return (
        <div className="space-y-6">
            <div>
                 <AnimatedGradientText
                    speed={2}
                    colorFrom={theme === 'dark' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
                    colorTo={theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--accent-2))'}
                    className="text-4xl font-bold"
                >
                   Hello, {name} 👋
                </AnimatedGradientText>
                <p className="text-2xl text-muted-foreground mt-1">Welcome back</p>
            </div>
            
            <div className="space-y-3">
                <h2 className="text-base font-medium">Start a new resume</h2>
                 <Button 
                    onClick={onNewResumeClick} 
                    disabled={hasReachedLimit}
                    variant="outline"
                    className="h-10"
                >
                    <Plus className="mr-2 h-4 w-4" /> Create New Resume
                </Button>
            </div>
        </div>
    );
}
