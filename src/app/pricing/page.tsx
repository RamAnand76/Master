
"use client";

import { Check, X } from 'lucide-react';
import HomeHeader from '@/components/home/home-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const plans = [
    {
        name: 'Free',
        price: '₹0',
        description: 'For individuals starting out.',
        features: [
            { text: '5 Resume Projects', included: true },
            { text: 'Access to Free Templates', included: true },
            { text: 'Basic AI Suggestions', included: true },
            { text: 'Community Support', included: true },
            { text: 'Limited ATS Analysis', included: false },
            { text: 'Priority Support', included: false },
        ],
        cta: 'Current Plan',
        isCurrent: true,
    },
    {
        name: 'Pro',
        price: '₹1200',
        description: 'For professionals aiming high.',
        features: [
            { text: '50 Resume Projects', included: true },
            { text: 'Access to All Templates', included: true },
            { text: 'Advanced AI Suggestions', included: true },
            { text: 'Email Support', included: true },
            { text: 'Detailed ATS Analysis', included: true },
            { text: 'Priority Support', included: false },
        ],
        cta: 'Upgrade to Pro',
        isCurrent: false,
        isPopular: true,
    },
    {
        name: 'Premium',
        price: '₹2000',
        description: 'For power users and teams.',
        features: [
            { text: 'Unlimited Resume Projects', included: true },
            { text: 'Access to All Templates', included: true },
            { text: 'Advanced AI Suggestions', included: true },
            { text: '24/7 Priority Support', included: true },
            { text: 'In-depth ATS Analysis & Reports', included: true },
            { text: 'Team Collaboration Features', included: true },
        ],
        cta: 'Upgrade to Premium',
        isCurrent: false,
    },
];


export default function PricingPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background pb-24">
            <div className="sticky top-0 z-10 w-full border-b border-solid border-border/60 bg-background/80 backdrop-blur-sm">
                <HomeHeader />
            </div>
            <main className="flex-1">
                <div className="container mx-auto max-w-5xl px-4 py-12 text-center sm:py-20">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Find the perfect plan
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Start for free and scale up as you grow. All plans include our AI-powered resume builder.
                    </p>
                </div>

                <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card 
                            key={plan.name}
                            className={cn("flex flex-col", plan.isPopular && "border-primary ring-2 ring-primary/50")}
                        >
                             {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div>
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature.text} className="flex items-center gap-2">
                                            {feature.included ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <X className="h-4 w-4 text-destructive" />
                                            )}
                                            <span className={cn(!feature.included && "text-muted-foreground")}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" disabled={plan.isCurrent}>
                                    <Link href="/billing">{plan.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
