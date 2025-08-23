import type { ResumeData, AtsAnalysis } from '@/lib/types';
import React from 'react';
<<<<<<< HEAD
import ClassicTemplate from './templates/previews/classic';
import ModernTemplate from './templates/previews/modern';
import CreativeTemplate from './templates/previews/creative';
import ElegantTemplate from './templates/previews/elegant';
=======
import ClassicTemplate from './templates/previews/professional/classic';
import ModernTemplate from './templates/previews/modern/modern';
import CreativeTemplate from './templates/previews/creative/creative';
>>>>>>> 1395b611130e3487acf2df7701c696a74f881e73

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
