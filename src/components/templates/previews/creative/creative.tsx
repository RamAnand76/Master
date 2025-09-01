
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
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
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
                        {personalDetails?.linkedin && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#408080]"><Linkedin size={12} />LinkedIn</a>}
                        {personalDetails?.github && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#408080]"><Github size={12} />GitHub</a>}
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
                <Section title="Experience" icon={BriefcaseIcon}>
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
                <Section title="Education" icon={GraduationCapIcon}>
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
                <Section title="Skills" icon={WrenchIcon}>
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

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
