
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/components/resume-preview";
import { type ResumeData, resumeDataSchema } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { Code, Eye } from "lucide-react";

type TemplatePreviewDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: { id: string; name: string } | null;
  onUseTemplate: () => void;
};

// Create a placeholder resume data object.
// This is used to render the template preview with some dummy data.
const placeholderResumeData: ResumeData = resumeDataSchema.parse({
    id: 'placeholder',
    name: 'Placeholder Resume',
    summary: 'This is a sample summary to demonstrate the template layout. It highlights key skills and experiences in a concise manner.',
    personalDetails: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        location: 'New York, USA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
    },
    experience: [
        {
            id: 'exp1',
            role: 'Software Engineer',
            company: 'Tech Solutions Inc.',
            startDate: 'Jan 2022',
            endDate: 'Present',
            description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.'
        }
    ],
    education: [
        {
            id: 'edu1',
            institution: 'State University',
            degree: 'B.S. in Computer Science',
            startDate: '2018',
            endDate: '2022',
            description: '- Graduated with honors.'
        }
    ],
    skills: [
        { id: 'skill1', name: 'React' },
        { id: 'skill2', name: 'Node.js' },
        { id: 'skill3', name: 'TypeScript' },
    ],
    projects: [
        {
            id: 'proj1',
            name: 'Personal Portfolio',
            url: 'https://johndoe.dev',
            description: '- Designed and built a personal portfolio website to showcase projects and skills.'
        }
    ]
});

export default function TemplatePreviewDialog({
  isOpen,
  onOpenChange,
  template,
  onUseTemplate
}: TemplatePreviewDialogProps) {
  if (!template) {
    return null;
  }

  const resumeDataForPreview = {
      ...placeholderResumeData,
      template: template.id
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Template Preview: {template.name}</DialogTitle>
          <DialogDescription>
            This is a preview of how your resume will look with the{" "}
            <strong>{template.name}</strong> template.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 border-y-2 border-border my-2">
            <ScrollArea className="h-full">
                 <div className="origin-top scale-[.70]">
                    <ResumePreview resumeData={resumeDataForPreview} atsAnalysis={null} />
                </div>
            </ScrollArea>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onUseTemplate}>
            <Code className="mr-2 h-4 w-4" /> Use this Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
