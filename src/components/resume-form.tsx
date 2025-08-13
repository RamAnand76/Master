
"use client";

import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import AiSuggestionDialog from './ai-suggestion-dialog';
import { useState } from 'react';
import { educationSchema, experienceSchema, projectSchema, skillSchema } from '@/lib/types';
import SectionCard from './resume-form/section-card';
import FieldArrayItem from './resume-form/field-array-item';
import { InputGroup } from './ui/input-group';
import TextareaWithEnhancer from './resume-form/textarea-with-enhancer';
import { resumeDataSchema } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


export default function ResumeForm() {
    const { control, getValues, setValue } = useFormContext<ResumeData>();
    const [suggestionField, setSuggestionField] = useState<'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description` | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: 'experience' });
    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: 'education' });
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' });
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
    
    const [skillInputValue, setSkillInputValue] = useState('');

    const handleGetSuggestion = (fieldName: 'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description`) => {
        setSuggestionField(fieldName);
    };

    const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          if (skillInputValue.trim()) {
            appendSkill(skillSchema.parse({ name: skillInputValue.trim() }));
            setSkillInputValue('');
          }
        }
    };
    
    return (
        <>
            <SectionCard title="Personal Details" value="personal-details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="personalDetails.name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><InputGroup startContent={<Mail />}><Input type="email" placeholder="john.doe@email.com" {...field} /></InputGroup></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><InputGroup startContent={<Phone />}><Input placeholder="(123) 456-7890" {...field} /></InputGroup></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input placeholder="New York, NY" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.website" render={({ field }) => ( <FormItem> <FormLabel>Portfolio/Website</FormLabel> <FormControl><InputGroup startContent={<Globe />}><Input placeholder="https://johndoe.dev" {...field} /></InputGroup></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.linkedin" render={({ field }) => ( <FormItem> <FormLabel>LinkedIn</FormLabel> <FormControl><InputGroup startContent={<Linkedin />}><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></InputGroup></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.github" render={({ field }) => ( <FormItem> <FormLabel>GitHub</FormLabel> <FormControl><InputGroup startContent={<Github />}><Input placeholder="https://github.com/johndoe" /></InputGroup></FormControl> <FormMessage /> </FormItem> )}/>
                </div>
            </SectionCard>

            <SectionCard title="Summary" value="summary">
                <FormField
                    control={control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                           <TextareaWithEnhancer
                             field={field}
                             placeholder="A brief professional summary..."
                             max={resumeDataSchema.shape.summary.maxLength!}
                             onEnhance={() => handleGetSuggestion('summary')}
                             isLoading={isAiLoading && suggestionField === 'summary'}
                           />
                           <FormMessage />
                        </FormItem>
                    )}
                />
            </SectionCard>
            
            <SectionCard title="Experience" value="experience" onAdd={() => appendExperience(experienceSchema.parse({}))} addText="Add Experience">
                {experienceFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeExperience}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`experience.${index}.role`} render={({ field }) => ( <FormItem> <FormLabel>Role</FormLabel> <FormControl><Input placeholder="Software Engineer" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem> <FormLabel>Company</FormLabel> <FormControl><Input placeholder="Tech Corp" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.startDate`} render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <FormControl><Input placeholder="Jan 2022" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.endDate`} render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <FormControl><Input placeholder="Present" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <div className="mt-4">
                            <FormField control={control} name={`experience.${index}.description`} render={({ field }) => ( 
                                <FormItem> 
                                    <FormLabel>Description</FormLabel> 
                                     <TextareaWithEnhancer
                                        field={field}
                                        placeholder="- Did this and that..."
                                        max={experienceSchema.shape.description.maxLength!}
                                        onEnhance={() => handleGetSuggestion(`experience.${index}.description`)}
                                        isLoading={isAiLoading && suggestionField === `experience.${index}.description`}
                                     />
                                    <FormMessage /> 
                                </FormItem> 
                            )}/>
                        </div>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Education" value="education" onAdd={() => appendEducation(educationSchema.parse({}))} addText="Add Education">
                {educationFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeEducation}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem> <FormLabel>Degree</FormLabel> <FormControl><Input placeholder="B.S. in Computer Science" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.institution`} render={({ field }) => ( <FormItem> <FormLabel>Institution</FormLabel> <FormControl><Input placeholder="State University" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.startDate`} render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <FormControl><Input placeholder="Aug 2018" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.endDate`} render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <FormControl><Input placeholder="May 2022" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                         <div className="mt-4">
                            <FormField control={control} name={`education.${index}.description`} render={({ field }) => ( 
                                <FormItem> 
                                    <FormLabel>Description</FormLabel> 
                                    <TextareaWithEnhancer
                                        field={field}
                                        placeholder="- Relevant coursework..."
                                        max={educationSchema.shape.description.maxLength!}
                                        onEnhance={() => handleGetSuggestion(`education.${index}.description`)}
                                        isLoading={isAiLoading && suggestionField === `education.${index}.description`}
                                    />
                                    <FormMessage /> 
                                </FormItem> 
                            )}/>
                        </div>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Projects" value="projects" onAdd={() => appendProject(projectSchema.parse({}))} addText="Add Project">
                {projectFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeProject}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`projects.${index}.name`} render={({ field }) => ( <FormItem> <FormLabel>Project Name</FormLabel> <FormControl><Input placeholder="ResuMaster" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`projects.${index}.url`} render={({ field }) => ( <FormItem> <FormLabel>Project URL</FormLabel> <FormControl><Input placeholder="https://resumaster.app" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <div className="mt-4">
                            <FormField control={control} name={`projects.${index}.description`} render={({ field }) => ( 
                                <FormItem> 
                                    <FormLabel>Description</FormLabel> 
                                    <TextareaWithEnhancer
                                        field={field}
                                        placeholder="- Built this amazing app..."
                                        max={projectSchema.shape.description.maxLength!}
                                        onEnhance={() => handleGetSuggestion(`projects.${index}.description`)}
                                        isLoading={isAiLoading && suggestionField === `projects.${index}.description`}
                                    />
                                    <FormMessage /> 
                                </FormItem> 
                            )}/>
                        </div>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Skills" value="skills">
                 <div className="space-y-4">
                    <Input
                        placeholder="Type a skill and press Enter..."
                        value={skillInputValue}
                        onChange={(e) => setSkillInputValue(e.target.value)}
                        onKeyDown={handleSkillInputKeyDown}
                    />
                     {skillFields.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                        {skillFields.map((field, index) => (
                            <Badge key={field.id} variant="secondary" className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-sm">
                                {getValues(`skills.${index}.name`)}
                                <button
                                    type="button"
                                    className="rounded-full hover:bg-background/50 text-muted-foreground hover:text-foreground"
                                    onClick={() => removeSkill(index)}
                                    aria-label={`Remove ${getValues(`skills.${index}.name`)}`}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </Badge>
                        ))}
                        </div>
                    )}
                 </div>
            </SectionCard>

            <AiSuggestionDialog
                open={!!suggestionField && !isAiLoading}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSuggestionField(null);
                    }
                }}
                fieldName={suggestionField}
                currentValue={getValues(suggestionField || 'summary')}
                setIsLoading={setIsAiLoading}
            />
        </>
    );
}
