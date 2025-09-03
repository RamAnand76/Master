
"use client";

import { useFormContext, Controller } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';

export default function JobDetailsCard() {
    const { control } = useFormContext<ResumeData>();
    
    return (
        <div className="space-y-6 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
            <h2 className="text-base/7 font-semibold text-accent">Target Job Details</h2>
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="jobPosition"
                        render={({ field }) => (
                           <FormItem>
                             <Label>Job Position</Label>
                             <FormControl>
                                <Input placeholder="e.g. Senior Product Manager" {...field} className="mt-1 bg-input" />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                        )}
                        />
                    <FormField
                        control={control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Company</Label>
                                <FormControl>
                                    <Input placeholder="e.g. Google" {...field} className="mt-1 bg-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="jobDescription"
                    render={({ field }) => (
                       <FormItem>
                         <Label>Job Description</Label>
                         <FormControl>
                            <Textarea 
                                placeholder="Paste the job description here to get tailored suggestions and an accurate ATS score." 
                                {...field} 
                                rows={8}
                                className='mt-1 resize-none bg-input'
                            />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

    