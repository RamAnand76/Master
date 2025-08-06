
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
import { getAiSuggestions } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";
import { MultiStepLoader } from "./ui/multi-step-loader";

type AiSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: keyof Pick<ResumeData, 'summary'> | null;
  currentValue: string;
};

const loadingStates = [
  { text: 'Analyzing your resume content...' },
  { text: 'Identifying key skills and experiences...' },
  { text: 'Checking for ATS optimization...' },
  { text: 'Crafting impactful bullet points...' },
  { text: 'Finalizing suggestions...' },
];

export default function AiSuggestionDialog({ open, onOpenChange, fieldName, currentValue }: AiSuggestionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ improvedContent: string; explanation: string } | null>(null);
  const { setValue } = useFormContext<ResumeData>();
  const { toast } = useToast();

  useEffect(() => {
    if (open && currentValue && fieldName) {
      setIsLoading(true);
      setSuggestion(null);
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
  }, [open, currentValue, fieldName, toast, onOpenChange]);

  const handleUseSuggestion = () => {
    if (suggestion && fieldName) {
      setValue(fieldName, suggestion.improvedContent, { shouldDirty: true, shouldValidate: true });
      onOpenChange(false);
    }
  };

  const toTitleCase = (str: string | null) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // When loading, show the loader. The loader itself is a modal.
  if (isLoading) {
    return <MultiStepLoader loadingStates={loadingStates} loading={true} duration={1500} />;
  }

  return (
    <Dialog open={open && !isLoading} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Suggestions for your {toTitleCase(fieldName)}</DialogTitle>
          <DialogDescription>
            Our AI has analyzed your text and provided suggestions for improvement.
          </DialogDescription>
        </DialogHeader>
        {suggestion ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] overflow-y-auto p-1">
            <div>
              <h4 className="font-semibold mb-2">Suggested Improvement</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap h-full">
                {suggestion.improvedContent}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Explanation</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap h-full">
                {suggestion.explanation}
              </div>
            </div>
          </div>
        ) : null}
        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUseSuggestion} disabled={!suggestion} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Use this suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
