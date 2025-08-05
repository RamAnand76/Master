
import { ShinyButton } from '@/components/magicui/shiny-button';
import { Plus } from 'lucide-react';

type HomeHeroProps = {
    onNewResumeClick: () => void;
    hasReachedLimit: boolean;
};

export default function HomeHero({ onNewResumeClick, hasReachedLimit }: HomeHeroProps) {
    return (
        <>
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-bold">
                    Hey there, let's build your next
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                        &nbsp;Resume
                    </span>
                </h1>
            </div>

            <div className="mb-12 flex justify-center">
                <ShinyButton className="h-16 text-xl px-12 border" onClick={onNewResumeClick} disabled={hasReachedLimit}>
                    <Plus className="mr-4 h-6 w-6" /> Create New Resume
                </ShinyButton>
            </div>
        </>
    );
}
