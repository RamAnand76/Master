
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
<<<<<<< HEAD
import { LoaderCircle, Lightbulb, CheckCircle2 } from "lucide-react";
=======
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle, Lightbulb, CheckCircle } from "lucide-react";
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73
import type { AtsAnalysis } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from '../ui/button';

type AtsPanelProps = {
  analysis: AtsAnalysis | null;
  isAnalyzing: boolean;
  onKeywordClick: (keyword: string) => void;
};

<<<<<<< HEAD
const FormattedFeedback = ({ feedback }: { feedback: string }) => {
    const feedbackItems = feedback.split('\n').filter(item => item.trim().startsWith('-'));

    if (feedbackItems.length > 0) {
        return (
            <ul className="space-y-1.5 text-xs text-muted-foreground">
                {feedbackItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{item.replace('-', '').trim()}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return <p className="text-xs text-muted-foreground">{feedback}</p>;
};

export default function AtsPanel({ analysis, isAnalyzing, onKeywordClick }: AtsPanelProps) {
=======
const FormattedFeedback = ({ text }: { text: string }) => {
    const feedbackPoints = text.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.trim().substring(1).trim());

    if (feedbackPoints.length === 0) {
        return <p className="text-xs text-muted-foreground whitespace-pre-wrap">{text}</p>;
    }

    return (
        <ul className="space-y-1.5 mt-1">
            {feedbackPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-500/80 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{point}</span>
                </li>
            ))}
        </ul>
    );
};


export default function AtsPanel({ analysis, isAnalyzing, onKeywordClick, onDownloadPdf }: AtsPanelProps) {
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73
  const score = analysis?.score ?? 0;
  const feedback = analysis?.feedback ?? "This score estimates your resume's compatibility with ATS software.";
  
  return (
    <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
            <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
                {isAnalyzing ? (
                    <LoaderCircle className="h-10 w-10 text-primary animate-spin" />
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CircularProgress value={score} size={40} strokeWidth={4} />
                        </motion.div>
                    </AnimatePresence>
                )}
                <div className="flex-1">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={isAnalyzing ? 'analyzing' : 'feedback'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
<<<<<<< HEAD
                            <h3 className="font-semibold">ATS Score & Feedback</h3>
                            <div className="whitespace-pre-wrap">
                                {isAnalyzing ? <p className="text-xs text-muted-foreground">Analyzing your resume...</p> : analysis?.feedback ? <FormattedFeedback feedback={analysis.feedback} /> : <p className="text-xs text-muted-foreground">This score estimates your resume's compatibility with ATS software.</p>}
                            </div>
=======
                            <h3 className="font-semibold">Resume Analysis</h3>
                            {isAnalyzing ? (
                                <p className="text-xs text-muted-foreground">Analyzing your resume...</p>
                            ) : (
                                <FormattedFeedback text={feedback} />
                            )}
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
<<<<<<< HEAD
=======
            <Button onClick={onDownloadPdf} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73
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
