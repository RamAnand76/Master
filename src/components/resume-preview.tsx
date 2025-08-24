import type { ResumeData, AtsAnalysis } from '@/lib/types';
import React from 'react';
import ClassicTemplate from './templates/previews/professional/classic';
import ModernTemplate from './templates/previews/modern/modern';
import CreativeTemplate from './templates/previews/creative/creative';
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
        <div className="bg-white">
            <TemplateComponent resumeData={resumeData} atsAnalysis={atsAnalysis} />
        </div>
    );
}