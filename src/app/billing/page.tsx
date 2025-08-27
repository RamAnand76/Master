
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const NovaPayLogo = () => (
    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_6_330)">
            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
        </g>
        <defs>
            <clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath>
        </defs>
    </svg>
);

const HelpIcon = () => (
    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
    </svg>
);

const UserAvatar = () => (
    <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAowQIRN_HWMi0M808GLrBw48bavA9KqjaY1ewa1ex8moF-c0iKEEP-CP8yz9K_5CSXdXK-JzCDZ58mTW5m5FkJyqs7LDpXGXIELdZgEkZelmNBeJj20JHrKdNKRgJlnd6xXW1VRBxs5gpolx4vrbJ50z9JPE7EuM0GIA8X84QTtOJ2Yor3mGk4jsIWcEgnYwhwLDf9aVJF2sHGzLtkLRehG0Z2_u-SkpvoTVS6DTxq6LUYf0htB_qfJZNHpHz_D2vAEPdCYDwxT8I")'}}></div>
);

const NovaPayHeader = () => (
    <header className="sticky top-0 z-10 w-full border-b border-[var(--border-primary)] bg-[var(--background-primary)]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-4">
                <Link className="flex items-center gap-3" href="/">
                    <NovaPayLogo />
                    <h1 className="text-xl font-bold tracking-tighter">NovaPay</h1>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background-secondary)] text-gray-300 transition-colors hover:bg-[var(--brand-secondary)]">
                    <HelpIcon />
                </button>
                <button>
                    <UserAvatar />
                </button>
            </div>
        </div>
    </header>
);

const Step2 = ({ onNext }: { onNext: (step: string) => void }) => {
    return (
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <p className="text-base font-semibold text-[var(--brand-primary)]">Step 2 of 3</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Add Credits</h2>
                <p className="mt-4 text-lg text-gray-400">Choose an amount or link a payment method.</p>
            </div>
            <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Select amount</h3>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {['10', '25', '50', '100'].map((amount, idx) => (
                                <label key={amount} className="group relative flex cursor-pointer items-center justify-center rounded-xl border border-[var(--border-primary)] p-4 text-center text-sm font-medium transition-all hover:bg-[var(--brand-secondary)] has-[:checked]:border-2 has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[var(--background-secondary)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--brand-primary)] has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-[var(--background-primary)]">
                                    <input className="peer sr-only" name="credit_amount" type="radio" value={amount} defaultChecked={idx === 1}/>
                                    <span className="text-lg font-bold">${amount}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Payment method</h3>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                             <label className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-xl border border-[var(--border-primary)] p-4 text-sm font-medium transition-all hover:bg-[var(--brand-secondary)] has-[:checked]:border-2 has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[var(--background-secondary)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--brand-primary)] has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-[var(--background-primary)]">
                                <input className="peer sr-only" name="payment_method" type="radio" value="credit_card"/>
                                <svg className="h-6 w-6 text-gray-400 group-has-[:checked]:text-[var(--brand-primary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Credit Card</span>
                            </label>
                            <label className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-xl border border-[var(--border-primary)] p-4 text-sm font-medium transition-all hover:bg-[var(--brand-secondary)] has-[:checked]:border-2 has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[var(--background-secondary)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--brand-primary)] has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-[var(--background-primary)]">
                                <input defaultChecked className="peer sr-only" name="payment_method" type="radio" value="paypal"/>
                                <svg className="h-6 w-6 text-gray-400 group-has-[:checked]:text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.454 4.223a.25.25 0 0 0-.236.32l2.674 15.368c.071.408.43.704.845.704h3.332c.416 0 .774-.296.845-.704l1.337-7.695c.07-.408.43-.704.845-.704h2.98c3.834 0 6.43-2.115 6.43-5.234C22.5 2.85 19.98 1 15.656 1H7.835c-.416 0-.774.296-.845.704L3.454 4.223Z M9.645 4.223h5.926c2.338 0 3.738 1.157 3.738 3.321 0 1.956-1.154 3.033-2.88 3.033h-2.14c-.416 0-.774.296-.845.704l-1.337 7.695a.25.25 0 0 1-.253.211H8.524a.25.25 0 0 1-.253-.211L6.934 4.544a.25.25 0 0 1 .253-.29h2.458Z"></path>
                                </svg>
                                <span>PayPal</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row">
                    <Link href="/wallet" className="flex w-full items-center justify-center rounded-xl bg-[var(--brand-secondary)] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-opacity-80">Back</Link>
                    <button onClick={() => onNext('review')} className="flex w-full items-center justify-center rounded-xl bg-[var(--brand-primary)] px-4 py-3 text-sm font-bold text-white transition-colors hover:brightness-110">Add credits</button>
                </div>
            </div>
        </div>
    );
};

const Step3 = ({ onNext, onBack }: { onNext: (step: string) => void; onBack: (step: string) => void }) => {
    return (
        <div className="mx-auto w-full max-w-lg space-y-8 px-4 sm:px-0">
            <div className="text-center">
                <p className="text-base font-semibold text-[var(--brand-primary)]">Step 2 of 3</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Review Your Purchase</h2>
                <p className="mt-4 text-lg text-gray-400">Please review your transaction details below.</p>
            </div>
            <div className="glassmorphic rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold leading-6">Transaction Summary</h3>
                        <div className="mt-4 space-y-4 rounded-xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Credit Amount:</span>
                                <span className="font-semibold">$25.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Payment Method:</span>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.454 4.223a.25.25 0 0 0-.236.32l2.674 15.368c.071.408.43.704.845.704h3.332c.416 0 .774-.296.845-.704l1.337-7.695c.07-.408.43-.704.845-.704h2.98c3.834 0 6.43-2.115 6.43-5.234C22.5 2.85 19.98 1 15.656 1H7.835c-.416 0-.774.296-.845.704L3.454 4.223Z M9.645 4.223h5.926c2.338 0 3.738 1.157 3.738 3.321 0 1.956-1.154 3.033-2.88 3.033h-2.14c-.416 0-.774.296-.845.704l-1.337 7.695a.25.25 0 0 1-.253.211H8.524a.25.25 0 0 1-.253-.211L6.934 4.544a.25.25 0 0 1 .253-.29h2.458Z"></path>
                                    </svg>
                                    <span className="font-semibold">PayPal</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Processing Fee:</span>
                                <span className="font-semibold">$1.50</span>
                            </div>
                            <div className="border-t border-[var(--border-primary)] pt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-lg font-bold">$26.50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row">
                    <button onClick={() => onBack('add')} className="flex w-full items-center justify-center rounded-xl bg-[var(--brand-secondary)] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-opacity-80">Edit</button>
                    <button onClick={() => onNext('success')} className="flex w-full items-center justify-center rounded-xl bg-[var(--brand-primary)] px-4 py-3 text-sm font-bold text-white transition-colors hover:brightness-110">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const Step4 = () => {
    return (
        <div className="w-full max-w-md text-center">
            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--background-secondary)]">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--brand-primary)]/20"></div>
                <svg className="h-12 w-12 text-[var(--brand-primary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Credits Added Successfully!</h1>
            <p className="mt-4 text-lg text-gray-400">
                Your transaction was successful and the credits have been added to your account.
            </p>
            <div className="mt-8 rounded-lg bg-[var(--background-secondary)] p-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">Amount Added</p>
                        <p className="text-lg font-bold text-white">$25.00</p>
                    </div>
                    <div className="h-px bg-[var(--border-primary)]"></div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">New Credit Balance</p>
                        <p className="text-2xl font-extrabold text-[var(--brand-primary)]">$125.00</p>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <Link href="/wallet" className="inline-block w-full max-w-xs rounded-lg bg-[var(--brand-primary)] px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 focus:ring-offset-[var(--background-primary)]">
                    Back to Wallet
                </Link>
            </div>
        </div>
    );
};


export default function BillingPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentStep = searchParams.get('step') || 'add';

    const handleNext = (step: string) => {
        router.push(`/billing?step=${step}`);
    };
    
    const renderStep = () => {
        switch (currentStep) {
            case 'review':
                return <Step3 onNext={handleNext} onBack={handleNext} />;
            case 'success':
                return <Step4 />;
            case 'add':
            default:
                return <Step2 onNext={handleNext} />;
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--background-primary)] text-gray-50">
            <NovaPayHeader />
            <main className="flex flex-1 items-center justify-center py-16 sm:py-24 lg:py-32">
                {renderStep()}
            </main>
        </div>
    )
}
