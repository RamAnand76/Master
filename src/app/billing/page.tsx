
"use client";

import HomeHeader from '@/components/home/home-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals starting out.',
    features: [
      '5 Resume Projects',
      'Standard Templates',
      'Basic AI Suggestions',
      'Community Support',
    ],
    cta: 'Current Plan',
    isCurrent: true,
  },
  {
    name: 'Premium',
    price: '$9',
    description: 'For professionals who want to stand out.',
    features: [
      'Unlimited Resume Projects',
      'Premium Templates',
      'Advanced AI Suggestions & Tailoring',
      'ATS Score Optimization',
      'Priority Support',
    ],
    cta: 'Upgrade to Premium',
    isMostPopular: true,
  },
  {
    name: 'Institution',
    price: 'Contact Us',
    description: 'For universities and organizations.',
    features: [
      'Everything in Premium',
      'Custom Branding',
      'Team Management & Analytics',
      'Dedicated Account Manager',
      'Volume Licensing',
    ],
    cta: 'Contact Sales',
  },
];

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <HomeHeader />
      <main className="max-w-7xl mx-auto p-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Choose the plan that's right for you. Unlock powerful features to accelerate your job search.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn('flex flex-col h-full', plan.isMostPopular && 'border-primary shadow-lg')}>
                 <CardHeader className="relative">
                    {plan.isMostPopular && (
                        <Badge className="absolute top-[-10px] right-4 bg-primary text-primary-foreground">Most Popular</Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name !== 'Institution' && <span className="text-muted-foreground">/ month</span>}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                    className="w-full" 
                    disabled={plan.isCurrent}
                    variant={plan.isMostPopular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
