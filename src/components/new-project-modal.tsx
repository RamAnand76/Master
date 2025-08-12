
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type ResumeData, resumeDataSchema, experienceSchema } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { generateTailoredResumeAction } from "@/lib/actions";

const newProjectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  jobPosition: z.string().min(1, "Job position is required."),
  company: z.string().min(1, "Company is required."),
  jobDescription: z.string().optional(),
});

type NewProjectFormValues = z.infer<typeof newProjectSchema>;

type NewProjectModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectCreate: (newProject: ResumeData) => void;
};

const loadingStates = [
    { text: "Analyzing job description..." },
    { text: "Tailoring your professional summary..." },
    { text: "Building your new resume..." },
  ];

export default function NewProjectModal({ isOpen, onOpenChange, onProjectCreate }: NewProjectModalProps) {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const methods = useForm<NewProjectFormValues>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            title: "",
            jobPosition: "",
            company: "",
            jobDescription: "",
        }
    });

  const { handleSubmit, control, watch } = methods;
  const jobDescription = watch('jobDescription');

  const onSubmit = async (values: NewProjectFormValues) => {
    if (values.jobDescription) {
        setIsGenerating(true);
    }

    let summary = resumeDataSchema.shape.summary._def.defaultValue as string;
    let experienceDescription = experienceSchema.shape.description._def.defaultValue as string;
    const maxSummaryLength = resumeDataSchema.shape.summary.maxLength || 350;

    if (values.jobDescription) {
        try {
            const result = await generateTailoredResumeAction({
                jobPosition: values.jobPosition,
                company: values.company,
                jobDescription: values.jobDescription,
            });

            if (result && "summary" in result) {
                summary = result.summary.substring(0, maxSummaryLength);
                experienceDescription = result.experienceDescription;
            } else {
                toast({
                    variant: "destructive",
                    title: "AI Enhancement Failed",
                    description: result?.error || "Could not generate tailored content. Using default values.",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "AI Enhancement Error",
                description: "An unexpected error occurred while generating content.",
            });
        }
    }
    
    setIsGenerating(false);

    const newProject = resumeDataSchema.parse({
      id: `studio-${Math.random().toString(36).substring(2, 12)}`,
      name: values.title,
      createdAt: new Date().toISOString(),
      summary,
      experience: experienceDescription ? [experienceSchema.parse({ description: experienceDescription })] : [],
      jobDescription: values.jobDescription,
      jobPosition: values.jobPosition,
      company: values.company,
      template: 'classic',
    });
    
    onProjectCreate(newProject);
    onOpenChange(false);
    methods.reset();
  };

  return (
    <>
    <MultiStepLoader loadingStates={loadingStates} loading={isGenerating} duration={1500} />
    <Dialog open={isOpen && !isGenerating} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Resume</DialogTitle>
          <DialogDescription>
            Start by telling us about the job you're applying for.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior Product Manager Resume" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste the job description here to get tailored suggestions." {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isGenerating}>
                    {jobDescription ? 'Create & Enhance with AI' : 'Create Resume'}
                </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
    </>
  );
}
