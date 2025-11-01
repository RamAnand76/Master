
'use server';

/**
 * @fileOverview An AI agent that suggests general improvements to a description.
 *
 * - suggestGeneralImprovements - A function that enhances a description without a job description.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';
import { SuggestGeneralImprovementsInputSchema, SuggestGeneralImprovementsOutputSchema } from '@/lib/schemas';

type SuggestGeneralImprovementsInput = z.infer<typeof SuggestGeneralImprovementsInputSchema>;
type SuggestGeneralImprovementsOutput = z.infer<typeof SuggestGeneralImprovementsOutputSchema>;


export async function suggestGeneralImprovements(
  input: SuggestGeneralImprovementsInput
): Promise<SuggestGeneralImprovementsOutput> {
  return suggestGeneralImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGeneralImprovementsPrompt',
  input: {schema: SuggestGeneralImprovementsInputSchema},
  output: {schema: SuggestGeneralImprovementsOutputSchema},
  prompt: `You are an expert resume writer. Your task is to rewrite a given description (from a user's work experience, project, or summary) to be more impactful and professional.

Focus on the following, without needing a specific job description:
1.  **Use Strong Action Verbs:** Start bullet points with dynamic action verbs.
2.  **Quantify Achievements:** Where possible, add metrics to show impact (e.g., "increased efficiency by [X]%", "managed [Y] projects"). If no numbers are present, you can suggest placeholders.
3.  **Improve Clarity and Conciseness:** Make the language clear, professional, and easy to read.

**Original Description to Improve:**
\`\`\`
{{{descriptionToEnhance}}}
\`\`\`

Rewrite the "Original Description". The rewritten description should be a series of bullet points, each starting with a hyphen.
`,
});

const suggestGeneralImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestGeneralImprovementsFlow',
    inputSchema: SuggestGeneralImprovementsInputSchema,
    outputSchema: SuggestGeneralImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
