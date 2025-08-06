
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Sun, User } from 'lucide-react';
import { AppLogo } from './app-logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@/hooks/use-user';
import ProfileDialog from './profile-dialog';

export default function HomeHeader() {
    const { user, logout } = useUser();
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <>
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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Avatar className="cursor-pointer">
                                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" />
                                <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <p className="font-semibold">{user.name || 'Guest'}</p>
                                <p className="text-xs text-muted-foreground font-normal">{user.email || 'No email set'}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => setIsProfileDialogOpen(true)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <ProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
        </>
    );
}
