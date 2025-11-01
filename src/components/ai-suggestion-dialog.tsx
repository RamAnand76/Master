
"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { enhanceDescriptionAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AiSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: 'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description` | null;
  currentValue: string;
};

export default function AiSuggestionDialog({ open, onOpenChange, fieldName, currentValue }: AiSuggestionDialogProps) {
  const [suggestion, setSuggestion] = useState<{ enhancedDescription: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setValue, getValues } = useFormContext<ResumeData>();
  const { toast } = useToast();
  
  const performAction = async () => {
    if (!fieldName) return;
    
    setIsLoading(true);
    setSuggestion(null);

    const { jobDescription } = getValues();
    try {
        const result = await enhanceDescriptionAction({ 
          descriptionToEnhance: currentValue, 
          jobDescription: jobDescription || ""
        });

        if (result && "enhancedDescription" in result) {
          if (result.enhancedDescription.includes("To provide a targeted rewrite")) {
            toast({
              variant: "destructive",
              title: "More Information Needed",
              description: "Please provide a job description and the content you'd like to enhance for a better AI suggestion.",
            });
            onOpenChange(false);
            return;
          }
          setSuggestion(result);
        } else {
          toast({ variant: "destructive", title: "Error", description: result?.error || "Could not enhance content." });
          onOpenChange(false);
        }
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
        onOpenChange(false);
    } finally {
        setIsLoading(false);
    }
  };


  useEffect(() => {
    if (open && fieldName) {
      performAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fieldName, currentValue]);

  const handleUseSuggestion = () => {
    if (fieldName && suggestion) {
      setValue(fieldName, suggestion.enhancedDescription, { shouldDirty: true, shouldValidate: true });
      toast({
        title: "Suggestion Applied",
        description: "The AI-enhanced content has been applied."
      })
    }
    onOpenChange(false);
  };
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none sm:max-w-4xl w-full h-full sm:h-[80vh] bg-card/80 backdrop-blur-2xl sm:rounded-2xl shadow-glow border border-accent/10 flex flex-col p-0">
        <DialogHeader className="p-6 flex-shrink-0 z-10 sr-only">
            <DialogTitle>AI-Powered Enhancement</DialogTitle>
            <DialogDescription>Your summary has been optimized for impact and clarity.</DialogDescription>
        </DialogHeader>
        
        <div className="p-6 flex-shrink-0 z-10">
           <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 shadow-inner-glow">
                        <span className="material-symbols-outlined text-accent text-3xl">auto_awesome</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">AI-Powered Enhancement</h1>
                        <p className="text-foreground/70 mt-1">Your content has been optimized for impact and clarity.</p>
                    </div>
                </div>
                <button onClick={() => onOpenChange(false)} className="text-foreground/60 hover:text-foreground transition-colors p-2 rounded-full hover:bg-white/10">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>

        {isLoading ? (
            <div className="flex-grow flex items-center justify-center">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6 flex-grow overflow-hidden z-10">
                <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-lg">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex-shrink-0 tracking-tight">Suggested Improvement</h2>
                    <div className="prose prose-invert prose-p:text-foreground/80 prose-li:text-foreground/80 overflow-y-auto h-full pr-4 custom-scrollbar">
                        <ul className="space-y-4">
                            {suggestion?.enhancedDescription.split('\n').filter(s => s.trim().length > 0).map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-accent mt-1">check_circle</span>
                                    <span>{line.replace(/^- /, '')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-lg">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex-shrink-0 tracking-tight">Explanation</h2>
                    <div className="text-foreground/80 space-y-4 overflow-y-auto h-full pr-4 custom-scrollbar">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 shadow-inner-glow transition-all hover:bg-primary/20 hover:border-primary/30">
                            <p className="font-semibold text-foreground">Impactful Language:</p>
                            <p className="text-sm text-foreground/70">The rewrite uses stronger action verbs and a more confident tone to highlight your skills and achievements effectively.</p>
                        </div>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 shadow-inner-glow transition-all hover:bg-primary/20 hover:border-primary/30">
                            <p className="font-semibold text-foreground">Clarity and Readability:</p>
                            <p className="text-sm text-foreground/70">The content is structured for easy scanning, making it more digestible for recruiters and hiring managers.</p>
                        </div>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 shadow-inner-glow transition-all hover:bg-primary/20 hover:border-primary/30">
                            <p className="font-semibold text-foreground">Professional Tone:</p>
                            <p className="text-sm text-foreground/70">This version elevates the language to be more business-oriented, demonstrating professionalism and value.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="mt-auto p-6 flex-shrink-0 flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-white/10 bg-card/80 backdrop-blur-sm z-10">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="px-6 py-2.5 rounded-lg font-semibold text-foreground/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
                Cancel
            </Button>
            <Button onClick={handleUseSuggestion} disabled={isLoading || !suggestion} className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-semibold text-black rounded-lg group bg-accent shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 w-full sm:w-auto">
                <span className="absolute w-full h-full bg-gradient-to-br from-white/20 to-transparent transition-all duration-500 ease-out group-hover:from-white/30"></span>
                <span className="relative">Use this suggestion</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    