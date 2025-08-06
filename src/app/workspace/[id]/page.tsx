
"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ResumeData, resumeDataSchema } from '@/lib/types';
import ResumeForm from '@/components/resume-form';
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useUser } from '@/hooks/use-user';
import { Card } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/circular-progress';


function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
}

const loadingStates = [
  { text: 'Loading your resume...' },
  { text: 'Preparing your workspace...' },
  { text: 'Assembling the editor...' },
  { text: 'Finalizing the preview...' },
  { text: 'Almost there...' },
];

export default function WorkspacePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const { toast } = useToast();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [atsScore, setAtsScore] = useState(0);

  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeDataSchema),
    mode: 'onChange',
  });

  const resumeName = methods.watch('name');
  const resumeData = methods.watch();

  useEffect(() => {
    // Mock ATS score calculation
    const calculateAtsScore = (data: ResumeData) => {
        let score = 0;
        if (data.personalDetails?.name && data.personalDetails.name !== 'Your Name') score += 10;
        if (data.personalDetails?.email && data.personalDetails.email !== 'your.email@example.com') score += 10;
        if (data.summary && data.summary !== 'A brief professional summary about yourself.') score += 15;
        if (data.experience?.length > 0) score += 25;
        if (data.education?.length > 0) score += 15;
        if (data.skills?.length > 0) score += 15;
        if (data.projects?.length > 0) score += 10;
        return Math.min(score, 100);
    };
    setAtsScore(calculateAtsScore(resumeData));
  }, [resumeData]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('resuMasterProjects');
    if (savedProjects) {
       try {
        const projects: ResumeData[] = JSON.parse(savedProjects);
        const currentProject = projects.find(p => p.id === id);
        if (currentProject) {
          methods.reset(currentProject);
        }
      } catch (e) {
        console.error("Failed to parse projects from localStorage", e);
      }
    }
    // Simulate a longer loading time to see the loader
    const timer = setTimeout(() => {
        setIsLoaded(true);
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, [id, methods]);
  
  useEffect(() => {
    if (isUserLoaded && user.name) {
      methods.setValue('personalDetails.name', user.name, { shouldValidate: true });
    }
  }, [isUserLoaded, user.name, methods]);


  const saveData = useCallback((data: ResumeData) => {
    try {
      const savedProjects = localStorage.getItem('resuMasterProjects');
      let projects: ResumeData[] = savedProjects ? JSON.parse(savedProjects) : [];
      const projectIndex = projects.findIndex(p => p.id === id);
  
      if (projectIndex > -1) {
        projects[projectIndex] = data;
      } else {
        projects.push(data);
      }
      localStorage.setItem('resuMasterProjects', JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      toast({
        variant: "destructive",
        title: "Save Error",
        description: "Could not save your changes.",
      });
    }
  }, [id, toast]);

  const debouncedSave = useMemo(() => debounce(saveData, 1000), [saveData]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setIsSaving(true);
      setIsSaved(false);
      // @ts-ignore
      debouncedSave(value).then(() => {
        setIsSaving(false);
        setIsSaved(true);
      });
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, debouncedSave]);

  if (!isLoaded) {
    return (
        <MultiStepLoader loadingStates={loadingStates} loading={!isLoaded} duration={300} loop={false} />
    );
  }

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
             <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to Workspaces
                </Link>
             </Button>
            <div className="flex items-center gap-3">
              {isSaving ? (
                <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>
              ) : (
                <span className="text-xs text-muted-foreground">{isSaved ? 'All changes saved' : 'Unsaved changes'}</span>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-2xl mx-auto p-4 sm:p-6 pb-24">
          <div className="lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto pr-4 space-y-6">
             <h1 className="text-xl font-semibold text-center">{resumeName}</h1>
            <ResumeForm />
          </div>
          <div className="space-y-4">
              <Card className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <CircularProgress value={atsScore} size={40} strokeWidth={4} />
                      <div>
                          <h3 className="font-semibold">Real-Time ATS Score</h3>
                          <p className="text-xs text-muted-foreground">This score estimates your resume's compatibility with ATS software.</p>
                      </div>
                  </div>
                  <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                  </Button>
              </Card>
            <div className="lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto rounded-lg bg-background shadow-lg">
              <div className="origin-top scale-[.90] lg:scale-[.85] xl:scale-[.90]">
                <ResumePreview resumeData={methods.watch()} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
