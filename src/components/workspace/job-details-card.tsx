
"use client";

import { useFormContext, Controller } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import { Fieldset, Legend, Label, Input, Textarea } from '@headlessui/react';
import clsx from 'clsx';

const inputClasses = clsx(
    'block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-foreground',
    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
);

export default function JobDetailsCard() {
    const { control } = useFormContext<ResumeData>();
    
    return (
        <Fieldset className="space-y-6 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
            <Legend className="text-base/7 font-semibold text-accent">Target Job Details</Legend>
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        control={control}
                        name="jobPosition"
                        render={({ field }) => (
                           <div>
                             <Label className="text-sm/6 font-medium text-foreground">Job Position</Label>
                             <Input placeholder="e.g. Senior Product Manager" {...field} className={inputClasses} />
                           </div>
                        )}
                        />
                    <Controller
                        control={control}
                        name="company"
                        render={({ field }) => (
                            <div>
                                <Label className="text-sm/6 font-medium text-foreground">Company</Label>
                                <Input placeholder="e.g. Google" {...field} className={inputClasses} />
                            </div>
                        )}
                    />
                </div>
                <Controller
                    control={control}
                    name="jobDescription"
                    render={({ field }) => (
                       <div>
                         <Label className="text-sm/6 font-medium text-foreground">Job Description</Label>
                         <Textarea 
                            placeholder="Paste the job description here to get tailored suggestions and an accurate ATS score." 
                            {...field} 
                            rows={8}
                            className={clsx(inputClasses, 'mt-1 resize-none')}
                         />
                       </div>
                    )}
                />
            </div>
        </Fieldset>
    );
}
