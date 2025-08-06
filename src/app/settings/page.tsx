
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

export default function SettingsPage() {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  // Add state for dark mode if it's not globally managed yet.
  // For now, it's just a UI toggle.
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground pb-24">
        <HomeHeader />
        <header className="py-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Manage your account and application preferences.
            </p>
        </header>
        <main className="max-w-3xl mx-auto space-y-8 px-4">
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-sm text-muted-foreground">This is where you can update your name and email address.</p>
               <Button onClick={() => setIsProfileDialogOpen(true)}>Edit Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Palette className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the app.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch 
                  id="dark-mode"
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode} 
                  aria-label="Toggle dark mode"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Crown className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Manage your plan and billing details.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm">You are currently on the <span className="font-semibold text-primary">Free</span> plan.</p>
              <Button>Upgrade to Pro</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Manage your data and account deletion.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

        </main>
      </div>
      <ProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} />
    </>
  );
}
