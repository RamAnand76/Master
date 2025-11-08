
"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type ResumeData } from "@/lib/types";
import { resumeDataSchema, experienceSchema, educationSchema } from "@/lib/schemas";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { generateTailoredResumeAction } from "@/lib/actions";
import { templates } from "@/lib/templates";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckCircle2 } from "lucide-react";

const newProjectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  jobPosition: z.string().min(1, "Job position is required."),
  company: z.string().min(1, "Company is required."),
  jobDescription: z.string().optional(),
  template: z.string().default('classic'),
});

type NewProjectFormValues = z.infer<typeof newProjectSchema>;

type NewProjectModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectCreate: (newProject: ResumeData) => void;
  initialTemplate?: string;
};

const loadingStates = [
    { text: "Analyzing job description..." },
    { text: "Tailoring your professional summary..." },
    { text: "Building your new resume..." },
];

const categories = ['All', 'Creative', 'Professional', 'Modern'];

export default function NewProjectModal({ isOpen, onOpenChange, onProjectCreate, initialTemplate = 'classic' }: NewProjectModalProps) {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const methods = useForm<NewProjectFormValues>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            title: "",
            jobPosition: "",
            company: "",
            jobDescription: "",
            template: initialTemplate,
        }
    });

  const { handleSubmit, control, watch, setValue, reset } = methods;
  const jobDescription = watch('jobDescription');
  const selectedTemplate = watch('template');

  useEffect(() => {
    if (isOpen) {
        const defaultCategory = templates.find(t => t.id === initialTemplate)?.category || 'All';
        const defaultValues = {
            title: "",
            jobPosition: "",
            company: "",
            jobDescription: "",
            template: initialTemplate,
        };
        reset(defaultValues);
        setActiveCategory(defaultCategory);
    }
  }, [isOpen, initialTemplate, reset]);

  const filteredTemplates = templates.filter(template => 
      activeCategory === 'All' || template.category === activeCategory
  );

  const onSubmit = async (values: NewProjectFormValues) => {
    if (values.jobDescription) {
        setIsGenerating(true);
    }

    let summary = resumeDataSchema.shape.summary._def.defaultValue as string;
    const maxSummaryLength = resumeDataSchema.shape.summary.maxLength || 300;

    if (values.jobDescription) {
        try {
            const result = await generateTailoredResumeAction({
                jobPosition: values.jobPosition,
                company: values.company,
                jobDescription: values.jobDescription,
            });

            if (result && "summary" in result) {
                summary = result.summary.substring(0, maxSummaryLength);
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
      name: values.title,
      summary,
      experience: [], // Always start with an empty experience array
      education: [educationSchema.parse({})],
      projects: [],
      skills: [],
      jobDescription: values.jobDescription,
      jobPosition: values.jobPosition,
      company: values.company,
      template: values.template,
    });
    
    onProjectCreate(newProject);
    onOpenChange(false);
    methods.reset();
  };

  return (
    <>
    <MultiStepLoader loadingStates={loadingStates} loading={isGenerating} duration={1500} />
    <Dialog open={isOpen && !isGenerating} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] md:h-auto md:max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Create a New Resume</DialogTitle>
          <DialogDescription>
            Start by telling us about the job you're applying for and choose a template.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-1 overflow-hidden">
            
            <div className="flex flex-col space-y-3 overflow-y-auto pr-4 pl-6">
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
            </div>

            <div className="flex flex-col min-h-0 pr-6">
                <FormLabel>Select a Template</FormLabel>
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mt-3">
                    <TabsList>
                        {categories.map(category => (
                            <TabsTrigger key={category} value={category} className="capitalize text-xs h-8">
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <ScrollArea className="mt-3 flex-1 -mr-4 pr-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                        {filteredTemplates.map((template) => {
                            const isSelected = selectedTemplate === template.id;
                            return (
                                <div
                                    key={template.id}
                                    className="cursor-pointer group relative"
                                    onClick={() => setValue('template', template.id, { shouldValidate: true })}
                                >
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 z-10 bg-background rounded-full">
                                            <CheckCircle2 className="h-6 w-6 text-primary" />
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            "rounded-lg border-2 transition-all duration-200 overflow-hidden",
                                            isSelected
                                                ? "border-primary/80 ring-2 ring-primary/50 bg-primary/10"
                                                : "border-border group-hover:border-primary/50"
                                        )}
                                    >
                                        <Image
                                            src={template.imageUrl}
                                            alt={template.name}
                                            width={200}
                                            height={282}
                                            className={cn("w-full h-auto object-cover transition-transform duration-300", isSelected ? "scale-95" : "group-hover:scale-105")}
                                            data-ai-hint={template.dataAiHint}
                                        />
                                    </div>
                                    <p className={cn(
                                    "text-sm text-center mt-2",
                                    isSelected ? "text-primary font-semibold" : "text-muted-foreground"
                                    )}>
                                    {template.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
            
            <DialogFooter className="md:col-span-2 mt-auto p-6 border-t border-border">
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
