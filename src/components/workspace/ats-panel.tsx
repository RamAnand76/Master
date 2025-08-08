
"use client";

import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle } from "lucide-react";
import type { AtsAnalysis } from "@/lib/types";

type AtsPanelProps = {
  analysis: AtsAnalysis | null;
  isAnalyzing: boolean;
};

export default function AtsPanel({ analysis, isAnalyzing }: AtsPanelProps) {
  const score = analysis?.score ?? 0;
  
  return (
     <Card className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
            {isAnalyzing ? (
                <LoaderCircle className="h-10 w-10 text-primary animate-spin" />
            ) : (
                <CircularProgress value={score} size={40} strokeWidth={4} />
            )}
            <div className="flex-1">
                <h3 className="font-semibold">Real-Time ATS Score</h3>
                <p className="text-xs text-muted-foreground">
                    {isAnalyzing ? "Analyzing your resume..." : (analysis?.feedback ?? "This score estimates your resume's compatibility with ATS software.")}
                </p>
            </div>
        </div>
        <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
        </Button>
    </Card>
  )
}
