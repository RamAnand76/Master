
"use client";

import type { ResumeData, AtsAnalysis } from '@/lib/types';
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
                    <span key={i} className="bg-yellow-200/50 rounded px-1">{part}</span>
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


export default function ElegantTemplate({ resumeData, atsAnalysis }: { resumeData: ResumeData, atsAnalysis: AtsAnalysis | null }) {
    if (!resumeData) return null;
    const { personalDetails, summary, experience, education, projects, skills } = resumeData;
    const matchingKeywords = atsAnalysis?.matchingKeywords ?? [];

    const contactInfo = [
        personalDetails.phone,
        personalDetails.email,
        personalDetails.website ? `Portfolio (${personalDetails.website})` : null,
        personalDetails.linkedin ? `LinkedIn (${getUrlUsername(personalDetails.linkedin)})` : null,
        personalDetails.github ? `GitHub (${getUrlUsername(personalDetails.github)})` : null
    ].filter(Boolean);

    return (
        <div className="bg-white text-black text-[10pt] leading-normal font-serif p-[0.35in]" style={{ fontFamily: '"Times New Roman", serif' }}>
            {/* Header Section */}
            <header className="text-center mb-4">
                <h1 className="text-[16pt] font-bold mb-1">{personalDetails.name}</h1>
                <p className="text-[10pt] mb-3">
                    {contactInfo.map((info, index) => {
                        if (!info) return null;
                        const urlMatch = info.match(/\((https?:\/\/[^)]+)\)/);
                        if (urlMatch) {
                            const text = info.replace(urlMatch[0], '').trim();
                            return <React.Fragment key={index}>{index > 0 && ' | '}<a href={urlMatch[1]} className="text-blue-600 hover:underline">{text}</a></React.Fragment>;
                        }
                        const emailMatch = info.match(/[\w.-]+@[\w.-]+/);
                        if (emailMatch) {
                            return <React.Fragment key={index}>{index > 0 && ' | '}<a href={`mailto:${info}`} className="text-blue-600 hover:underline">{info}</a></React.Fragment>;
                        }
                        return <React.Fragment key={index}>{index > 0 && ' | '}{info}</React.Fragment>;
                    })}
                </p>
            </header>

            {/* Summary Section */}
            {summary && (
                <section className="mb-3">
                    <h2 className="text-[11pt] font-bold mb-1 border-b border-black pb-0.5">Summary</h2>
                    <p className="whitespace-pre-wrap">
                       <HighlightedText text={summary} keywords={matchingKeywords} />
                    </p>
                </section>
            )}

            {/* Education Section */}
            {education && education.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11pt] font-bold mb-1 border-b border-black pb-0.5">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="font-bold text-[10pt]">{edu.institution}</p>
                                <p className="text-[10pt]">{edu.location || ''}</p>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <p className="italic">{edu.degree}</p>
                                <p>{edu.startDate} – {edu.endDate}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Experience Section */}
            {experience && experience.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11pt] font-bold mb-1 border-b border-black pb-0.5">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-2">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <p className="italic">{exp.role}</p>
                                <p>{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold text-[10pt]">{exp.company}</p>
                                <p>{exp.location || ''}</p>
                            </div>
                            <ul className="list-disc pl-5 mt-1 space-y-0.5 whitespace-pre-wrap">
                                <HighlightedText text={exp.description} keywords={matchingKeywords} />
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects Section */}
            {projects && projects.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11pt] font-bold mb-1 border-b border-black pb-0.5">Projects</h2>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-2">
                             <p className="font-bold text-[10pt]">
                                {proj.name} 
                                {proj.url && <a href={proj.url} className="text-blue-600 hover:underline font-normal text-xs ml-2"> (Link)</a>}
                            </p>
                            <ul className="list-disc pl-5 mt-1 space-y-0.5 whitespace-pre-wrap">
                                <HighlightedText text={proj.description} keywords={matchingKeywords} />
                            </ul>
                        </div>
                    ))}
                </section>
            )}
            
            {/* Technical Skills Section */}
            {skills && skills.length > 0 && (
                <section className="mb-3">
                    <h2 className="text-[11pt] font-bold mb-1 border-b border-black pb-0.5">Technical Skills</h2>
                    <div className="mt-1">
                        <p>
                            <span className="font-bold min-w-[120px] inline-block">Skills:</span>
                            <span>
                                <HighlightedText text={skills.map(skill => skill.name).join(', ')} keywords={matchingKeywords} />
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
};
