
"use client";

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, Sparkles, LoaderCircle, PlusCircle, Briefcase, GraduationCap, FolderKanban, Star, Clapperboard } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { educationSchema, experienceSchema, projectSchema, skillSchema, resumeDataSchema } from '@/lib/schemas';
import AiSuggestionDialog from './ai-suggestion-dialog';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CharacterCount } from './resume-form/character-count';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage, FormControl } from '@/components/ui/form';

const EmptyState = ({ icon, title, description, buttonText, onAdd }: { icon: React.ReactNode, title: string, description: string, buttonText: string, onAdd: () => void }) => (
    <div className="text-center py-12 border-2 border-dashed border-border/30 rounded-lg flex flex-col items-center justify-center">
        {icon}
        <h3 className="text-lg font-medium text-muted-foreground mt-3">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button onClick={onAdd} size="sm" variant="outline" type="button">
            <PlusCircle className="mr-2 h-4 w-4" />
            {buttonText}
        </Button>
    </div>
);


export default function ResumeForm() {
    const { control, getValues } = useFormContext<ResumeData>();
    const [suggestionField, setSuggestionField] = useState<'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description` | null>(null);
    const [isAiLoading, setIsAiLoading] = useState<string | null>(null);

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: 'experience' });
    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: 'education' });
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: 'projects' });
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
    
    const [skillInputValue, setSkillInputValue] = useState('');

    const handleGetSuggestion = (fieldName: 'summary' | `experience.${number}.description` | `education.${number}.description` | `projects.${number}.description`) => {
        setIsAiLoading(fieldName);
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
            <div className="space-y-6 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <h2 className="text-base/7 font-semibold text-accent">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="personalDetails.name" render={({ field }) => ( 
                        <FormItem>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <div> 
                                        <Label>Full Name</Label>
                                        <FormControl>
                                            <Input {...field} readOnly className="mt-1 bg-input cursor-not-allowed opacity-70" /> 
                                        </FormControl>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Your name is managed in your profile settings.</p>
                                </TooltipContent>
                            </Tooltip>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={control} name="personalDetails.email" render={({ field }) => ( <FormItem> <Label>Email</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.phone" render={({ field }) => ( <FormItem> <Label>Phone</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.location" render={({ field }) => ( <FormItem> <Label>Location</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.website" render={({ field }) => ( <FormItem> <Label>Portfolio/Website</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.linkedin" render={({ field }) => ( <FormItem> <Label>LinkedIn</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={control} name="personalDetails.github" render={({ field }) => ( <FormItem> <Label>GitHub</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                </div>
            </div>

            <div className="space-y-1 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <h2 className="text-base/7 font-semibold text-accent">Summary</h2>
                <FormField
                    control={control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <div className="relative">
                               <FormControl>
                                <Textarea {...field} rows={5} className='pr-10 pb-8 resize-none bg-input' />
                               </FormControl>
                               <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                    <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion('summary')} disabled={!!isAiLoading}>
                                        {isAiLoading === 'summary' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <div className="absolute bottom-2.5 left-3">
                                    <CharacterCount name={field.name as keyof ResumeData} max={resumeDataSchema.shape.summary.maxLength!} />
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-base/7 font-semibold text-accent">Experience</h2>
                    <Button variant="ghost" size="sm" onClick={() => appendExperience(experienceSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                </div>
                {experienceFields.length > 0 ? (
                    experienceFields.map((field, index) => (
                        <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={control} name={`experience.${index}.role`} render={({ field }) => ( <FormItem> <Label>Role</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem> <Label>Company</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`experience.${index}.startDate`} render={({ field }) => ( <FormItem> <Label>Start Date</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`experience.${index}.endDate`} render={({ field }) => ( <FormItem> <Label>End Date</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                            <div className="mt-4">
                                <FormField control={control} name={`experience.${index}.description`} render={({ field }) => ( 
                                    <FormItem> 
                                        <Label>Description</Label> 
                                        <div className="relative"> 
                                            <FormControl>
                                                <Textarea {...field} rows={5} className='mt-1 pr-10 pb-8 resize-none bg-input' />
                                            </FormControl>
                                            <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`experience.${index}.description`)} disabled={!!isAiLoading}>
                                                    {isAiLoading === `experience.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-2.5 left-3">
                                                <CharacterCount name={field.name as keyof ResumeData} max={experienceSchema.shape.description.maxLength!} />
                                            </div>
                                        </div> 
                                        <FormMessage />
                                    </FormItem> 
                                )}/>
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeExperience(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))
                ) : (
                    <EmptyState
                        icon={<Briefcase className="w-12 h-12 text-muted-foreground/50" />}
                        title="No experience added"
                        description="Add your work experience to show your professional history."
                        buttonText="Add Experience"
                        onAdd={() => appendExperience(experienceSchema.parse({}))}
                    />
                )}
            </div>

            <div className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                 <div className="flex justify-between items-center">
                    <h2 className="text-base/7 font-semibold text-accent">Education</h2>
                    <Button variant="ghost" size="sm" onClick={() => appendEducation(educationSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                </div>
                {educationFields.length > 0 ? (
                    educationFields.map((field, index) => (
                        <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem> <Label>Degree</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`education.${index}.institution`} render={({ field }) => ( <FormItem> <Label>Institution</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`education.${index}.startDate`} render={({ field }) => ( <FormItem> <Label>Start Date</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`education.${index}.endDate`} render={({ field }) => ( <FormItem> <Label>End Date</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                             <div className="mt-4">
                                <FormField control={control} name={`education.${index}.description`} render={({ field }) => ( 
                                    <FormItem> 
                                        <Label>Description</Label>
                                         <div className="relative"> 
                                            <FormControl>
                                                <Textarea {...field} rows={5} className='mt-1 pr-10 pb-8 resize-none bg-input' />
                                            </FormControl>
                                            <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`education.${index}.description`)} disabled={!!isAiLoading}>
                                                    {isAiLoading === `education.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-2.5 left-3">
                                                <CharacterCount name={field.name as keyof ResumeData} max={educationSchema.shape.description.maxLength!} />
                                            </div>
                                        </div> 
                                        <FormMessage />
                                    </FormItem> 
                                )}/>
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeEducation(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))
                ) : (
                    <EmptyState
                        icon={<GraduationCap className="w-12 h-12 text-muted-foreground/50" />}
                        title="No education added"
                        description="List your degrees and academic achievements."
                        buttonText="Add Education"
                        onAdd={() => appendEducation(educationSchema.parse({}))}
                    />
                )}
            </div>

            <div className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-base/7 font-semibold text-accent">Projects</h2>
                    <Button variant="ghost" size="sm" onClick={() => appendProject(projectSchema.parse({}))} type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </div>
                {projectFields.length > 0 ? (
                    projectFields.map((field, index) => (
                         <div key={field.id} className="relative p-4 border border-border/50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={control} name={`projects.${index}.name`} render={({ field }) => ( <FormItem> <Label>Project Name</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={control} name={`projects.${index}.url`} render={({ field }) => ( <FormItem> <Label>Project URL</Label> <FormControl><Input {...field} className="mt-1 bg-input" /></FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                            <div className="mt-4">
                                <FormField control={control} name={`projects.${index}.description`} render={({ field }) => ( 
                                    <FormItem> 
                                        <Label>Description</Label>
                                        <div className="relative"> 
                                            <FormControl>
                                                <Textarea {...field} rows={5} className='mt-1 pr-10 pb-8 resize-none bg-input' />
                                            </FormControl>
                                            <div className="absolute bottom-2 right-2 flex items-center gap-2">
                                                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-primary hover:text-primary/90" onClick={() => handleGetSuggestion(`projects.${index}.description`)} disabled={!!isAiLoading}>
                                                    {isAiLoading === `projects.${index}.description` ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-2.5 left-3">
                                                <CharacterCount name={field.name as keyof ResumeData} max={projectSchema.shape.description.maxLength!} />
                                            </div>
                                        </div> 
                                        <FormMessage />
                                    </FormItem> 
                                )}/>
                            </div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-red-500" onClick={() => removeProject(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))
                ) : (
                    <EmptyState
                        icon={<FolderKanban className="w-12 h-12 text-muted-foreground/50" />}
                        title="No projects added"
                        description="Showcase your work by adding personal or professional projects."
                        buttonText="Add Project"
                        onAdd={() => appendProject(projectSchema.parse({}))}
                    />
                )}
            </div>

            <div className="space-y-4 rounded-xl bg-card/80 p-6 sm:p-8 border border-border/20 shadow-lg">
                <h2 className="text-base/7 font-semibold text-accent">Skills</h2>
                 <div className="space-y-4">
                    <Input
                        placeholder="Type a skill and press Enter..."
                        value={skillInputValue}
                        onChange={(e) => setSkillInputValue(e.target.value)}
                        onKeyDown={handleSkillInputKeyDown}
                        className="bg-input"
                    />
                     {skillFields.length > 0 ? (
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
                    ) : (
                         <EmptyState
                            icon={<Star className="w-12 h-12 text-muted-foreground/50" />}
                            title="No skills added"
                            description="Add relevant skills to showcase your expertise."
                            buttonText="Add a skill in the input above"
                            onAdd={() => document.querySelector<HTMLInputElement>('input[placeholder="Type a skill and press Enter..."]')?.focus()}
                        />
                    )}
                 </div>
            </div>

            <AiSuggestionDialog
                open={!!suggestionField}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSuggestionField(null);
                        setIsAiLoading(null);
                    }
                }}
                fieldName={suggestionField}
                currentValue={suggestionField ? getValues(suggestionField) : ''}
            />
        </>
    );
}

    