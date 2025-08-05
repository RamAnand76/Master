
"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ResumeData, resumeDataSchema } from '@/lib/types';
import ResumeForm from '@/components/resume-form';
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';


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

export default function WorkspacePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const { toast } = useToast();

  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeDataSchema),
    mode: 'onChange',
  });

  const resumeName = methods.watch('name');

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
    setIsLoaded(true);
  }, [id, methods]);
  
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
        <div className="flex h-screen w-full items-center justify-center p-8 bg-secondary">
            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div><Skeleton className="h-[80vh] w-full rounded-lg bg-background" /></div>
                <div><Skeleton className="h-[80vh] w-full rounded-lg bg-background" /></div>
            </div>
        </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-secondary">
        <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
             <Button asChild variant="ghost" className="text-primary-foreground hover:bg-secondary">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to Workspaces
                </Link>
             </Button>
            <div className="flex items-center gap-4">
              {isSaving ? (
                <span className="text-sm text-muted-foreground animate-pulse">Saving...</span>
              ) : (
                <span className="text-sm text-muted-foreground">{isSaved ? 'All changes saved' : 'Unsaved changes'}</span>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl mx-auto p-4 sm:p-8">
          <div className="lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto pr-4 space-y-8">
             <h1 className="text-2xl font-semibold text-center">{resumeName}</h1>
            <ResumeForm />
          </div>
          <div className="lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto">
            <div className="bg-background shadow-lg rounded-lg sticky top-[70px]">
              <ResumePreview resumeData={methods.watch()} />
            </div>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
