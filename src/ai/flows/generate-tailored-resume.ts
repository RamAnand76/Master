
'use server';

/**
 * @fileOverview An AI agent that tailors resume content to a job description.
 *
 * - generateTailoredResume - A function that generates tailored resume content.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';
import { GenerateTailoredResumeInputSchema, GenerateTailoredResumeOutputSchema } from '@/lib/schemas';

type GenerateTailoredResumeInput = z.infer<typeof GenerateTailoredResumeInputSchema>;
type GenerateTailoredResumeOutput = z.infer<typeof GenerateTailoredResumeOutputSchema>;


export async function generateTailoredResume(
  input: GenerateTailoredResumeInput
): Promise<GenerateTailoredResumeOutput> {
  return generateTailoredResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredResumePrompt',
  input: {schema: GenerateTailoredResumeInputSchema},
  output: {schema: GenerateTailoredResumeOutputSchema},
  prompt: `You are an expert resume writer. Given the user's desired job position, company, and the job description, generate a tailored professional summary.

Job Position: {{{jobPosition}}}
Company: {{{company}}}
Job Description:
{{{jobDescription}}}

Generate a professional summary tailored to the job description.
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
    // Ensure experienceDescription is always an empty string as it's no longer generated.
    return { summary: output!.summary, experienceDescription: '' };
  }
);

    