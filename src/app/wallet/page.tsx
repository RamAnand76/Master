
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

const NovaLogo = () => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);

const VisaLogo = () => (
    <img className="w-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZwlU0IgLiMWe6FYLwK1fYRdPnSekj0ZTairWFQxymLBA5xN0_ATD77tUcsxXAXEw2C7XSJehK1JDgiZ6UzckSogfo5-kWQLW1N4uLgabkseBiVUks5g8uarUsk5yoCT_sELY9ddC8dSEaez0jFMR44KxpTnHXLGZl1jHgjePsVucIcF2ilmr6V9jApMztN_AK2M5pL6IDeOjQI_2cZcsCXV2NjvCo-8ku_4vjKuETAPyYFLqOYVnpt2L0dRp2e74Swy03_IhZJJU"/>
);

const WalletHeader = () => (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[rgba(34,54,73,0.6)] px-10 py-4 backdrop-blur-sm bg-black/20 text-white">
        <div className="flex items-center gap-4">
            <div className="size-6 text-[#5ea5ff]">
                <NovaLogo />
            </div>
            <h2 className="text-xl font-bold">Nova</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-[#5ea5ff] transition-colors">Home</Link>
            <a className="text-sm font-medium hover:text-[#5ea5ff] transition-colors" href="#">Explore</a>
            <a className="text-sm font-medium hover:text-[#5ea5ff] transition-colors" href="#">Create</a>
        </nav>
        <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[rgba(26,38,49,0.5)] transition-colors">
                <Bell className="text-[#c0d1e5] hover:text-white"/>
            </button>
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlQ2gZ3442ucOxT50rmo218kMzf8KYflEs6Y2qBvqD4GNIFp4vCv-LSUGwDOsX37ejy0MkF_7FDRNp2nUoRDpcnxfz64FkVn29qPDQqJ1kJ_pOyuxBvzyPZsV6vpdDkf-lRm2lbrqdTYlQsG5esdeB6oshTHF_z3dJ8ZKsjy1vbsGjW48yoVmJzFRw8YFot5icUr6eFS0af3h-duvpcMFwLzTZ4kDFP10pPo1WP1WuDoYpsAInfqLedeiw-MjeDZPQWNeSLE1B9l0" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        </div>
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
                        <p className="mt-2 text-[#c0d1e5]">Manage your credits and plan.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Current Balance Card */}
                            <div className="bg-[rgba(26,38,49,0.5)] backdrop-blur-xl border border-[rgba(34,54,73,0.6)] rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-blue-500/20 overflow-hidden">
                                <div className="p-8">
                                    <h2 className="text-lg font-bold mb-1">Current Balance</h2>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-5xl font-extrabold text-[#5ea5ff]">100</p>
                                        <span className="text-2xl font-medium text-[#c0d1e5]">credits</span>
                                    </div>
                                    <p className="mt-2 text-sm text-[#c0d1e5]">Ready to be used across all our services.</p>
                                    <Button className="mt-6 w-full sm:w-auto bg-[#5ea5ff] hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-base leading-normal tracking-wide shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-blue-500/40">
                                        Add More Credits
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Current Plan Card */}
                            <div className="bg-[rgba(26,38,49,0.5)] backdrop-blur-xl border border-[rgba(34,54,73,0.6)] rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-blue-500/20 overflow-hidden">
                                <div className="p-8">
                                    <h2 className="text-lg font-bold mb-4">Current Plan</h2>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="text-xl font-bold text-white">Premium Plan</p>
                                            <p className="text-[#c0d1e5] text-sm mt-1">Unlimited access to all features.</p>
                                        </div>
                                        <div className="text-sm text-center sm:text-right">
                                            <p className="text-[#c0d1e5]">Renews on</p>
                                            <p className="font-semibold text-white">July 15, 2024</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-[rgba(34,54,73,0.6)] pt-6">
                                        <a className="text-sm font-semibold text-[#5ea5ff] hover:underline" href="#">Manage Subscription</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-[rgba(26,38,49,0.5)] backdrop-blur-xl border border-[rgba(34,54,73,0.6)] rounded-2xl shadow-2xl p-8 sticky top-10">
                                <h3 className="text-lg font-bold mb-4">Credit Card</h3>
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
                                <Button className="mt-6 w-full bg-[rgba(26,38,49,0.5)] hover:bg-gray-700/50 text-white font-bold py-3 px-6 rounded-lg text-base leading-normal tracking-wide transition-all duration-300 ease-in-out hover:scale-105">
                                    Update Payment Method
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
