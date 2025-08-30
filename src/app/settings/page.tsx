
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Palette, Crown, Database, AlertTriangle } from 'lucide-react';
import ProfileDialog from '@/components/home/profile-dialog';
import HomeHeader from '@/components/home/home-header';
import { useUser } from '@/hooks/use-user';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function SettingsPage() {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { user, updateUser } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const settingsCards = [
    { 
      id: 'profile',
      icon: User,
      title: 'Profile',
      description: 'Manage your personal information and status.',
      content: (
        <>
            <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Name & Email</p>
                        <p className="text-sm text-muted-foreground">Update your display name and email address.</p>
                    </div>
                    <Button onClick={() => setIsProfileDialogOpen(true)}>Edit Profile</Button>
            </div>
            <Separator />
            <div className="space-y-2">
                <Label>You are a</Label>
                <Select 
                    value={user.employmentStatus} 
                    onValueChange={(value) => updateUser({ employmentStatus: value as any })}
                >
                    <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="employed">Employed</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">This helps us tailor your experience.</p>
            </div>
        </>
      ),
      contentClassName: "space-y-4",
    },
    { 
      id: 'appearance',
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of the app.',
      content: (
         <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch 
            id="dark-mode"
            checked={isDarkMode} 
            onCheckedChange={setIsDarkMode} 
            aria-label="Toggle dark mode"
            />
        </div>
      ),
    },
    {
        id: 'subscription',
        icon: Crown,
        title: 'Subscription',
        description: 'Manage your plan and billing details.',
        content: (
            <div className="flex items-center justify-between">
                <p className="text-sm">You are currently on the <span className="font-semibold text-primary">Free</span> plan.</p>
                <Button asChild>
                    <Link href="/billing">Upgrade to Pro</Link>
                </Button>
            </div>
        )
    },
    {
        id: 'danger',
        icon: AlertTriangle,
        title: 'Danger Zone',
        description: 'Manage your data and account deletion.',
        cardClassName: "border-destructive",
        titleClassName: "text-destructive",
        content: (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Export Your Data</p>
                        <p className="text-sm text-muted-foreground">Download all your resumes and personal data.</p>
                    </div>
                    <Button variant="outline">Export Data</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                </div>
            </div>
        )
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-24">
        <HomeHeader />
        <main className="pt-8">
            <header className="py-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Manage your account and application preferences.
                </p>
            </header>
            <div className="max-w-3xl mx-auto space-y-8 px-4">
            
            {settingsCards.map((card, index) => (
                <motion.div
                    key={card.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card className={card.cardClassName}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <card.icon className={`w-6 h-6 ${card.id === 'danger' ? 'text-destructive' : 'text-primary'}`} />
                        <div>
                            <CardTitle className={card.titleClassName}>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent className={card.contentClassName}>
                            {card.content}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}

            </div>
        </main>
      </div>
      <ProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </>
  );
}
