
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type AddCreditsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AddCreditsDialog({ open, onOpenChange }: AddCreditsDialogProps) {
    const router = useRouter();

    const handleSubmit = () => {
        onOpenChange(false);
        router.push('/billing?step=add');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 border-0 max-w-md bg-transparent shadow-none">
                <div className="w-full rounded-2xl shadow-2xl overflow-hidden glassmorphic">
                    <div className="p-8 text-center text-white">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-white transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </button>
                        <h2 className="text-3xl font-bold mb-2">Add Credits</h2>
                        <p className="text-[var(--text-secondary)] mb-8">Enter your phone number to proceed.</p>
                        <div className="text-left mb-6">
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2" htmlFor="phone-number">Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-secondary)]">+1</span>
                                <input className="form-input w-full pl-10 pr-4 py-3 rounded-lg border-[var(--border-primary)] bg-[var(--background-secondary)] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-[var(--brand-primary)] transition-shadow duration-300" id="phone-number" name="phone-number" placeholder="(555) 000-0000" type="tel"/>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="w-full sm:w-1/2 py-3 px-6 bg-[var(--brand-secondary)] hover:bg-opacity-80 text-white font-bold rounded-lg transition-all duration-300 h-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="w-full sm:w-1/2 py-3 px-6 bg-[var(--brand-primary)] hover:brightness-110 text-white font-bold rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(61,153,245,0.3)] h-auto"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
