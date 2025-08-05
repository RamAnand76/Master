'use server';

/**
 * @fileOverview An AI agent that suggests improvements to resume content.
 *
 * - suggestResumeImprovements - A function that suggests improvements to resume content.
 * - SuggestResumeImprovementsInput - The input type for the suggestResumeImprovements function.
 * - SuggestResumeImprovementsOutput - The return type for the suggestResumeImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResumeImprovementsInputSchema = z.object({
  resumeContent: z.string().describe('The content of the resume to be improved.'),
});
export type SuggestResumeImprovementsInput = z.infer<typeof SuggestResumeImprovementsInputSchema>;

const SuggestResumeImprovementsOutputSchema = z.object({
  improvedContent: z.string().describe('The improved content of the resume with suggestions.'),
  explanation: z.string().describe('An explanation of the changes made and why they were suggested.'),
});
export type SuggestResumeImprovementsOutput = z.infer<typeof SuggestResumeImprovementsOutputSchema>;

export async function suggestResumeImprovements(
  input: SuggestResumeImprovementsInput
): Promise<SuggestResumeImprovementsOutput> {
  return suggestResumeImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeImprovementsPrompt',
  input: {schema: SuggestResumeImprovementsInputSchema},
  output: {schema: SuggestResumeImprovementsOutputSchema},
  prompt: `You are an AI resume expert. Review the following resume content and provide suggestions for improvements, focusing on clarity, keywords, and impact. Explain the changes you made and why they were suggested.

Resume Content:
{{{resumeContent}}}

Respond with improvedContent and explanation. Make sure improvedContent is a valid resume.
`,
});

const suggestResumeImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestResumeImprovementsFlow',
    inputSchema: SuggestResumeImprovementsInputSchema,
    outputSchema: SuggestResumeImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
