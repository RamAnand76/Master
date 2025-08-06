
"use client";

import { Plus } from 'lucide-react';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { useUser } from '@/hooks/use-user';

type HomeHeroProps = {
    onNewResumeClick: () => void;
    hasReachedLimit: boolean;
};

export default function HomeHero({ onNewResumeClick, hasReachedLimit }: HomeHeroProps) {
    const { user } = useUser();
    const name = user.name || 'there';

    return (
        <div className="space-y-6">
            <div>
                 <AnimatedGradientText
                    speed={2}
                    colorFrom="#408080"
                    colorTo="#00FFFF"
                    className="text-4xl font-bold font-headline"
                >
                   Hello, {name} 👋
                </AnimatedGradientText>
                <p className="text-2xl text-muted-foreground">Welcome back</p>
            </div>
            
            <div className="space-y-3">
                <h2 className="text-base font-medium">Start a new resume</h2>
                 <RainbowButton 
                    onClick={onNewResumeClick} 
                    disabled={hasReachedLimit}
                    className="h-10"
                >
                    <Plus className="mr-2 h-4 w-4" /> Create New Resume
                </RainbowButton>
            </div>
        </div>
    );
}
