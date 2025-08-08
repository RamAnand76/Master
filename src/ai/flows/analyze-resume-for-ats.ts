'use server';

/**
 * @fileOverview An AI agent that analyzes a resume against a job description for ATS compatibility.
 * 
 * - analyzeResumeForAts - A function that analyzes the resume and returns an ATS score and feedback.
 * - AnalyzeResumeForAtsInput - The input type for the analyzeResumeForAts function.
 * - AnalyzeResumeForAtsOutput - The return type for the analyzeResumeForAts function.
 */

import { ai } from '@/ai/genkit';
import { AnalyzeResumeForAtsInputSchema, AnalyzeResumeForAtsOutputSchema, type AnalyzeResumeForAtsInput, type AnalyzeResumeForAtsOutput } from '@/lib/types';

export async function analyzeResumeForAts(
    input: AnalyzeResumeForAtsInput
): Promise<AnalyzeResumeForAtsOutput> {
    return analyzeResumeForAtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumeForAtsPrompt',
  input: { schema: AnalyzeResumeForAtsInputSchema },
  output: { schema: AnalyzeResumeForAtsOutputSchema },
  prompt: `You are an expert ATS (Applicant Tracking System) analyzer. Your task is to evaluate a resume against a given job description.

You must provide a score from 0 to 100, where 100 is a perfect match. The score should be based on:
1. Keyword Matching: How well do the skills, experience, and summary in the resume match the keywords in the job description?
2. Relevance: Is the experience described relevant to the job position?
3. Clarity and Impact: Is the language clear, concise, and action-oriented?

You must also provide a list of critical keywords that are present in the job description but are missing from the resume. Finally, provide a brief, actionable feedback summary on how to improve the score.

Job Description:
{{{jobDescription}}}

Resume Content:
---
Summary:
{{{resumeSummary}}}

Experience:
{{#each resumeExperience}}
- Role: {{this.role}} at {{this.company}}
  Description: {{this.description}}
{{/each}}

Skills:
{{#each resumeSkills}}
- {{this.name}}
{{/each}}
---
`,
});

const analyzeResumeForAtsFlow = ai.defineFlow(
  {
    name: 'analyzeResumeForAtsFlow',
    inputSchema: AnalyzeResumeForAtsInputSchema,
    outputSchema: AnalyzeResumeForAtsOutputSchema,
  },
  async input => {
    if (!input.jobDescription) {
        return {
            score: 0,
            feedback: "Add a job description to get an ATS analysis.",
            missingKeywords: [],
        }
    }
    const { output } = await prompt(input);
    return output!;
  }
);
