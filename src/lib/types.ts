
import { z } from 'zod';

// Helper to generate UUID on the client
const generateId = () => (typeof window !== 'undefined' ? crypto.randomUUID() : Math.random().toString());

export const personalDetailsSchema = z.object({
  name: z.string().max(50).default('Your Name'),
  email: z.string().email({ message: "Invalid email address" }).max(50).or(z.literal('')).default('your.email@example.com'),
  phone: z.string().max(20).default('+1 (123) 456-7890'),
  location: z.string().max(50).default('City, State'),
  website: z.string().url({ message: "Invalid URL" }).max(100).or(z.literal('')).default(''),
  linkedin: z.string().url({ message: "Invalid URL" }).max(100).or(z.literal('')).default(''),
  github: z.string().url({ message: "Invalid URL" }).max(100).or(z.literal('')).default(''),
});

export const experienceSchema = z.object({
  id: z.string().default(generateId),
  company: z.string().max(50).default('Company Name'),
  role: z.string().max(50).default('Job Title'),
  startDate: z.string().max(20).default('Month Year'),
  endDate: z.string().max(20).default('Present'),
  description: z.string().max(2000, "Description cannot exceed 2000 characters.").default('- Bullet point about your achievement.'),
});

export const educationSchema = z.object({
  id: z.string().default(generateId),
  institution: z.string().max(100).default('University Name'),
  degree: z.string().max(100).default('Degree and Major'),
  startDate: z.string().max(20).default('Month Year'),
  endDate: z.string().max(20).default('Month Year'),
  description: z.string().max(1000, "Description cannot exceed 1000 characters.").default('- Relevant coursework or honors.'),
});

export const projectSchema = z.object({
    id: z.string().default(generateId),
    name: z.string().max(50).default('Project Title'),
    description: z.string().max(1000, "Description cannot exceed 1000 characters.").default('A brief description of your project.'),
    url: z.string().url({ message: "Invalid URL" }).max(100).or(z.literal('')).default('')
});

export const skillSchema = z.object({
    id: z.string().default(generateId),
    name: z.string().max(50).default('A skill'),
});

export const resumeDataSchema = z.object({
  id: z.string(),
  name: z.string().max(50).default('Untitled Resume'),
  template: z.string().default('classic'),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  personalDetails: personalDetailsSchema.default({
    name: 'Your Name', email: 'your.email@example.com', phone: '+1 (123) 456-7890', location: 'City, State', website: '', linkedin: '', github: ''
  }),
  summary: z.string().max(350, "Summary cannot exceed 350 characters.").default('A brief professional summary about yourself.'),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
  jobDescription: z.string().default(''),
  jobPosition: z.string().default(''),
  company: z.string().default(''),
});

export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;

// AI Related Schemas
export const SuggestResumeImprovementsInputSchema = z.object({
  resumeContent: z.string().describe('The content of the resume to be improved.'),
});
export type SuggestResumeImprovementsInput = z.infer<typeof SuggestResumeImprovementsInputSchema>;

export const SuggestResumeImprovementsOutputSchema = z.object({
  improvedContent: z.string().describe('The improved content of the resume with suggestions.'),
  explanation: z.string().describe('An explanation of the changes made and why they were suggested.'),
});
export type SuggestResumeImprovementsOutput = z.infer<typeof SuggestResumeImprovementsOutputSchema>;

export const GenerateTailoredResumeInputSchema = z.object({
  jobPosition: z.string().describe("The job position the user is applying for."),
  company: z.string().describe("The company the user is applying to."),
  jobDescription: z.string().describe("The job description provided by the user."),
});
export type GenerateTailoredResumeInput = z.infer<typeof GenerateTailoredResumeInputSchema>;

export const GenerateTailoredResumeOutputSchema = z.object({
  summary: z.string().describe("A professional summary tailored to the job description."),
  experienceDescription: z.string().describe("A description for the most recent experience, tailored to the job description."),
});
export type GenerateTailoredResumeOutput = z.infer<typeof GenerateTailoredResumeOutputSchema>;

export const AnalyzeResumeForAtsInputSchema = z.object({
    resumeSummary: z.string().describe("The professional summary from the user's resume."),
    resumeExperience: z.array(experienceSchema).describe("The work experience from the user's resume."),
    resumeSkills: z.array(skillSchema).describe("The skills from the user's resume."),
    jobDescription: z.string().describe("The target job description."),
});
export type AnalyzeResumeForAtsInput = z.infer<typeof AnalyzeResumeForAtsInputSchema>;

export const AnalyzeResumeForAtsOutputSchema = z.object({
    score: z.number().describe("An ATS score from 0 to 100."),
    feedback: z.string().describe("Actionable feedback for the user on how to improve their resume for the given job description. Each feedback point should be a separate bullet point starting with a hyphen."),
    matchingKeywords: z.array(z.string()).describe("A list of critical keywords found in both the resume and the job description."),
    missingKeywords: z.array(z.string()).describe("A list of critical keywords missing from the resume."),
});
export type AnalyzeResumeForAtsOutput = z.infer<typeof AnalyzeResumeForAtsOutputSchema>;
export type AtsAnalysis = AnalyzeResumeForAtsOutput;

export const GetKeywordSuggestionInputSchema = z.object({
    keyword: z.string().describe("The missing keyword to get a suggestion for."),
    resume: resumeDataSchema.describe("The user's current resume data."),
});
export type GetKeywordSuggestionInput = z.infer<typeof GetKeywordSuggestionInputSchema>;

export const GetKeywordSuggestionOutputSchema = z.object({
    suggestion: z.string().describe("A suggestion on where and how to add the keyword."),
    example: z.string().describe("A specific example of the updated text."),
});
export type GetKeywordSuggestionOutput = z.infer<typeof GetKeywordSuggestionOutputSchema>;

export const ValidateJobDetailsInputSchema = z.object({
    jobPosition: z.string().optional(),
    company: z.string().optional(),
});
export type ValidateJobDetailsInput = z.infer<typeof ValidateJobDetailsInputSchema>;

export const ValidateJobDetailsOutputSchema = z.object({
    isValid: z.boolean().describe("Whether the job details are valid."),
    reason: z.string().optional().describe("The reason why the job details are not valid."),
});
export type ValidateJobDetailsOutput = z.infer<typeof ValidateJobDetailsOutputSchema>;
