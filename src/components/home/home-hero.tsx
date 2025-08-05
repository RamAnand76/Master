
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type HomeHeroProps = {
    onNewResumeClick: () => void;
    hasReachedLimit: boolean;
};

export default function HomeHero({ onNewResumeClick, hasReachedLimit }: HomeHeroProps) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-5xl font-bold">
                    Hello, Welcome back
                </h1>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-lg font-medium">Start a new resume</h2>
                 <Button 
                    onClick={onNewResumeClick} 
                    disabled={hasReachedLimit}
                    size="lg"
                >
                    <Plus className="mr-2 h-5 w-5" /> Create New Resume
                </Button>
            </div>
        </div>
    );
}
