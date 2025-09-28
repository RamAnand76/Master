
import { z } from 'zod';
import type { templates } from './templates';
import { resumeDataSchema, personalDetailsSchema, experienceSchema, educationSchema, projectSchema, skillSchema, AnalyzeResumeForAtsOutputSchema } from './schemas';


export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;

// Template type from templates file
export type Template = (typeof templates)[0];

// This type is still needed for the ATS Panel component.
export type AtsAnalysis = z.infer<typeof AnalyzeResumeForAtsOutputSchema>;
