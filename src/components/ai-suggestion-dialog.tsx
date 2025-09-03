
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
import { getAiSuggestions, generateTailoredResumeAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";

type AiSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: 'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description` | null;
  currentValue: string;
  setIsLoading: (isLoading: boolean) => void;
};

export default function AiSuggestionDialog({ open, onOpenChange, fieldName, currentValue, setIsLoading }: AiSuggestionDialogProps) {
  const [suggestion, setSuggestion] = useState<{ improvedContent: string; explanation: string } | null>(null);
  const [tailoredContent, setTailoredContent] = useState<{ summary: string; experienceDescription: string} | null>(null);
  const { setValue, getValues } = useFormContext<ResumeData>();
  const { toast } = useToast();
  const { jobDescription, jobPosition, company } = getValues();

  const isTailoredMode = !!(jobDescription && jobPosition && company && (fieldName === 'summary' || (fieldName?.startsWith('experience.') && fieldName.endsWith('.description'))));
  const isTailoredExperience = isTailoredMode && fieldName?.startsWith('experience.');

  useEffect(() => {
    if (open && fieldName) {
      setIsLoading(true);
      setSuggestion(null);
      setTailoredContent(null);
      
      if (isTailoredMode) {
        generateTailoredResumeAction({ jobDescription, jobPosition, company })
            .then((result) => {
                if (result && "summary" in result) {
                    setTailoredContent(result);
                } else {
                    toast({ variant: "destructive", title: "Error", description: result?.error || "Could not generate tailored suggestions." });
                    onOpenChange(false);
                }
            })
            .finally(() => setIsLoading(false));
      } else {
        getAiSuggestions(currentValue)
          .then((result) => {
            if (!result || "error" in result) {
              toast({ variant: "destructive", title: "Error", description: result?.error || "An unknown error occurred." });
              onOpenChange(false);
            } else {
              setSuggestion(result);
            }
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [open, currentValue, fieldName, toast, onOpenChange, isTailoredMode, jobDescription, jobPosition, company, setIsLoading]);

  const handleUseSuggestion = () => {
    if (isTailoredMode && tailoredContent && fieldName) {
        if (fieldName === 'summary') {
            setValue(fieldName, tailoredContent.summary, { shouldDirty: true, shouldValidate: true });
        } else if (isTailoredExperience) {
             setValue(fieldName, tailoredContent.experienceDescription, { shouldDirty: true, shouldValidate: true });
        }
    } else if (suggestion && fieldName) {
      setValue(fieldName, suggestion.improvedContent, { shouldDirty: true, shouldValidate: true });
    }
    onOpenChange(false);
  };

  const toTitleCase = (str: string | null) => {
    if (!str) return '';
    if(str.includes('.')) {
        const [field, index, subField] = str.split('.');
        return `${toTitleCase(field)} - ${toTitleCase(subField)}`;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const displayContent = isTailoredMode 
    ? (fieldName === 'summary' ? tailoredContent?.summary : tailoredContent?.experienceDescription)
    : suggestion?.improvedContent;
    
  const displayExplanation = isTailoredMode
    ? `This has been tailored for the ${jobPosition} role at ${company}.`
    : suggestion?.explanation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Suggestions for your {toTitleCase(fieldName)}</DialogTitle>
          <DialogDescription>
            Our AI has analyzed your text and provided suggestions for improvement.
          </DialogDescription>
        </DialogHeader>
        {displayContent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] overflow-y-auto p-1">
            <div>
              <h4 className="font-semibold mb-2">Suggested Improvement</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap h-full">
                {displayContent}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Explanation</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap h-full">
                {displayExplanation}
              </div>
            </div>
          </div>
        ) : null}
        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUseSuggestion} disabled={!displayContent} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Use this suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
