
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2, Trash2 } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import AiSuggestionDialog from './ai-suggestion-dialog';
import { useState } from 'react';
import { educationSchema, experienceSchema, projectSchema, skillSchema } from '@/lib/types';
import SectionCard from './resume-form/section-card';
import FieldArrayItem from './resume-form/field-array-item';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function ResumeForm() {
    const { control, getValues } = useFormContext<ResumeData>();
    const [suggestionField, setSuggestionField] = useState<'summary' | null>(null);

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: 'experience' });
    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: 'education' });
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' });
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
    
    const handleGetSuggestion = (fieldName: 'summary') => {
        setSuggestionField(fieldName);
    };

    return (
        <div className="space-y-6">
            <SectionCard title="Personal Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="personalDetails.name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input placeholder="john.doe@email.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input placeholder="New York, NY" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.website" render={({ field }) => ( <FormItem> <FormLabel>Portfolio/Website</FormLabel> <FormControl><Input placeholder="https://johndoe.dev" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.linkedin" render={({ field }) => ( <FormItem> <FormLabel>LinkedIn</FormLabel> <FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.github" render={({ field }) => ( <FormItem> <FormLabel>GitHub</FormLabel> <FormControl><Input placeholder="https://github.com/johndoe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                </div>
            </SectionCard>

            <SectionCard title="Summary">
                <div className="relative">
                    <FormField
                        control={control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="A brief professional summary..." {...field} rows={5} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" size="icon" variant="ghost" className="absolute top-1 right-1 text-accent-foreground/50 hover:text-accent-foreground/80" onClick={() => handleGetSuggestion('summary')} aria-label="Get AI Suggestions">
                                    <Wand2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Get AI Suggestions</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </SectionCard>
            
            <SectionCard title="Experience" onAdd={() => appendExperience(experienceSchema.parse({}))} addText="Add Experience">
                {experienceFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeExperience}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`experience.${index}.role`} render={({ field }) => ( <FormItem> <FormLabel>Role</FormLabel> <FormControl><Input placeholder="Software Engineer" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem> <FormLabel>Company</FormLabel> <FormControl><Input placeholder="Tech Corp" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.startDate`} render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <FormControl><Input placeholder="Jan 2022" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`experience.${index}.endDate`} render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <FormControl><Input placeholder="Present" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <FormField control={control} name={`experience.${index}.description`} render={({ field }) => ( <FormItem className="mt-4"> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="- Did this and that..." {...field} rows={4} /></FormControl> <FormMessage /> </FormItem> )}/>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Education" onAdd={() => appendEducation(educationSchema.parse({}))} addText="Add Education">
                {educationFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeEducation}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem> <FormLabel>Degree</FormLabel> <FormControl><Input placeholder="B.S. in Computer Science" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.institution`} render={({ field }) => ( <FormItem> <FormLabel>Institution</FormLabel> <FormControl><Input placeholder="State University" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.startDate`} render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <FormControl><Input placeholder="Aug 2018" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`education.${index}.endDate`} render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <FormControl><Input placeholder="May 2022" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <FormField control={control} name={`education.${index}.description`} render={({ field }) => ( <FormItem className="mt-4"> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="- Relevant coursework..." {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )}/>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Projects" onAdd={() => appendProject(projectSchema.parse({}))} addText="Add Project">
                {projectFields.map((field, index) => (
                    <FieldArrayItem key={field.id} index={index} onRemove={removeProject}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name={`projects.${index}.name`} render={({ field }) => ( <FormItem> <FormLabel>Project Name</FormLabel> <FormControl><Input placeholder="ResuMaster" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={control} name={`projects.${index}.url`} render={({ field }) => ( <FormItem> <FormLabel>Project URL</FormLabel> <FormControl><Input placeholder="https://resumaster.app" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        </div>
                        <FormField control={control} name={`projects.${index}.description`} render={({ field }) => ( <FormItem className="mt-4"> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="- Built this amazing app..." {...field} rows={3} /></FormControl> <FormMessage /> </FormItem> )}/>
                    </FieldArrayItem>
                ))}
            </SectionCard>

            <SectionCard title="Skills" onAdd={() => appendSkill(skillSchema.parse({}))} addText="Add Skill">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skillFields.map((field, index) => (
                        <div key={field.id} className="relative">
                            <FormField control={control} name={`skills.${index}.name`} render={({ field }) => ( <FormItem> <FormControl><Input placeholder="React" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                             <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-0 h-full w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeSkill(index)}
                                aria-label="Remove skill"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <AiSuggestionDialog
                open={!!suggestionField}
                onOpenChange={(isOpen) => !isOpen && setSuggestionField(null)}
                fieldName={suggestionField}
                currentValue={getValues(suggestionField || 'summary')}
            />
        </div>
    );
}
