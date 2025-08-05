import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
        <h2 className="text-base font-bold text-primary border-b border-primary/50 pb-1 mb-2 uppercase tracking-wider">{title}</h2>
        {children}
    </div>
);

export default function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
  if (!resumeData) return null;
  const { personalDetails, summary, experience, education, projects, skills } = resumeData;

  return (
    <div className="p-8 text-sm text-foreground bg-background font-body">
      <header className="text-center mb-8">
        {personalDetails?.name && <h1 className="text-3xl font-bold font-headline">{personalDetails.name}</h1>}
        <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground flex-wrap">
            {personalDetails?.location && <span>{personalDetails.location}</span>}
            {personalDetails?.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail size={12}/>{personalDetails.email}</a>}
            {personalDetails?.phone && <a href={`tel:${personalDetails.phone}`} className="flex items-center gap-1.5 hover:text-primary"><Phone size={12}/>{personalDetails.phone}</a>}
            {personalDetails?.website && personalDetails.website.startsWith('http') && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe size={12}/>Portfolio</a>}
            {personalDetails?.linkedin && personalDetails.linkedin.startsWith('http') && <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin size={12}/>LinkedIn</a>}
            {personalDetails?.github && personalDetails.github.startsWith('http') && <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Github size={12}/>GitHub</a>}
        </div>
      </header>

      {summary && (
        <Section title="Summary">
          <p className="text-muted-foreground whitespace-pre-wrap text-sm">{summary}</p>
        </Section>
      )}

      {experience && experience.length > 0 && (
        <Section title="Experience">
            {experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-base">{exp.role}</h3>
                        <span className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-sm italic text-muted-foreground">{exp.company}</p>
                    <ul className="mt-1 text-muted-foreground list-disc pl-5 whitespace-pre-wrap text-sm">
                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
            ))}
        </Section>
      )}

      {education && education.length > 0 && (
        <Section title="Education">
            {education.map(edu => (
                <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-base">{edu.degree}</h3>
                        <span className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-sm italic text-muted-foreground">{edu.institution}</p>
                     <ul className="mt-1 text-muted-foreground list-disc pl-5 whitespace-pre-wrap text-sm">
                        {edu.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
            ))}
        </Section>
      )}

      {projects && projects.length > 0 && (
          <Section title="Projects">
              {projects.map(proj => (
                  <div key={proj.id} className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-semibold text-base">{proj.name}</h3>
                        {proj.url && proj.url.startsWith('http') && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-accent text-xs hover:underline">(Link)</a>}
                      </div>
                      <ul className="mt-1 text-muted-foreground list-disc pl-5 whitespace-pre-wrap text-sm">
                        {proj.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
              ))}
          </Section>
      )}

      {skills && skills.length > 0 && (
          <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                  {skills.filter(s => s.name).map(skill => (
                      <span key={skill.id} className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium">
                          {skill.name}
                      </span>
                  ))}
              </div>
          </Section>
      )}
    </div>
  );
}
