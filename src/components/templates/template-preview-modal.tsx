
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Template } from "@/lib/types";
import { dummyResumeData } from "@/lib/dummy-resume-data";
import ResumePreview from "../resume-preview";
import { Code } from "lucide-react";

type TemplatePreviewModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  template: Template | null;
  onUseTemplate: (id: string) => void;
};

export default function TemplatePreviewModal({ isOpen, onOpenChange, template, onUseTemplate }: TemplatePreviewModalProps) {
  if (!template) return null;

  const handleUseTemplate = () => {
    onUseTemplate(template.id);
    onOpenChange();
  };

  const previewData = {
    ...dummyResumeData,
    template: template.id
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Preview: {template.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white text-black shadow-2xl rounded-lg overflow-hidden">
                <div className="origin-top scale-[.80] sm:scale-100">
                     <ResumePreview resumeData={previewData} atsAnalysis={null} />
                </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-4 border-t bg-background">
          <DialogClose asChild>
             <Button variant="ghost">Close</Button>
          </DialogClose>
          <Button onClick={handleUseTemplate}>
            <Code className="mr-2 h-4 w-4"/> Use This Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
