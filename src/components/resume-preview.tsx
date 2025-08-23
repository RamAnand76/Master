import type { ResumeData, AtsAnalysis } from '@/lib/types';
import React from 'react';
import ClassicTemplate from './templates/previews/classic';
import ModernTemplate from './templates/previews/modern';
import CreativeTemplate from './templates/previews/creative';
import ElegantTemplate from './templates/previews/elegant';

const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
    elegant: ElegantTemplate,
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
