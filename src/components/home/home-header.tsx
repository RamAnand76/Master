
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun } from 'lucide-react';
import { AppLogo } from './app-logo';

export default function HomeHeader() {
    return (
        <header className="p-4 flex justify-between items-center border-b border-border">
            <div className="flex items-center gap-4">
                <AppLogo />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon"><Sun className="h-5 w-5"/></Button>
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
