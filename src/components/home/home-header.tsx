
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun } from 'lucide-react';
import { AppLogo } from './app-logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function HomeHeader() {
    return (
        <header className="p-4 flex justify-between items-center border-b border-border">
            <div className="flex items-center gap-3">
                <AppLogo />
                <span className="font-semibold text-xl tracking-tighter">ResuMaster</span>
            </div>
            <div className="flex items-center gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Toggle theme">
                                <Sun className="h-5 w-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}

