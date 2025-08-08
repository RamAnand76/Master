
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getKeywordSuggestionAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";
import { LoaderCircle } from "lucide-react";

type KeywordSuggestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyword: string | null;
  resume: ResumeData;
};

export default function KeywordSuggestionDialog({ open, onOpenChange, keyword, resume }: KeywordSuggestionDialogProps) {
  const [suggestion, setSuggestion] = useState<{ suggestion: string; example: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && keyword) {
      setIsLoading(true);
      setSuggestion(null);
      
      getKeywordSuggestionAction({ keyword, resume })
        .then((result) => {
            if (result && "suggestion" in result) {
                setSuggestion(result);
            } else {
                toast({ variant: "destructive", title: "Error", description: result?.error || "Could not generate suggestion." });
                onOpenChange(false);
            }
        })
        .finally(() => setIsLoading(false));
    }
  }, [open, keyword, resume, toast, onOpenChange]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Suggestion for "{keyword}"</DialogTitle>
          <DialogDescription>
            Here's how you could naturally integrate this keyword into your resume.
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
            <div className="flex items-center justify-center p-12">
                <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
            </div>
        )}
        {suggestion && !isLoading && (
          <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto p-1">
            <div>
              <h4 className="font-semibold mb-2">Suggestion</h4>
              <div className="bg-secondary p-4 rounded-md text-sm">
                {suggestion.suggestion}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Example</h4>
              <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap font-mono">
                {suggestion.example}
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
