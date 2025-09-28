
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
import { LoaderCircle } from "lucide-react";

type AiSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: 'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description` | null;
  currentValue: string;
  setIsLoading: (isLoading: boolean) => void;
};

export default function AiSuggestionDialog({ open, onOpenChange, fieldName, currentValue, setIsLoading }: AiSuggestionDialogProps) {
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const { setValue, getValues } = useFormContext<ResumeData>();
  const { toast } = useToast();
  const { jobDescription } = getValues();

  useEffect(() => {
    if (open && fieldName) {
      setIsLoading(true);
      setEnhancedContent(null);
      
      const performAction = async () => {
        try {
            const result = await enhanceDescriptionAction({ 
              descriptionToEnhance: currentValue, 
              jobDescription: jobDescription || "a professional job" 
            });
            if (result && "enhancedDescription" in result) {
              setEnhancedContent(result.enhancedDescription);
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
      
      performAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fieldName, currentValue, jobDescription, onOpenChange, toast]);

  const handleUseSuggestion = () => {
    if (fieldName && enhancedContent) {
      setValue(fieldName, enhancedContent, { shouldDirty: true, shouldValidate: true });
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
    
  const displayExplanation = `This suggestion has been rewritten to be more impactful and professional.${jobDescription ? " It is also tailored to the job description you provided." : ""}`;
  const dialogTitle = `Enhanced Suggestion for your ${toTitleCase(fieldName)}`;
  const dialogDescription = "The AI has rewritten your text to be more impactful.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {!enhancedContent ? (
          <div className="flex justify-center items-center h-48">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] overflow-y-auto p-1">
            <div>
              <h4 className="font-semibold mb-2">Suggested Improvement</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap h-full">
                {enhancedContent}
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
          <Button onClick={handleUseSuggestion} disabled={!enhancedContent} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Use this suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
