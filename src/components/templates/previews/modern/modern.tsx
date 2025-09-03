
"use client";

import type { ResumeData, AtsAnalysis } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github, MapPin } from 'lucide-react';
import React from 'react';

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const HighlightedText = ({ text, keywords }: { text: string; keywords: string[] }) => {
    if (!keywords || keywords.length === 0 || !text) return <>{text}</>;
    const escapedKeywords = keywords.map(kw => escapeRegExp(kw));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
    return (
        <>
            {text.split(regex).map((part, i) =>
                keywords.some(kw => new RegExp(`^${escapeRegExp(kw)}$`, 'i').test(part)) ? (
                    <span key={i} className="bg-green-500/20 rounded px-1">{part}</span>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
};

const getUrlUsername = (url: string) => {
    if (!url || !url.startsWith('http')) return '';
    try {
        const path = new URL(url).pathname;
        return path.split('/').filter(Boolean).pop() || '';
    } catch {
        return '';
    }
}

export default function ModernTemplate({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    const { personalDetails, summary, experience, education, projects, skills } = resumeData;
    const matchingKeywords = atsAnalysis?.matchingKeywords ?? [];

    return (
        <div className="p-4 text-xs text-gray-800 bg-white font-body flex gap-4">
            {/* Left Column */}
            <aside className="w-1/3 bg-gray-100 p-4 rounded-lg">
                {personalDetails?.name && <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">{personalDetails.name}</h1>}
                <div className="space-y-2 text-gray-600 text-xs">
                    {personalDetails?.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-2 hover:text-[#408080]"><Mail size={12} className="flex-shrink-0" /><span>{personalDetails.email}</span></a>}
                    {personalDetails?.phone && <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-2 hover:text-[#408080]"><Phone size={12} className="flex-shrink-0" /><span>{personalDetails.phone}</span></a>}
                    {personalDetails?.location && <p className="flex items-center gap-2"><MapPin size={12} className="flex-shrink-0" /><span>{personalDetails.location}</span></p>}
                    {personalDetails?.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#408080]"><Globe size={12} className="flex-shrink-0" /><span>Portfolio</span></a>}
                    {personalDetails?.linkedin && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#408080]"><Linkedin size={12} className="flex-shrink-0" /><span>{getUrlUsername(personalDetails.linkedin)}</span></a>}
                    {personalDetails?.github && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#408080]"><Github size={12} className="flex-shrink-0" /><span>{getUrlUsername(personalDetails.github)}</span></a>}
                </div>
                <hr className="my-4 border-gray-300" />
                {skills && skills.length > 0 && (
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#408080]">Skills</h2>
                        <ul className="space-y-1">
                            {skills.filter(s => s.name).map(skill => (
                                <li key={skill.id} className="text-gray-600">
                                    <HighlightedText text={skill.name} keywords={matchingKeywords} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {education && education.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#408080]">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 last:mb-0">
                                <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                                <p className="text-xs text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* Right Column */}
            <main className="w-2/3 space-y-4">
                {summary && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#408080]">Summary</h2>
                        <p className="text-gray-600 whitespace-pre-wrap text-xs leading-relaxed">
                            <HighlightedText text={summary} keywords={matchingKeywords} />
                        </p>
                    </section>
                )}
                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#408080]">Experience</h2>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-3 last:mb-0">
                                <h3 className="font-semibold text-sm text-gray-900">{exp.role}</h3>
                                <div className="flex justify-between items-baseline">
                                    <p className="text-xs italic text-gray-600">{exp.company}</p>
                                    <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="mt-1.5 text-gray-600 list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
                                    <HighlightedText text={exp.description} keywords={matchingKeywords} />
                                </div>
                            </div>
                        ))}
                    </section>
                )}
                 {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#408080]">Projects</h2>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-3 last:mb-0">
                               <div className="flex items-baseline gap-2">
                                 <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                                 {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[#408080]/80 text-xs hover:underline">(Link)</a>}
                               </div>
                                <div className="mt-1 text-gray-600 list-disc pl-4 space-y-0.5 whitespace-pre-wrap text-xs">
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
