'use server';

/**
 * @fileOverview An AI agent that tailors resume content to a job description.
 *
 * - generateTailoredResume - A function that generates tailored resume content.
 * - GenerateTailoredResumeInput - The input type for the generateTailoredResume function.
 * - GenerateTailoredResumeOutput - The return type for the generateTailoredResume function.
 */

import {ai} from '@/ai/genkit';
import { GenerateTailoredResumeInputSchema, GenerateTailoredResumeOutputSchema, type GenerateTailoredResumeInput, type GenerateTailoredResumeOutput } from '@/lib/types';


export async function generateTailoredResume(
  input: GenerateTailoredResumeInput
): Promise<GenerateTailoredResumeOutput> {
  return generateTailoredResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredResumePrompt',
  input: {schema: GenerateTailoredResumeInputSchema},
  output: {schema: GenerateTailoredResumeOutputSchema},
  prompt: `You are an expert resume writer. Given the user's desired job position, company, and the job description, generate a tailored professional summary and a set of impactful bullet points for their most recent experience.

Job Position: {{{jobPosition}}}
Company: {{{company}}}
Job Description:
{{{jobDescription}}}

Generate a professional summary and a description for the most recent experience, tailored to the job description. The experience description should be a series of bullet points, each starting with a hyphen.
`,
});

const generateTailoredResumeFlow = ai.defineFlow(
  {
    name: 'generateTailoredResumeFlow',
    inputSchema: GenerateTailoredResumeInputSchema,
    outputSchema: GenerateTailoredResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
