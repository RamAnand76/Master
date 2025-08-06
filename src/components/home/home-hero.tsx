
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
        <div className="space-y-8">
            <div>
                 <AnimatedGradientText
                    speed={2}
                    colorFrom="#408080"
                    colorTo="#00FFFF"
                    className="text-5xl font-bold"
                >
                   Hello, {name} 👋
                </AnimatedGradientText>
                <p className="text-3xl text-muted-foreground">Welcome back</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-lg font-medium">Start a new resume</h2>
                 <RainbowButton 
                    onClick={onNewResumeClick} 
                    disabled={hasReachedLimit}
                >
                    <Plus className="mr-2 h-5 w-5" /> Create New Resume
                </RainbowButton>
            </div>
        </div>
    );
}
