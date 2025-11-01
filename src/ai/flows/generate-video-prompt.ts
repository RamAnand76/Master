
'use server';

/**
 * @fileOverview An AI agent that generates a video prompt from a resume experience.
 * 
 * - generateVideoPrompt - A function that returns a scene and a prompt for video generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateVideoPromptInputSchema, GenerateVideoPromptOutputSchema } from '@/lib/schemas';

type GenerateVideoPromptInput = z.infer<typeof GenerateVideoPromptInputSchema>;
type GenerateVideoPromptOutput = z.infer<typeof GenerateVideoPromptOutputSchema>;


export async function generateVideoPrompt(
    input: GenerateVideoPromptInput
): Promise<GenerateVideoPromptOutput> {
    return generateVideoPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoPrompt',
  input: { schema: GenerateVideoPromptInputSchema },
  output: { schema: GenerateVideoPromptOutputSchema },
  prompt: `You are a creative director specializing in creating compelling visuals for professional achievements.
Your task is to generate a short, visually engaging video concept based on a user's work experience.

You will create two things:
1.  **Scene**: A short paragraph describing a visual scene. This should be cinematic and metaphorical. For example, for "optimized a database," you might describe a chaotic library being neatly organized.
2.  **Prompt**: A concise, direct instruction for a text-to-video AI model like Google Veo or Sora. This should be a single, actionable sentence.

User's Experience:
- Role: {{{role}}}
- Company: {{{company}}}
- Description: {{{description}}}

Generate the 'scene' and 'prompt' based on this information.
`,
});

const generateVideoPromptFlow = ai.defineFlow(
  {
    name: 'generateVideoPromptFlow',
    inputSchema: GenerateVideoPromptInputSchema,
    outputSchema: GenerateVideoPromptOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
