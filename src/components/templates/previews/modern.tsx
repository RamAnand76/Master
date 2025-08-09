
"use client";

import type { ResumeData, AtsAnalysis } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github, MapPin } from 'lucide-react';
import React from 'react';

const HighlightedText = ({ text, keywords }: { text: string; keywords: string[] }) => {
    if (!keywords || keywords.length === 0 || !text) return <>{text}</>;
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    return (
        <>
            {text.split(regex).map((part, i) =>
                keywords.some(kw => new RegExp(`^${kw}$`, 'i').test(part)) ? (
                    <span key={i} className="bg-green-500/20 rounded px-1">{part}</span>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
};

export default function ModernTemplate({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    const { personalDetails, summary, experience, education, projects, skills } = resumeData;
    const matchingKeywords = atsAnalysis?.matchingKeywords ?? [];

    return (
        <div className="p-4 text-xs text-foreground bg-background font-body flex gap-4">
            {/* Left Column */}
            <aside className="w-1/3 bg-secondary/30 p-4 rounded-lg">
                {personalDetails?.name && <h1 className="text-2xl font-bold tracking-tight mb-2">{personalDetails.name}</h1>}
                <div className="space-y-2 text-muted-foreground text-xs">
                    {personalDetails?.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-2 hover:text-primary"><Mail size={12} className="flex-shrink-0" /><span>{personalDetails.email}</span></a>}
                    {personalDetails?.phone && <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone size={12} className="flex-shrink-0" /><span>{personalDetails.phone}</span></a>}
                    {personalDetails?.location && <p className="flex items-center gap-2"><MapPin size={12} className="flex-shrink-0" /><span>{personalDetails.location}</span></p>}
                    {personalDetails?.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe size={12} className="flex-shrink-0" /><span>Portfolio</span></a>}
                    {personalDetails?.linkedin && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin size={12} className="flex-shrink-0" /><span>LinkedIn</span></a>}
                    {personalDetails?.github && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Github size={12} className="flex-shrink-0" /><span>GitHub</span></a>}
                </div>
                <hr className="my-4 border-border" />
                {skills && skills.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">Skills</h2>
                        <ul className="space-y-1">
                            {skills.filter(s => s.name).map(skill => (
                                <li key={skill.id} className="text-muted-foreground">
                                    <HighlightedText text={skill.name} keywords={matchingKeywords} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {education && education.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 last:mb-0">
                                <h3 className="font-semibold text-sm">{edu.degree}</h3>
                                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                                <p className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* Right Column */}
            <main className="w-2/3 space-y-4">
                {summary && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">Summary</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap text-xs leading-relaxed">
                            <HighlightedText text={summary} keywords={matchingKeywords} />
                        </p>
                    </section>
                )}
                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">Experience</h2>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-3 last:mb-0">
                                <h3 className="font-semibold text-sm">{exp.role}</h3>
                                <div className="flex justify-between items-baseline">
                                    <p className="text-xs italic text-muted-foreground">{exp.company}</p>
                                    <span className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="mt-1.5 text-muted-foreground list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                    <HighlightedText text={exp.description} keywords={matchingKeywords} />
                                </div>
                            </div>
                        ))}
                    </section>
                )}
                 {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">Projects</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-3 last:mb-0">
                               <div className="flex items-baseline gap-2">
                                 <h3 className="font-semibold text-sm">{proj.name}</h3>
                                 {proj.url && proj.url.startsWith('http') && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-primary/80 text-xs hover:underline">(Link)</a>}
                               </div>
                                <div className="mt-1 text-muted-foreground list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                   <HighlightedText text={proj.description} keywords={matchingKeywords} />
                               </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}
