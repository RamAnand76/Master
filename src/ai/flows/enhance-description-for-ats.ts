
'use server';

/**
 * @fileOverview An AI agent that enhances a description for ATS optimization.
 *
 * - enhanceDescriptionForAts - A function that enhances a description based on a job description.
 * - EnhanceDescriptionForAtsInput - The input type for the enhanceDescriptionForAts function.
 * - EnhanceDescriptionForAtsOutput - The return type for the enhanceDescriptionForAts function.
 */

import {ai} from '@/ai/genkit';
import { EnhanceDescriptionForAtsInputSchema, EnhanceDescriptionForAtsOutputSchema, type EnhanceDescriptionForAtsInput, type EnhanceDescriptionForAtsOutput } from '@/lib/types';

export async function enhanceDescriptionForAts(
  input: EnhanceDescriptionForAtsInput
): Promise<EnhanceDescriptionForAtsOutput> {
  return enhanceDescriptionForAtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceDescriptionForAtsPrompt',
  input: {schema: EnhanceDescriptionForAtsInputSchema},
  output: {schema: EnhanceDescriptionForAtsOutputSchema},
  prompt: `You are an expert resume writer specializing in optimizing resume content for Applicant Tracking Systems (ATS).
Your task is to rewrite a given description (from a user's work experience or project) to align it perfectly with the provided job description.

Focus on the following:
1.  **Integrate Keywords:** Seamlessly weave in relevant keywords from the job description.
2.  **Use Action Verbs:** Start bullet points with strong, impactful action verbs.
3.  **Quantify Achievements:** Whenever possible, add metrics to demonstrate impact (e.g., "increased efficiency by 20%", "managed a team of 5"). If the user's description lacks numbers, you can suggest realistic placeholders like "[X]%" or "[Y] projects".
4.  **Maintain Professional Tone:** The output should be professional and concise.

**Job Description:**
\`\`\`
{{{jobDescription}}}
\`\`\`

**Original Description to Enhance:**
\`\`\`
{{{descriptionToEnhance}}}
\`\`\`

Rewrite the "Original Description" to be more impactful and ATS-friendly based on the "Job Description".
`,
});

const enhanceDescriptionForAtsFlow = ai.defineFlow(
  {
    name: 'enhanceDescriptionForAtsFlow',
    inputSchema: EnhanceDescriptionForAtsInputSchema,
    outputSchema: EnhanceDescriptionForAtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

