
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
  prompt: `You are a highly-critical ATS (Applicant Tracking System) used by a FAANG company (like Google, Amazon, Meta). Your purpose is to score a candidate's resume against a specific job description with extremely high standards.

You must provide a score from 0 to 100. A high score is rare and should only be given to exceptional candidates who are a near-perfect fit.

Your scoring rubric is as follows:
1.  **Keyword & Skill Alignment (30 points):** How well do the skills and technologies in the resume match the job description? Are they just listed or demonstrated in practice?
2.  **Experience Relevance & Depth (40 points):** Is the work experience directly relevant to the role? Does the candidate show a history of increasing responsibility? A resume with no relevant experience should score very low in this category.
3.  **Impact & Quantification (30 points):** This is critical. Does the candidate use strong action verbs? Do they quantify their achievements with metrics (e.g., "Increased performance by 20%", "Managed a budget of $5M")? Resumes that only list responsibilities without showing impact must be scored harshly.

A candidate with only a summary and no experience should receive a score below 15, as they lack the most critical component.

You must also provide:
- A list of critical keywords present in the job description that are also found in the resume (matchingKeywords).
- A list of critical keywords from the job description that are missing from the resume (missingKeywords).
- A brief, direct, and actionable feedback summary on what the candidate *must* do to improve their score. Be blunt and professional.

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
    const isResumeEmpty = !input.resumeSummary && input.resumeExperience.length === 0 && input.resumeSkills.length === 0;

    if (!input.jobDescription || isResumeEmpty) {
        return {
            score: 0,
            feedback: "Add a job description and fill out your resume to get an ATS analysis.",
            missingKeywords: [],
            matchingKeywords: [],
        }
    }
    const { output } = await prompt(input);
    return output!;
  }
);
