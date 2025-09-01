
"use client";

import type { ResumeData, AtsAnalysis } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';
import React from 'react';

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const HighlightedText = ({ text, keywords }: { text: string; keywords: string[] }) => {
    if (!keywords || keywords.length === 0 || !text) {
        return <>{text}</>;
    }
    const escapedKeywords = keywords.map(kw => escapeRegExp(kw));
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <>
            {parts.map((part, i) =>
                keywords.some(kw => new RegExp(`^${escapeRegExp(kw)}$`, 'i').test(part)) ? (
                    <span key={i} className="bg-green-500/20 rounded px-1">
                        {part}
                    </span>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4">
        <h2 className="text-xs font-semibold text-[#408080]/80 border-b-2 border-[#408080]/20 pb-1 mb-2 uppercase tracking-widest">{title}</h2>
        {children}
    </div>
);


export default function ClassicTemplate({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    const { personalDetails, summary, experience, education, projects, skills } = resumeData;
    const matchingKeywords = atsAnalysis?.matchingKeywords ?? [];

    return (
        <div className="p-6 text-xs text-gray-800 bg-white font-body">
            <header className="text-center mb-6">
                {personalDetails?.name && <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalDetails.name}</h1>}
                <div className="flex justify-center items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500 flex-wrap">
                    {personalDetails?.location && <span>{personalDetails.location}</span>}
                    {personalDetails?.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1 hover:text-[#408080] hover:underline"><Mail size={11} />{personalDetails.email}</a>}
                    {personalDetails?.phone && <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-1 hover:text-[#408080] hover:underline"><Phone size={11} />{personalDetails.phone}</a>}
                    {personalDetails?.website && personalDetails.website.startsWith('http') && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#408080] hover:underline"><Globe size={11} />Portfolio</a>}
                    {personalDetails?.linkedin && personalDetails.linkedin.startsWith('http') && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#408080] hover:underline"><Linkedin size={11} />LinkedIn</a>}
                    {personalDetails?.github && personalDetails.github.startsWith('http') && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#408080] hover:underline"><Github size={11} />GitHub</a>}
                </div>
            </header>

            {summary && (
                <Section title="Summary">
                    <p className="text-gray-600 whitespace-pre-wrap text-xs leading-relaxed">
                        <HighlightedText text={summary} keywords={matchingKeywords} />
                    </p>
                </Section>
            )}

            {experience && experience.length > 0 && (
                <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-sm text-gray-900">{exp.role}</h3>
                                <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-xs italic text-gray-600">{exp.company}</p>
                            <div className="mt-1.5 text-gray-600 list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                <HighlightedText text={exp.description} keywords={matchingKeywords} />
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {education && education.length > 0 && (
                <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                                <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <p className="text-xs italic text-gray-600">{edu.institution}</p>
                            <div className="mt-1.5 text-gray-600 list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                <HighlightedText text={edu.description} keywords={matchingKeywords} />
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {projects && projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-3 last:mb-0">
                            <div className="flex items-baseline gap-2">
                                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                                {proj.url && proj.url.startsWith('http') && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[#408080]/80 text-xs hover:underline">(Link)</a>}
                            </div>
                            <div className="mt-1.5 text-gray-600 list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                <HighlightedText text={proj.description} keywords={matchingKeywords} />
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {skills && skills.length > 0 && (
                <Section title="Skills">
                    <div className="flex flex-wrap gap-1.5">
                        {skills.filter(s => s.name).map(skill => (
                            <span key={skill.id} className="bg-gray-200 text-gray-800 rounded-md px-2 py-0.5 text-xs font-medium">
                                <HighlightedText text={skill.name} keywords={matchingKeywords} />
                            </span>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
}
