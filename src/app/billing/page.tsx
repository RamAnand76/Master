
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { AppLogo } from '@/components/home/app-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BillingHeader = () => (
    <header className="sticky top-0 z-10 w-full border-b border-solid border-border/60 px-10 py-4 backdrop-blur-sm bg-black/20 text-white">
        <Link href="/" className="flex items-center gap-2">
            <AppLogo />
            <span className="font-semibold text-lg tracking-tight">ResuMaster</span>
        </Link>
    </header>
);

const Step1 = ({ onNext }: { onNext: (step: string) => void }) => {
    return (
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">Step 1 of 4</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Verify Your Account</h2>
                <p className="mt-4 text-lg text-muted-foreground">Enter your phone number to proceed.</p>
            </div>
            <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
                 <div className="text-left mb-6">
                    <Label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="phone-number">Phone Number</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">+1</span>
                        <Input className="w-full pl-10 pr-4 py-3 h-12 rounded-lg border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300" id="phone-number" name="phone-number" placeholder="(555) 000-0000" type="tel"/>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row">
                    <Link href="/wallet" className="flex w-full items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary/80">Cancel</Link>
                    <button onClick={() => onNext('add')} className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">Submit</button>
                </div>
            </div>
        </div>
    )
}

const Step2 = ({ onNext, onBack }: { onNext: (step: string) => void, onBack: (step: string) => void; }) => {
    return (
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">Step 2 of 4</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Add Credits</h2>
                <p className="mt-4 text-lg text-muted-foreground">Choose an amount and payment method.</p>
            </div>
            <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Select amount</h3>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {['10', '25', '50', '100'].map((amount, idx) => (
                                <label key={amount} className="group relative flex cursor-pointer items-center justify-center rounded-xl border border-border p-4 text-center text-sm font-medium transition-all hover:bg-secondary has-[:checked]:border-2 has-[:checked]:border-primary has-[:checked]:bg-secondary/80 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-background">
                                    <input className="peer sr-only" name="credit_amount" type="radio" value={amount} defaultChecked={idx === 1}/>
                                    <span className="text-lg font-bold">${amount}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Payment method</h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                             <label className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-all hover:bg-secondary has-[:checked]:border-2 has-[:checked]:border-primary has-[:checked]:bg-secondary/80 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-background">
                                <input className="peer sr-only" name="payment_method" type="radio" value="credit_card"/>
                                <svg className="h-6 w-6 text-muted-foreground group-has-[:checked]:text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Credit Card</span>
                            </label>
                            <label className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-all hover:bg-secondary has-[:checked]:border-2 has-[:checked]:border-primary has-[:checked]:bg-secondary/80 has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-background">
                                <input defaultChecked className="peer sr-only" name="payment_method" type="radio" value="paypal"/>
                                <svg className="h-6 w-6 text-muted-foreground group-has-[:checked]:text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.454 4.223a.25.25 0 0 0-.236.32l2.674 15.368c.071.408.43.704.845.704h3.332c.416 0 .774-.296.845-.704l1.337-7.695c.07-.408.43-.704.845-.704h2.98c3.834 0 6.43-2.115 6.43-5.234C22.5 2.85 19.98 1 15.656 1H7.835c-.416 0-.774.296-.845-.704L3.454 4.223Z M9.645 4.223h5.926c2.338 0 3.738 1.157 3.738 3.321 0 1.956-1.154 3.033-2.88 3.033h-2.14c-.416 0-.774.296-.845.704l-1.337 7.695a.25.25 0 0 1-.253.211H8.524a.25.25 0 0 1-.253-.211L6.934 4.544a.25.25 0 0 1 .253-.29h2.458Z"></path>
                                </svg>
                                <span>PayPal</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row">
                    <button onClick={() => onBack('phone')} className="flex w-full items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary/80">Back</button>
                    <button onClick={() => onNext('review')} className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">Add credits</button>
                </div>
            </div>
        </div>
    );
};

const Step3 = ({ onNext, onBack }: { onNext: (step: string) => void; onBack: (step: string) => void }) => {
    return (
        <div className="mx-auto w-full max-w-lg space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">Step 3 of 4</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Review Your Purchase</h2>
                <p className="mt-4 text-lg text-muted-foreground">Please review your transaction details below.</p>
            </div>
            <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Transaction Summary</h3>
                        <div className="mt-4 space-y-4 rounded-xl border border-border bg-secondary/50 p-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Credit Amount:</span>
                                <span className="font-semibold">$25.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Method:</span>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.454 4.223a.25.25 0 0 0-.236.32l2.674 15.368c.071.408.43.704.845.704h3.332c.416 0 .774-.296.845-.704l1.337-7.695c.07-.408.43-.704.845-.704h2.98c3.834 0 6.43-2.115 6.43-5.234C22.5 2.85 19.98 1 15.656 1H7.835c-.416 0-.774.296-.845.704L3.454 4.223Z M9.645 4.223h5.926c2.338 0 3.738 1.157 3.738 3.321 0 1.956-1.154 3.033-2.88 3.033h-2.14c-.416 0-.774.296-.845.704l-1.337 7.695a.25.25 0 0 1-.253.211H8.524a.25.25 0 0 1-.253-.211L6.934 4.544a.25.25 0 0 1 .253-.29h2.458Z"></path>
                                    </svg>
                                    <span className="font-semibold">PayPal</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Processing Fee:</span>
                                <span className="font-semibold">$1.50</span>
                            </div>
                            <div className="border-t border-border pt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-lg font-bold">$26.50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row">
                    <button onClick={() => onBack('add')} className="flex w-full items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary/80">Edit</button>
                    <button onClick={() => onNext('success')} className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const Step4 = () => {
    return (
        <div className="w-full max-w-md text-center">
            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></div>
                <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Credits Added Successfully!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Your transaction was successful and the credits have been added to your account.
            </p>
            <div className="mt-8 rounded-lg bg-secondary/50 p-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Amount Added</p>
                        <p className="text-lg font-bold text-white">$25.00</p>
                    </div>
                    <div className="h-px bg-border"></div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">New Credit Balance</p>
                        <p className="text-2xl font-extrabold text-primary">$125.00</p>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <Link href="/wallet" className="inline-block w-full max-w-xs rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                    Back to Wallet
                </Link>
            </div>
        </div>
    );
};


export default function BillingPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentStep = searchParams.get('step') || 'phone';

    const handleNext = (step: string) => {
        router.push(`/billing?step=${step}`);
    };
    
    const renderStep = () => {
        switch (currentStep) {
            case 'add':
                return <Step2 onNext={handleNext} onBack={handleNext} />;
            case 'review':
                return <Step3 onNext={handleNext} onBack={handleNext} />;
            case 'success':
                return <Step4 />;
            case 'phone':
            default:
                return <Step1 onNext={handleNext} />;
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden wallet-bg text-foreground">
            <BillingHeader />
            <main className="flex flex-1 items-center justify-center py-16 sm:py-24 lg:py-32 pb-24 sm:pb-32 lg:pb-40">
                {renderStep()}
            </main>
        </div>
    )
}

    