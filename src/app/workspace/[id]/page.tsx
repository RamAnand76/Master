
"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ResumeData, resumeDataSchema, type AtsAnalysis } from '@/lib/types';
import ResumeForm from '@/components/resume-form';
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download, Save, Share2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { useUser } from '@/hooks/use-user';
import { analyzeResumeAction } from '@/lib/actions';
import AtsPanel from '@/components/workspace/ats-panel';
import KeywordSuggestionDialog from '@/components/workspace/keyword-suggestion-dialog';
import { generatePdf } from '@/lib/pdf-generator';
import JobDetailsCard from '@/components/workspace/job-details-card';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import MobileTabs, { type MobileTab } from '@/components/workspace/mobile-tabs';

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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [atsAnalysis, setAtsAnalysis] = useState<AtsAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('editor');

  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeDataSchema),
    mode: 'onChange',
    defaultValues: resumeDataSchema.parse({ id: '' }),
  });

  const resumeName = methods.watch('name');
  const resumeData = methods.watch();

  const handleDownloadPdf = async () => {
    toast({
      title: 'Generating PDF...',
      description: 'Your resume is being prepared for download.',
    });
    try {
      generatePdf(resumeData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: 'destructive',
        title: 'PDF Generation Failed',
        description: 'An unexpected error occurred while creating the PDF.',
      });
    }
  };

  const performAtsAnalysis = useCallback(async (data: ResumeData) => {
    if (!data.jobDescription) {
      setAtsAnalysis({ score: 0, feedback: "Add a job description for an ATS analysis.", missingKeywords: [], matchingKeywords: [] });
      return;
    }
    setIsAnalyzing(true);
    try {
        const result = await analyzeResumeAction({
            resumeSummary: data.summary,
            resumeExperience: data.experience,
            resumeSkills: data.skills,
            jobDescription: data.jobDescription,
        });
        if (result && "score" in result) {
            setAtsAnalysis(result);
        } else {
             toast({ variant: 'destructive', title: 'Error', description: result.error || 'Failed to analyze resume.' });
        }
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred during analysis.' });
    } finally {
        setIsAnalyzing(false);
    }
  }, [toast]);
  
  const debouncedAtsAnalysis = useMemo(() => debounce(performAtsAnalysis, 2000), [performAtsAnalysis]);


  useEffect(() => {
    const savedProjects = localStorage.getItem('resuMasterProjects');
    if (savedProjects) {
       try {
        const projects: ResumeData[] = JSON.parse(savedProjects);
        const currentProject = projects.find(p => p.id === id);
        if (currentProject) {
          methods.reset(currentProject);
          setLastSaved(new Date()); // Assume it was just saved when loaded
          if (currentProject.jobDescription) {
            performAtsAnalysis(currentProject);
          } else {
            setAtsAnalysis({ score: 0, feedback: "Add a job description for an ATS analysis.", missingKeywords: [], matchingKeywords: [] });
          }
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
  }, [id, methods, performAtsAnalysis]);
  
  useEffect(() => {
    if (isUserLoaded && user.name) {
      const currentName = methods.getValues('personalDetails.name');
      if (!currentName || currentName === 'Your Name') {
        methods.setValue('personalDetails.name', user.name, { shouldValidate: true, shouldDirty: true });
      }
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
      return data;
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      toast({
        variant: "destructive",
        title: "Save Error",
        description: "Could not save your changes.",
      });
      return null;
    }
  }, [id, toast]);

  const debouncedSave = useMemo(() => debounce(saveData, 1000), [saveData]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setIsSaving(true);
      // @ts-ignore
      debouncedSave(value).then((savedValue) => {
        setIsSaving(false);
        setLastSaved(new Date());
        if(savedValue) {
            // @ts-ignore
            debouncedAtsAnalysis(savedValue);
        }
      });
    });
    return () => subscription.unsubscribe();
  }, [methods, debouncedSave, debouncedAtsAnalysis]);
  
  const getSaveStatus = () => {
      if (isSaving) {
          return { text: "Saving...", iconColor: "text-primary", isPulsing: true };
      }
      if (lastSaved) {
        const timeAgo = formatDistanceToNow(lastSaved, { addSuffix: true });
        if (timeAgo === 'less than a minute ago') {
             return { text: "Saved just now", iconColor: "text-green-400" };
        }
        return { 
            text: `Last saved at ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 
            iconColor: "text-green-400" 
        };
      }
      return { text: "Unsaved changes", iconColor: "text-yellow-400" };
  }

  const saveStatus = getSaveStatus();

  if (!isLoaded) {
    return (
        <MultiStepLoader loadingStates={loadingStates} loading={!isLoaded} duration={300} loop={false} />
    );
  }

  const editorPanel = (
    <div className="overflow-y-auto pr-4 space-y-4 h-full pb-32">
        <div className="w-full space-y-4">
            <JobDetailsCard />
            <ResumeForm />
        </div>
    </div>
  );

  const previewPanel = (
    <div className="space-y-4 overflow-y-auto h-full pb-32">
        <AtsPanel 
            analysis={atsAnalysis} 
            isAnalyzing={isAnalyzing}
            onKeywordClick={(keyword) => setSelectedKeyword(keyword)}
        />
        <div className="rounded-lg bg-card shadow-lg p-2">
            <div 
              ref={resumePreviewRef} 
              className="aspect-[8.5/11] w-full overflow-y-auto bg-white rounded-sm"
            >
                <div className="origin-top scale-[.6] sm:scale-75 md:scale-[.8] lg:scale-[.75] xl:scale-[.85]">
                     <ResumePreview resumeData={methods.watch()} atsAnalysis={atsAnalysis} />
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <FormProvider {...methods}>
       <div className="h-screen bg-secondary flex flex-col">
        <header className="bg-card/60 backdrop-blur-lg sticky top-0 z-20 border-b border-border/30 shadow-sm">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full group hover:bg-primary/10 transition-colors duration-300">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 transform transition-transform duration-300 group-hover:text-primary"/>
                    </Link>
                </Button>
                <div className="h-6 w-px bg-border/50"></div>
                <div>
                    <h1 className="font-semibold text-lg tracking-tight text-foreground/90">{resumeName}</h1>
                </div>
             </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <Save className={`h-3.5 w-3.5 ${saveStatus.iconColor} ${saveStatus.isPulsing ? 'animate-pulse' : ''}`} />
                {saveStatus.text}
              </div>
              <TooltipProvider>
                <div className="flex items-center gap-2 p-1 bg-background/50 border border-border/20 rounded-lg">
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Sparkles />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>AI Actions</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Share2 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                             <Button onClick={handleDownloadPdf} variant="ghost" size="icon" className="h-7 w-7">
                                <Download />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download PDF</TooltipContent>
                    </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </header>

         <main className="flex-1 overflow-hidden">
             {/* Desktop View */}
             <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-2xl mx-auto p-4 sm:p-6 h-full">
                {editorPanel}
                {previewPanel}
            </div>
            
            {/* Mobile View */}
            <div className="lg:hidden h-full p-4 sm:p-6">
                {activeMobileTab === 'editor' && editorPanel}
                {activeMobileTab === 'preview' && previewPanel}
            </div>
         </main>

         <MobileTabs 
            activeTab={activeMobileTab} 
            setActiveTab={setActiveMobileTab} 
         />
      </div>
      <KeywordSuggestionDialog 
        open={!!selectedKeyword}
        onOpenChange={(isOpen) => !isOpen && setSelectedKeyword(null)}
        keyword={selectedKeyword}
        resume={resumeData}
      />
    </FormProvider>
  );
}
