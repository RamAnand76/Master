
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
import { getAiSuggestions, generateTailoredResumeAction, enhanceDescriptionAction } from "@/lib/actions";
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
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const { setValue, getValues } = useFormContext<ResumeData>();
  const { toast } = useToast();
  const { jobDescription } = getValues();

  const isEnhanceMode = !!(jobDescription && fieldName && (fieldName.startsWith('experience.') || fieldName.startsWith('projects.')));

  useEffect(() => {
    if (open && fieldName) {
      setIsLoading(true);
      setSuggestion(null);
      setEnhancedContent(null);
      
      if (isEnhanceMode) {
        enhanceDescriptionAction({ descriptionToEnhance: currentValue, jobDescription })
          .then((result) => {
            if (result && "enhancedDescription" in result) {
              setEnhancedContent(result.enhancedDescription);
            } else {
              toast({ variant: "destructive", title: "Error", description: result?.error || "Could not enhance content." });
              onOpenChange(false);
            }
          })
          .finally(() => setIsLoading(false));

      } else { // Fallback to general suggestions if not in enhance mode
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
  }, [open, currentValue, fieldName, toast, onOpenChange, isEnhanceMode, jobDescription, setIsLoading]);

  const handleUseSuggestion = () => {
    if (isEnhanceMode && enhancedContent && fieldName) {
        setValue(fieldName, enhancedContent, { shouldDirty: true, shouldValidate: true });
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
  
  const displayContent = isEnhanceMode 
    ? enhancedContent
    : suggestion?.improvedContent;
    
  const displayExplanation = isEnhanceMode
    ? `This has been rewritten to better align with the job description, using keywords and quantifiable achievements to improve its ATS score.`
    : suggestion?.explanation;

  const dialogTitle = isEnhanceMode ? `Enhanced Suggestion for your ${toTitleCase(fieldName)}` : `AI Suggestions for your ${toTitleCase(fieldName)}`;
  const dialogDescription = isEnhanceMode ? "The AI has rewritten your text to be more impactful and ATS-friendly." : "Our AI has analyzed your text and provided suggestions for improvement.";


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
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
