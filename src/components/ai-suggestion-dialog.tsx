
"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { enhanceDescriptionAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";
import { LoaderCircle, Sparkles, X } from "lucide-react";

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
    }
    onOpenChange(false);
  };
  
  const toTitleCase = (str: string | null) => {
    if (!str) return '';
    if (str.includes('.')) {
      const parts = str.split('.');
      const field = parts[0];
      const subField = parts[2];
      return `${field.charAt(0).toUpperCase() + field.slice(1)} - ${subField.charAt(0).toUpperCase() + subField.slice(1)}`;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
    
  const { jobDescription } = getValues();
  const displayExplanation = `This suggestion has been rewritten to be more impactful and professional.${jobDescription ? " It is also tailored to the job description you provided." : ""}`;
  const keyImprovements = "The key improvements include using stronger action verbs, quantifying achievements where possible, and structuring the points for better readability. The tone is now more confident and business-oriented, which is ideal for a professional summary. This version highlights not just the tasks performed but also the value and skills demonstrated.";
  const dialogTitle = `Enhanced Suggestion for your ${toTitleCase(fieldName)}`;
  const dialogDescription = "The AI has rewritten your text to be more impactful.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] bg-card rounded-xl shadow-glow border border-accent/20 flex flex-col p-0">
        <div className="p-6 flex-shrink-0">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                        <Sparkles className="text-accent h-6 w-6" />
                    </div>
                    <div>
                        <DialogTitle className="text-xl font-bold text-foreground">{dialogTitle}</DialogTitle>
                        <DialogDescription className="text-foreground/60 mt-1 text-sm">{dialogDescription}</DialogDescription>
                    </div>
                </div>
                <button onClick={() => onOpenChange(false)} className="text-foreground/60 hover:text-foreground transition-colors">
                    <X />
                </button>
            </div>
        </div>

        {isLoading ? (
            <div className="flex-grow flex items-center justify-center">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6 flex-grow overflow-y-auto">
                <div className="bg-background/50 p-6 rounded-lg border border-white/10 flex flex-col">
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex-shrink-0">Suggested Improvement</h2>
                    <div className="prose prose-invert prose-p:text-foreground/80 prose-li:text-foreground/80 overflow-y-auto h-full pr-2 text-sm whitespace-pre-wrap">
                        {suggestion?.enhancedDescription}
                    </div>
                </div>
                <div className="bg-background/50 p-6 rounded-lg border border-white/10 flex flex-col">
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex-shrink-0">Explanation</h2>
                    <div className="text-foreground/80 space-y-4 overflow-y-auto h-full pr-2 text-sm">
                        <p>{displayExplanation}</p>
                        <p>{keyImprovements}</p>
                    </div>
                </div>
            </div>
        )}

        <div className="mt-auto p-6 flex-shrink-0 flex justify-end items-center gap-4 border-t border-white/10">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 py-2 rounded-lg font-semibold text-foreground/80 bg-transparent border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                Cancel
            </Button>
            <Button onClick={handleUseSuggestion} disabled={isLoading || !suggestion} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-black rounded-lg group bg-accent">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-primary"></span>
                <span className="relative">Use this suggestion</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
