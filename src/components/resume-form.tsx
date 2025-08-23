
"use client";

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, Sparkles, LoaderCircle, PlusCircle } from 'lucide-react';
import { ResumeData, educationSchema, experienceSchema, projectSchema, skillSchema, resumeDataSchema } from '@/lib/types';
import AiSuggestionDialog from './ai-suggestion-dialog';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Fieldset, Legend, Label, Input, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { CharacterCount } from './resume-form/character-count';


const inputClasses = clsx(
    'block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-foreground',
    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
);

export default function ResumeForm() {
    const { control, getValues } = useFormContext<ResumeData>();
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
            <Fieldset className="space-y-6 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <Legend className="text-base/7 font-semibold text-accent">Personal Details</Legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller control={control} name="personalDetails.name" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Full Name</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.email" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Email</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.phone" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Phone</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.location" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Location</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.website" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Portfolio/Website</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.linkedin" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">LinkedIn</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                    <Controller control={control} name="personalDetails.github" render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">GitHub</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                </div>
            </Fieldset>

            <Fieldset className="space-y-1 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <Legend className="text-base/7 font-semibold text-accent">Summary</Legend>
                <Controller
                    control={control}
                    name="summary"
                    render={({ field }) => (
                        <div className="relative">
                           <Textarea {...field} rows={5} className={clsx(inputClasses, 'pr-10 pb-8 resize-none')} />
                           <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion('summary')} disabled={isAiLoading}>
                                    {isAiLoading && suggestionField === 'summary' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="absolute bottom-2.5 left-3">
                                <CharacterCount name={field.name as keyof ResumeData} max={resumeDataSchema.shape.summary.maxLength!} />
                            </div>
                        </div>
                    )}
                />
            </Fieldset>
            
            <Fieldset className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <div className="flex justify-between items-center">
                    <Legend className="text-base/7 font-semibold text-accent">Experience</Legend>
                    <Button variant="ghost" size="sm" onClick={() => appendExperience(experienceSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                </div>
                {experienceFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller control={control} name={`experience.${index}.role`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Role</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`experience.${index}.company`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Company</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`experience.${index}.startDate`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Start Date</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`experience.${index}.endDate`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">End Date</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                        </div>
                        <div className="mt-4">
                            <Controller control={control} name={`experience.${index}.description`} render={({ field }) => ( 
                                <div className="relative"> 
                                    <Label className="text-sm/6 font-medium text-foreground">Description</Label> 
                                    <Textarea {...field} rows={5} className={clsx(inputClasses, 'mt-1 pr-10 pb-8 resize-none')} />
                                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                        <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`experience.${index}.description`)} disabled={isAiLoading}>
                                            {isAiLoading && suggestionField === `experience.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2.5 left-3">
                                        <CharacterCount name={field.name as keyof ResumeData} max={experienceSchema.shape.description.maxLength!} />
                                    </div>
                                </div> 
                            )}/>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeExperience(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </Fieldset>

            <Fieldset className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                 <div className="flex justify-between items-center">
                    <Legend className="text-base/7 font-semibold text-accent">Education</Legend>
                    <Button variant="ghost" size="sm" onClick={() => appendEducation(educationSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                </div>
                {educationFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller control={control} name={`education.${index}.degree`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Degree</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`education.${index}.institution`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Institution</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`education.${index}.startDate`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Start Date</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`education.${index}.endDate`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">End Date</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                        </div>
                         <div className="mt-4">
                            <Controller control={control} name={`education.${index}.description`} render={({ field }) => ( 
                                <div className="relative"> 
                                    <Label className="text-sm/6 font-medium text-foreground">Description</Label>
                                     <Textarea {...field} rows={5} className={clsx(inputClasses, 'mt-1 pr-10 pb-8 resize-none')} />
                                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                        <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`education.${index}.description`)} disabled={isAiLoading}>
                                            {isAiLoading && suggestionField === `education.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                     <div className="absolute bottom-2.5 left-3">
                                        <CharacterCount name={field.name as keyof ResumeData} max={educationSchema.shape.description.maxLength!} />
                                    </div>
                                </div> 
                            )}/>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeEducation(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </Fieldset>

            <Fieldset className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <div className="flex justify-between items-center">
                    <Legend className="text-base/7 font-semibold text-accent">Projects</Legend>
                    <Button variant="ghost" size="sm" onClick={() => appendProject(projectSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </div>
                {projectFields.map((field, index) => (
                     <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller control={control} name={`projects.${index}.name`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Project Name</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                            <Controller control={control} name={`projects.${index}.url`} render={({ field }) => ( <div> <Label className="text-sm/6 font-medium text-foreground">Project URL</Label> <Input {...field} className={inputClasses} /> </div> )}/>
                        </div>
                        <div className="mt-4">
                            <Controller control={control} name={`projects.${index}.description`} render={({ field }) => ( 
                                <div className="relative"> 
                                    <Label className="text-sm/6 font-medium text-foreground">Description</Label>
                                    <Textarea {...field} rows={5} className={clsx(inputClasses, 'mt-1 pr-10 pb-8 resize-none')} />
                                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                        <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`projects.${index}.description`)} disabled={isAiLoading}>
                                            {isAiLoading && suggestionField === `projects.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2.5 left-3">
                                        <CharacterCount name={field.name as keyof ResumeData} max={projectSchema.shape.description.maxLength!} />
                                    </div>
                                </div> 
                            )}/>
                        </div>
                         <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeProject(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </Fieldset>

            <Fieldset className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <Legend className="text-base/7 font-semibold text-accent">Skills</Legend>
                 <div className="space-y-4">
                    <Input
                        placeholder="Type a skill and press Enter..."
                        value={skillInputValue}
                        onChange={(e) => setSkillInputValue(e.target.value)}
                        onKeyDown={handleSkillInputKeyDown}
                        className={inputClasses}
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
            </Fieldset>

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
