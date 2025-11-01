
import { z } from 'zod';

// Helper to generate UUID on the client
const generateId = () => (typeof window !== 'undefined' ? crypto.randomUUID() : `server-${Math.random().toString(36).substring(2, 12)}`);

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
    name: z.string().max(50),
});

export const resumeDataSchema = z.object({
  id: z.string().default(generateId),
  name: z.string().max(50).default('Untitled Resume'),
  template: z.string().default('classic'),
  createdAt: z.string().datetime().default(() => new Date().toISOString()),
  personalDetails: personalDetailsSchema.default({}),
  summary: z.string().max(300, "Summary cannot exceed 300 characters.").default('A brief professional summary about yourself.'),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
  jobDescription: z.string().default(''),
  jobPosition: z.string().default(''),
  company: z.string().default(''),
});


// AI Related Schemas

export const SuggestResumeImprovementsInputSchema = z.object({
  resumeContent: z.string().describe('The content of the resume to be improved.'),
});

export const SuggestResumeImprovementsOutputSchema = z.object({
  improvedContent: z.string().describe('The improved content of the resume with suggestions.'),
  explanation: z.string().describe('An explanation of the changes made and why they were suggested.'),
});

export const GenerateTailoredResumeInputSchema = z.object({
  jobPosition: z.string().describe("The job position the user is applying for."),
  company: z.string().describe("The company the user is applying to."),
  jobDescription: z.string().describe("The job description provided by the user."),
});

export const GenerateTailoredResumeOutputSchema = z.object({
  summary: z.string().describe("A professional summary tailored to the job description."),
  experienceDescription: z.string().describe("This is no longer used, but kept for schema compatibility. It will be an empty string.").default(""),
});

export const AnalyzeResumeForAtsInputSchema = z.object({
    resumeSummary: z.string().describe("The professional summary from the user's resume."),
    resumeExperience: z.array(experienceSchema).describe("The work experience from the user's resume."),
    resumeSkills: z.array(skillSchema).describe("The skills from the user's resume."),
    jobDescription: z.string().describe("The target job description."),
});

export const AnalyzeResumeForAtsOutputSchema = z.object({
    score: z.number().describe("An ATS score from 0 to 100."),
    feedback: z.string().describe("Actionable feedback for the user on how to improve their resume for the given job description. Each feedback point should be a separate bullet point starting with a hyphen."),
    matchingKeywords: z.array(z.string()).describe("A list of critical keywords found in both the resume and the job description."),
    missingKeywords: z.array(z.string()).describe("A list of critical keywords missing from the resume."),
});

export const GetKeywordSuggestionInputSchema = z.object({
    keyword: z.string().describe("The missing keyword to get a suggestion for."),
    resume: resumeDataSchema.describe("The user's current resume data."),
});

export const GetKeywordSuggestionOutputSchema = z.object({
    suggestion: z.string().describe("A suggestion on where and how to add the keyword."),
    example: z.string().describe("A specific example of the updated text."),
});

export const ValidateJobDetailsInputSchema = z.object({
    jobPosition: z.string().optional(),
    company: z.string().optional(),
});

export const ValidateJobDetailsOutputSchema = z.object({
    isValid: z.boolean().describe("Whether the job details are valid."),
    reason: z.string().optional().describe("The reason why the job details are not valid."),
});

export const EnhanceDescriptionForAtsInputSchema = z.object({
    descriptionToEnhance: z.string().describe("The user's current description for a project or experience."),
    jobDescription: z.string().describe("The target job description for ATS optimization."),
});

export const EnhanceDescriptionForAtsOutputSchema = z.object({
    enhancedDescription: z.string().describe("The rewritten, ATS-optimized description."),
});

export const SuggestGeneralImprovementsInputSchema = z.object({
  descriptionToEnhance: z.string().describe("The user's current description for a project or experience."),
});

export const SuggestGeneralImprovementsOutputSchema = z.object({
    enhancedDescription: z.string().describe("The rewritten, generally improved description."),
});

export const GenerateVideoPromptInputSchema = z.object({
    role: z.string().describe("The job title or role."),
    company: z.string().describe("The company name."),
    description: z.string().describe("The description of the work experience or project."),
});

export const GenerateVideoPromptOutputSchema = z.object({
    scene: z.string().describe("A descriptive, visual scene for a video based on the input. This should be a few sentences long and set a clear visual context."),
    prompt: z.string().describe("A concise, action-oriented prompt suitable for a text-to-video AI model like Veo or Sora. This should be a single sentence, like 'Animate a character doing X' or 'Show a diagram of Y'."),
});

    