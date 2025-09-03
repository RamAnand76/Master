
"use client";

import type { ResumeData, AtsAnalysis } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github, MapPin, Briefcase, GraduationCap, Wrench } from 'lucide-react';
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
                    <span key={i} className="bg-yellow-400/30 rounded">{part}</span>
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

const Section = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: React.ElementType }) => (
    <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#408080]" />
            <span>{title}</span>
        </h2>
        <div className="border-l-2 border-[#408080]/20 pl-4">{children}</div>
    </div>
);

export default function CreativeTemplate({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    const { personalDetails, summary, experience, education, projects, skills } = resumeData;
    const matchingKeywords = atsAnalysis?.matchingKeywords ?? [];

    return (
        <div className="p-8 text-xs text-gray-800 bg-white font-body">
            <header className="mb-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#408080]/20 flex-shrink-0" />
                <div>
                    {personalDetails?.name && <h1 className="text-3xl font-bold tracking-tighter text-gray-900">{personalDetails.name}</h1>}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
                        {personalDetails?.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {personalDetails.location}</span>}
                        {personalDetails?.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1.5 hover:text-[#408080]"><Mail size={12} />{personalDetails.email}</a>}
                        {personalDetails?.phone && <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-1.5 hover:text-[#408080]"><Phone size={12} />{personalDetails.phone}</a>}
                        {personalDetails?.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#408080]"><Globe size={12} />Portfolio</a>}
                        {personalDetails?.linkedin && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#408080]"><Linkedin size={12} />{getUrlUsername(personalDetails.linkedin)}</a>}
                        {personalDetails?.github && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#408080]"><Github size={12} />{getUrlUsername(personalDetails.github)}</a>}
                    </div>
                </div>
            </header>

            {summary && (
                <div className="mb-4">
                    <p className="text-center text-sm italic text-gray-600 border-y-2 border-[#408080]/10 py-3">
                        <HighlightedText text={summary} keywords={matchingKeywords} />
                    </p>
                </div>
            )}

            {experience && experience.length > 0 && (
                <Section title="Experience" icon={Briefcase}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3 last:mb-0">
                            <h3 className="font-semibold text-sm text-gray-900">{exp.role} at {exp.company}</h3>
                            <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                            <div className="mt-1 text-gray-600 list-disc pl-4 space-y-1 whitespace-pre-wrap text-xs leading-relaxed">
                                <HighlightedText text={exp.description} keywords={matchingKeywords} />
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {education && education.length > 0 && (
                <Section title="Education" icon={GraduationCap}>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3 last:mb-0">
                            <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                            <p className="text-xs italic text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    ))}
                </Section>
            )}

            {skills && skills.length > 0 && (
                <Section title="Skills" icon={Wrench}>
                    <div className="flex flex-wrap gap-2">
                        {skills.filter(s => s.name).map(skill => (
                            <span key={skill.id} className="bg-[#408080]/10 text-[#408080] border border-[#408080]/30 rounded px-2 py-0.5 text-xs font-medium">
                                <HighlightedText text={skill.name} keywords={matchingKeywords} />
                            </span>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
}
