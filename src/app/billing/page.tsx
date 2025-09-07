
"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle, CheckCircle2, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import HomeHeader from '@/components/home/home-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const creditOptions = [
    { amount: 10, price: 10, popular: false },
    { amount: 25, price: 22, popular: true },
    { amount: 50, price: 40, popular: false },
    { amount: 100, price: 75, popular: false },
];

const AddCreditsStep = ({ onNext, onBack }: { onNext: (amount: number, price: number) => void; onBack: () => void; }) => {
    const [selectedAmount, setSelectedAmount] = useState<string>("25");
    const selectedOption = creditOptions.find(opt => opt.amount === parseInt(selectedAmount));

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Add Credits</CardTitle>
                <CardDescription>Choose how many credits you want to add to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {creditOptions.map(({ amount, price, popular }) => (
                        <Label 
                            key={amount} 
                            htmlFor={`amount-${amount}`}
                            className={cn(
                                "flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all",
                                "hover:border-primary",
                                amount.toString() === selectedAmount && "border-primary ring-2 ring-primary/50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value={amount.toString()} id={`amount-${amount}`} />
                                <div>
                                    <span className="font-semibold text-foreground">{amount} Credits</span>
                                    <p className="text-sm text-muted-foreground">${price}.00</p>
                                </div>
                            </div>
                            {popular && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Popular</span>}
                        </Label>
                    ))}
                    </div>
                </RadioGroup>
                <div className="flex flex-row gap-2">
                    <Button onClick={onBack} variant="outline" className="flex-1">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                    <Button onClick={() => onNext(selectedOption!.amount, selectedOption!.price)} className="flex-1">
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const PaymentStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void; }) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your credit card information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="card-number" placeholder="0000 0000 0000 0000" className="pl-9" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 pt-4">
                    <Button onClick={onBack} variant="outline" className="flex-1">
                         <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                    <Button onClick={onNext} className="flex-1">
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const ReviewStep = ({ onConfirm, onBack, isProcessing, amount, price }: { onConfirm: () => void; onBack: () => void; isProcessing: boolean, amount: number, price: number }) => {
    const processingFee = (price * 0.05).toFixed(2);
    const total = (price + parseFloat(processingFee)).toFixed(2);

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Review Your Purchase</CardTitle>
                <CardDescription>Please confirm the details of your transaction.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 rounded-lg border bg-secondary/30 p-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Credit Amount:</span>
                        <span className="font-semibold">{amount} credits</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">${price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">Visa **** 1234</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span className="font-semibold">${processingFee}</span>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold">${total}</span>
                        </div>
                    </div>
                </div>
                 <div className="flex flex-row gap-4">
                    <Button onClick={onBack} variant="outline" className="flex-1" disabled={isProcessing}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                    <Button onClick={onConfirm} className="flex-1" disabled={isProcessing}>
                        {isProcessing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const SuccessModal = ({ isOpen, onOpenChange, amount }: { isOpen: boolean, onOpenChange: () => void, amount: number }) => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="items-center text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                    <DialogTitle className="text-xl">Credits Added Successfully!</DialogTitle>
                    <DialogDescription>Your transaction was successful. Happy creating!</DialogDescription>
                </DialogHeader>
                <div className="my-4 rounded-lg bg-secondary/50 p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Amount Added</p>
                        <p className="text-base font-bold text-foreground">{amount} credits</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">New Credit Balance</p>
                        <p className="text-xl font-extrabold text-primary">{user.credits}</p>
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button onClick={() => router.push('/wallet')} className="w-full">
                        Back to Wallet
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


function BillingFlow() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<{amount: number, price: number} | null>(null);
    const { user, updateUser } = useUser();

    const currentStep = searchParams.get('step') || 'add';

    const navigateToStep = (step: string) => {
        setIsNavigating(true);
        setTimeout(() => {
            router.push(`/billing?step=${step}`);
        }, 500); // Simulate network latency
    };

    useEffect(() => {
        setIsNavigating(false);
    }, [searchParams]);

    const handleSelectCredits = (amount: number, price: number) => {
        setSelectedPurchase({ amount, price });
        navigateToStep('payment');
    };

    const handlePayment = () => {
        navigateToStep('review');
    };
    
    const handleConfirm = () => {
        if (!selectedPurchase) return;
        setIsProcessing(true);
        setTimeout(() => {
            updateUser({ credits: user.credits + selectedPurchase.amount });
            setIsProcessing(false);
            setIsSuccessModalOpen(true);
        }, 2000); // Simulate network request
    };

    const renderStep = () => {
        if (isNavigating) {
            return (
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading next step...</p>
                </div>
            );
        }

        switch (currentStep) {
            case 'payment':
                return <PaymentStep onNext={handlePayment} onBack={() => navigateToStep('add')} />;
            case 'review':
                if (!selectedPurchase) {
                     // This case happens if the user navigates directly to the review URL.
                     // We redirect them back to the start.
                    router.push('/billing?step=add');
                    return null;
                }
                return <ReviewStep onConfirm={handleConfirm} onBack={() => navigateToStep('payment')} isProcessing={isProcessing} {...selectedPurchase} />;
            case 'add':
            default:
                return <AddCreditsStep onNext={handleSelectCredits} onBack={() => router.push('/wallet')} />;
        }
    }

    return (
        <>
            <main className="flex flex-1 items-center justify-center py-16 sm:py-24">
                {renderStep()}
            </main>
            <SuccessModal 
                isOpen={isSuccessModalOpen} 
                onOpenChange={() => setIsSuccessModalOpen(false)} 
                amount={selectedPurchase?.amount || 0}
            />
        </>
    );
}

export default function BillingPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
            <div className="sticky top-0 z-10 w-full border-b border-solid border-border/60 bg-background/80 backdrop-blur-sm">
                <HomeHeader />
            </div>
            <Suspense fallback={
                <div className="flex flex-1 items-center justify-center">
                    <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                </div>
            }>
                <BillingFlow />
            </Suspense>
        </div>
    )
}
