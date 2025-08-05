import { z } from 'zod';

// Helper to generate UUID on the client
const generateId = () => (typeof window !== 'undefined' ? crypto.randomUUID() : Math.random().toString());

export const personalDetailsSchema = z.object({
  name: z.string().default('Your Name'),
  email: z.string().email({ message: "Invalid email address" }).or(z.literal('')).default('your.email@example.com'),
  phone: z.string().default('+1 (123) 456-7890'),
  location: z.string().default('City, State'),
  website: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
  linkedin: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
  github: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
});

export const experienceSchema = z.object({
  id: z.string().default(generateId),
  company: z.string().default('Company Name'),
  role: z.string().default('Job Title'),
  startDate: z.string().default('Month Year'),
  endDate: z.string().default('Present'),
  description: z.string().default('- Bullet point about your achievement.'),
});

export const educationSchema = z.object({
  id: z.string().default(generateId),
  institution: z.string().default('University Name'),
  degree: z.string().default('Degree and Major'),
  startDate: z.string().default('Month Year'),
endDate: z.string().default('Month Year'),
  description: z.string().default('- Relevant coursework or honors.'),
});

export const projectSchema = z.object({
    id: z.string().default(generateId),
    name: z.string().default('Project Title'),
    description: z.string().default('A brief description of your project.'),
    url: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default('')
});

export const skillSchema = z.object({
    id: z.string().default(generateId),
    name: z.string().default('A skill'),
});

export const resumeDataSchema = z.object({
  id: z.string(),
  name: z.string().default('Untitled Resume'),
  personalDetails: personalDetailsSchema.default({
    name: 'Your Name', email: 'your.email@example.com', phone: '+1 (123) 456-7890', location: 'City, State', website: '', linkedin: '', github: ''
  }),
  summary: z.string().default('A brief professional summary about yourself.'),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
});

export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
