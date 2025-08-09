
"use client";

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '@/lib/types';
import SectionCard from '@/components/resume-form/section-card';
import { Briefcase } from 'lucide-react';

export default function JobDetailsCard() {
    const { control } = useFormContext<ResumeData>();
    
    return (
        <SectionCard title="Target Job Details" value="job-details">
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="jobPosition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Senior Product Manager" {...field} />
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
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Google" {...field} />
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
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Paste the job description here to get tailored suggestions and an accurate ATS score." 
                                {...field} 
                                rows={8} 
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </SectionCard>
    );
}
