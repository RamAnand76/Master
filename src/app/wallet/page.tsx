
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { AppLogo } from "@/components/home/app-logo";

const NovaLogo = () => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);

const VisaLogo = () => (
    <img className="w-12" alt="Visa Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZwlU0IgLiMWe6FYLwK1fYRdPnSekj0ZTairWFQxymLBA5xN0_ATD77tUcsxXAXEw2C7XSJehK1JDgiZ6UzckSogfo5-kWQLW1N4uLgabkseBiVUks5g8uarUsk5yoCT_sELY9ddC8dSEaez0jFMR44KxpTnHXLGZl1jHgjePsVucIcF2ilmr6V9jApMztN_AK2M5pL6IDeOjQI_2cZcsCXV2NjvCo-8ku_4vjKuETAPyYFLqOYVnpt2L0dRp2e74Swy03_IhZJJU"/>
);

const WalletHeader = () => (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border/60 px-10 py-4 backdrop-blur-sm bg-black/20 text-white">
        <Link href="/" className="flex items-center gap-2">
            <AppLogo />
            <span className="font-semibold text-lg tracking-tight">ResuMaster</span>
        </Link>
    </header>
);

export default function WalletPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black/30 text-white">
            <WalletHeader />
            <main className="flex-grow px-4 sm:px-6 lg:px-40 py-10">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold tracking-tight">Wallet</h1>
                        <p className="mt-2 text-muted-foreground">Manage your credits and plan.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Current Balance Card */}
                            <Card className="bg-secondary/50 backdrop-blur-xl border-border/60 shadow-2xl transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-primary/20 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold mb-1 text-white">Current Balance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-5xl font-extrabold text-primary">100</p>
                                        <span className="text-2xl font-medium text-muted-foreground">credits</span>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">Ready to be used across all our services.</p>
                                    <Button 
                                        asChild
                                        className="mt-6 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-base leading-normal tracking-wide shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-primary/40"
                                    >
                                        <Link href="/billing?step=add">Add More Credits</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                            
                            {/* Current Plan Card */}
                            <Card className="bg-secondary/50 backdrop-blur-xl border-border/60 shadow-2xl transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-primary/20 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-white">Current Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="text-xl font-bold text-white">Premium Plan</p>
                                            <p className="text-muted-foreground text-sm mt-1">Unlimited access to all features.</p>
                                        </div>
                                        <div className="text-sm text-center sm:text-right">
                                            <p className="text-muted-foreground">Renews on</p>
                                            <p className="font-semibold text-white">July 15, 2024</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-border/60 pt-6">
                                        <Link className="text-sm font-semibold text-primary hover:underline" href="/billing">Manage Subscription</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <Card className="bg-secondary/50 backdrop-blur-xl border-border/60 shadow-2xl p-8 sticky top-10">
                                <h3 className="text-lg font-bold mb-4 text-white">Credit Card</h3>
                                <div className="relative aspect-[1.58/1] w-full rounded-lg bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-4 flex flex-col justify-between shadow-inner backdrop-blur-sm border border-white/10 transition-transform duration-300 hover:scale-105">
                                    <div className="flex justify-between items-start">
                                        <div className="w-8 h-8 text-white opacity-50"><NovaLogo /></div>
                                        <VisaLogo />
                                    </div>
                                    <div>
                                        <p className="text-white font-mono text-lg tracking-wider">**** **** **** 1234</p>
                                        <div className="flex justify-between mt-2 text-xs text-gray-300 uppercase">
                                            <p>John Doe</p>
                                            <p>12/25</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="mt-6 w-full bg-secondary/50 hover:bg-secondary/80 text-white font-bold py-3 px-6 rounded-lg text-base leading-normal tracking-wide transition-all duration-300 ease-in-out hover:scale-105">
                                    Update Payment Method
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
