
'use server';

/**
 * @fileOverview An AI agent that suggests how to integrate a missing keyword into a resume.
 * 
 * - getKeywordSuggestion - A function that returns a suggestion for a given keyword.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GetKeywordSuggestionInputSchema, GetKeywordSuggestionOutputSchema } from '@/lib/schemas';

type GetKeywordSuggestionInput = z.infer<typeof GetKeywordSuggestionInputSchema>;
type GetKeywordSuggestionOutput = z.infer<typeof GetKeywordSuggestionOutputSchema>;


export async function getKeywordSuggestion(
    input: GetKeywordSuggestionInput
): Promise<GetKeywordSuggestionOutput> {
    return getKeywordSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getKeywordSuggestionPrompt',
  input: { schema: GetKeywordSuggestionInputSchema },
  output: { schema: GetKeywordSuggestionOutputSchema },
  prompt: `You are an expert resume writer. The user is trying to improve their resume by including a specific keyword. 
Your task is to provide a concrete suggestion on how to naturally integrate this keyword into their resume.

The keyword to integrate is: "{{keyword}}"

The user's current resume is:
---
Summary:
{{{resume.summary}}}

Experience:
{{#each resume.experience}}
- Role: {{this.role}} at {{this.company}}
  Description: {{this.description}}
{{/each}}

Skills:
{{#each resume.skills}}
- {{this.name}}
{{/each}}
---

Provide a clear 'suggestion' on where and how to add the keyword. Also, provide a specific 'example' of the updated text.
For example, if the keyword is "Agile" and the user has a bullet point "- Managed projects", your example could be "- Managed projects using Agile methodologies to improve delivery time."
`,
});

const getKeywordSuggestionFlow = ai.defineFlow(
  {
    name: 'getKeywordSuggestionFlow',
    inputSchema: GetKeywordSuggestionInputSchema,
    outputSchema: GetKeywordSuggestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
