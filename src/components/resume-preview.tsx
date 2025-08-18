
import type { ResumeData, AtsAnalysis } from '@/lib/types';
import React from 'react';
import ClassicTemplate from './templates/previews/professional/classic';
import ModernTemplate from './templates/previews/modern/modern';
import CreativeTemplate from './templates/previews/creative/creative';

const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
};

export default function ResumePreview({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    
    const TemplateComponent = templates[resumeData.template as keyof typeof templates] || ClassicTemplate;

    return (
        <div className="min-h-[calc(100vh-112px)]">
            <TemplateComponent resumeData={resumeData} atsAnalysis={atsAnalysis} />
        </div>
    );
}
