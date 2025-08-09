
'use server';

/**
 * @fileOverview An AI agent that validates job details.
 * 
 * - validateJobDetails - A function that validates the job details.
 * - ValidateJobDetailsInput - The input type for the validateJobDetails function.
 * - ValidateJobDetailsOutput - The return type for the validateJobDetails function.
 */

import { ai } from '@/ai/genkit';
import { ValidateJobDetailsInputSchema, ValidateJobDetailsOutputSchema, type ValidateJobDetailsInput, type ValidateJobDetailsOutput } from '@/lib/types';

export async function validateJobDetails(
    input: ValidateJobDetailsInput
): Promise<ValidateJobDetailsOutput> {
    return validateJobDetailsFlow(input);
}

const prompt = ai.definePrompt({
    name: 'validateJobDetailsPrompt',
    input: { schema: ValidateJobDetailsInputSchema },
    output: { schema: ValidateJobDetailsOutputSchema },
    prompt: `You are an expert hiring manager. Your task is to validate the provided job title and company name.
    
    Job Title: "{{jobPosition}}"
    Company: "{{company}}"

    - Check if the company name is a real, known company.
    - Check if the job title is a plausible, real-world job title.
    
    If both seem legitimate, set isValid to true. If either appears to be gibberish, fake, or nonsensical, set isValid to false and provide a brief reason.
    `,
});

const validateJobDetailsFlow = ai.defineFlow(
    {
        name: 'validateJobDetailsFlow',
        inputSchema: ValidateJobDetailsInputSchema,
        outputSchema: ValidateJobDetailsOutputSchema,
    },
    async (input) => {
        if (!input.jobPosition && !input.company) {
            return { isValid: true }; // Nothing to validate
        }
        const { output } = await prompt(input);
        return output!;
    }
);
