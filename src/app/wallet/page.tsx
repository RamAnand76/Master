
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import HomeHeader from "@/components/home/home-header";
import { useUser } from "@/hooks/use-user";
import { CreditCard, WalletCards, Briefcase } from "lucide-react";

export default function WalletPage() {
    const { user } = useUser();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="sticky top-0 z-10">
                <HomeHeader />
            </div>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight">Wallet</h1>
                    <p className="mt-2 text-muted-foreground">Manage your credits and subscription plan.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <WalletCards className="w-5 h-5 text-primary" />
                                    <span>Current Balance</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-extrabold text-primary">{user.credits}</p>
                                    <span className="text-2xl font-medium text-muted-foreground">credits</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">Ready to be used across all ResuMaster services.</p>
                                <Button asChild className="mt-6">
                                    <Link href="/billing">Add More Credits</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    <span>Current Plan</span>
                                </CardTitle>
                                <CardDescription>You are currently on the Free plan.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-foreground">Upgrade to Pro</p>
                                        <p className="text-muted-foreground text-sm mt-1">Unlock unlimited resumes, advanced templates, and priority support.</p>
                                    </div>
                                    <Button asChild>
                                        <Link href="/billing">Upgrade</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary"/>
                                    <span>Payment Method</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-6 h-6 text-muted-foreground"/>
                                        <div>
                                            <p className="font-semibold text-sm">Visa **** 1234</p>
                                            <p className="text-xs text-muted-foreground">Expires 12/25</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="mt-4 w-full">
                                    Update Payment Method
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
