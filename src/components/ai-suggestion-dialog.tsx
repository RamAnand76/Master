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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";

type AiSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: keyof Pick<ResumeData, 'summary'>;
  currentValue: string;
};

export default function AiSuggestionDialog({ open, onOpenChange, fieldName, currentValue }: AiSuggestionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ improvedContent: string; explanation: string } | null>(null);
  const { setValue } = useFormContext<ResumeData>();
  const { toast } = useToast();

  useEffect(() => {
    if (open && currentValue) {
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
    if (suggestion) {
      setValue(fieldName, suggestion.improvedContent, { shouldDirty: true, shouldValidate: true });
      onOpenChange(false);
    }
  };

  const toTitleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Suggestions for your {toTitleCase(fieldName)}</DialogTitle>
          <DialogDescription>
            Our AI has analyzed your text and provided suggestions for improvement.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Analyzing your resume...</p>
          </div>
        ) : suggestion ? (
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
          <Button onClick={handleUseSuggestion} disabled={isLoading || !suggestion} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Use this suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
