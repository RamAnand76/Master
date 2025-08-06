
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type ResumeData, resumeDataSchema, experienceSchema, type GenerateTailoredResumeInput } from "@/lib/types";
import { generateTailoredResumeAction } from "@/lib/actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MultiStepLoader } from "./ui/multi-step-loader";

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
    { text: "Optimizing your work experience..." },
    { text: "Building your new resume..." },
  ];

export default function NewProjectModal({ isOpen, onOpenChange, onProjectCreate }: NewProjectModalProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    const methods = useForm<NewProjectFormValues>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            title: "",
            jobPosition: "",
            company: "",
            jobDescription: "",
        }
    });

  const { handleSubmit, control } = methods;

  const onSubmit = async (values: NewProjectFormValues) => {
    let summary = 'A brief professional summary about yourself.';
    let experienceDescription = '- Bullet point about your achievement.';

    if (values.jobDescription) {
        setIsGenerating(true);
        try {
            const result = await generateTailoredResumeAction({
                jobPosition: values.jobPosition,
                company: values.company,
                jobDescription: values.jobDescription,
            });

            if (result && !("error" in result)) {
                summary = result.summary;
                experienceDescription = result.experienceDescription;
                toast({ title: "Success", description: "AI has tailored your resume!" });
            } else {
                toast({ variant: "destructive", title: "Error", description: result?.error || "Could not generate tailored content." });
            }
        } finally {
            setIsGenerating(false);
        }
    }


    const newProject = resumeDataSchema.parse({
      id: `studio-${Math.random().toString(36).substring(2, 12)}`,
      name: values.title,
      createdAt: new Date().toISOString(),
      summary,
      experience: [
        experienceSchema.parse({
          role: values.jobPosition,
          company: values.company,
          description: experienceDescription,
        }),
      ],
      jobDescription: values.jobDescription,
    });
    
    onProjectCreate(newProject);
    onOpenChange(false);
    methods.reset();
  };
  
  if (isGenerating) {
    return <MultiStepLoader loadingStates={loadingStates} loading={true} duration={1500} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                <Button type="submit">Create Resume</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
