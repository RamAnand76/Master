
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle, Lightbulb } from "lucide-react";
import type { AtsAnalysis } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";

type AtsPanelProps = {
  analysis: AtsAnalysis | null;
  isAnalyzing: boolean;
  onKeywordClick: (keyword: string) => void;
};

export default function AtsPanel({ analysis, isAnalyzing, onKeywordClick }: AtsPanelProps) {
  const score = analysis?.score ?? 0;
  
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
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
        </CardHeader>
        {analysis && (analysis.missingKeywords.length > 0 || analysis.matchingKeywords.length > 0) && (
            <CardContent className="p-4 pt-0">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="missing-keywords">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                Missing Keywords
                                <Badge variant="destructive">{analysis.missingKeywords.length}</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <p className="text-xs text-muted-foreground mb-2">Click a keyword to get AI suggestions on how to include it.</p>
                           <div className="flex flex-wrap gap-2">
                               {analysis.missingKeywords.map(keyword => (
                                   <Button key={keyword} variant="outline" size="sm" className="h-7 text-xs" onClick={() => onKeywordClick(keyword)}>
                                       <Lightbulb className="mr-1.5 h-3 w-3 text-yellow-400" />
                                       {keyword}
                                   </Button>
                               ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="matching-keywords" className="border-b-0">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                Matching Keywords
                                <Badge variant="secondary" className="bg-green-500/20 text-green-300">{analysis.matchingKeywords.length}</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-wrap gap-2">
                               {analysis.matchingKeywords.map(keyword => (
                                   <Badge key={keyword} variant="secondary">{keyword}</Badge>
                               ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        )}
     </Card>
  )
}
