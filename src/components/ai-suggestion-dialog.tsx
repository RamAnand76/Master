
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
import { LoaderCircle } from "lucide-react";

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
      
      const performAction = async () => {
        try {
          if (isEnhanceMode) {
            const result = await enhanceDescriptionAction({ descriptionToEnhance: currentValue, jobDescription });
            if (result && "enhancedDescription" in result) {
              setEnhancedContent(result.enhancedDescription);
            } else {
              toast({ variant: "destructive", title: "Error", description: result?.error || "Could not enhance content." });
              onOpenChange(false);
            }
          } else { // Fallback to general suggestions
            const result = await getAiSuggestions(currentValue);
            if (!result || "error" in result) {
              toast({ variant: "destructive", title: "Error", description: result?.error || "An unknown error occurred." });
              onOpenChange(false);
            } else {
              setSuggestion(result);
            }
          }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
            onOpenChange(false);
        } finally {
            setIsLoading(false);
        }
      };
      
      performAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fieldName, currentValue, jobDescription, isEnhanceMode, onOpenChange, toast]);

  const handleUseSuggestion = () => {
    if (fieldName) {
      const contentToApply = isEnhanceMode ? enhancedContent : suggestion?.improvedContent;
      if (contentToApply) {
        setValue(fieldName, contentToApply, { shouldDirty: true, shouldValidate: true });
      }
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
  
  const displayContent = isEnhanceMode 
    ? enhancedContent
    : suggestion?.improvedContent;
    
  const displayExplanation = isEnhanceMode
    ? "This suggestion has been rewritten to better align with the job description, using relevant keywords and quantifiable achievements to improve its ATS score."
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
        {!displayContent ? (
          <div className="flex justify-center items-center h-48">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
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
        )}
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
