
"use server";

import { z } from "zod";
import { generateTailoredResume } from "@/ai/flows/generate-tailored-resume";
import { analyzeResumeForAts } from "@/ai/flows/analyze-resume-for-ats";
import { getKeywordSuggestion } from "@/ai/flows/get-keyword-suggestion";
import { validateJobDetails } from "@/ai/flows/validate-job-details";
import { enhanceDescriptionForAts } from "@/ai/flows/enhance-description-for-ats";
import { suggestGeneralImprovements } from "@/ai/flows/suggest-general-improvements";
import { generateVideoPrompt } from "@/ai/flows/generate-video-prompt";
import { GenerateTailoredResumeInputSchema, AnalyzeResumeForAtsInputSchema, GetKeywordSuggestionInputSchema, ValidateJobDetailsInputSchema, EnhanceDescriptionForAtsInputSchema, SuggestGeneralImprovementsInputSchema, GenerateVideoPromptInputSchema } from "./schemas";

type GenerateTailoredResumeInput = z.infer<typeof GenerateTailoredResumeInputSchema>;
type AnalyzeResumeForAtsInput = z.infer<typeof AnalyzeResumeForAtsInputSchema>;
type GetKeywordSuggestionInput = z.infer<typeof GetKeywordSuggestionInputSchema>;
type ValidateJobDetailsInput = z.infer<typeof ValidateJobDetailsInputSchema>;
type EnhanceDescriptionForAtsInput = z.infer<typeof EnhanceDescriptionForAtsInputSchema>;
type SuggestGeneralImprovementsInput = z.infer<typeof SuggestGeneralImprovementsInputSchema>;
type GenerateVideoPromptInput = z.infer<typeof GenerateVideoPromptInputSchema>;


export async function generateTailoredResumeAction(input: GenerateTailoredResumeInput) {
  try {
    const result = await generateTailoredResume(input);
    return result;
  } catch (error) {
    console.error("AI tailoring error:", error);
    return { error: "Failed to generate tailored content. Please try again later." };
  }
}

export async function enhanceDescriptionAction(input: EnhanceDescriptionForAtsInput | SuggestGeneralImprovementsInput) {
    if (!input.descriptionToEnhance.trim()) {
        return { error: "Content is empty, cannot provide suggestions." };
    }

    // Check if jobDescription is provided and not empty
    if ('jobDescription' in input && input.jobDescription && input.jobDescription.trim()) {
        try {
            const result = await enhanceDescriptionForAts(input as EnhanceDescriptionForAtsInput);
            return result;
        } catch (error) {
            console.error("ATS enhancement error:", error);
            return { error: "Failed to enhance description for ATS. Please try again." };
        }
    } else {
        // Fallback to general improvements if no job description
        try {
            const result = await suggestGeneralImprovements(input as SuggestGeneralImprovementsInput);
            return result;
        } catch (error) {
            console.error("General enhancement error:", error);
            return { error: "Failed to suggest general improvements. Please try again." };
        }
    }
}

export async function analyzeResumeAction(input: AnalyzeResumeForAtsInput) {
    try {
        const result = await analyzeResumeForAts(input);
        return result;
    } catch (error) {
        console.error("ATS analysis error:", error);
        return { error: "Failed to analyze resume for ATS. Please try again later." };
    }
}

export async function getKeywordSuggestionAction(input: GetKeywordSuggestionInput) {
    try {
        const result = await getKeywordSuggestion(input);
        return result;
    } catch (error) {
        console.error("Keyword suggestion error:", error);
        return { error: "Failed to get keyword suggestion. Please try again later." };
    }
}

export async function validateJobDetailsAction(input: ValidateJobDetailsInput) {
    try {
        const result = await validateJobDetails(input);
        return result;
    } catch (error) {
        console.error("Job details validation error:", error);
        return { error: "Failed to validate job details. Please try again later." };
    }
}

export async function generateVideoPromptAction(input: GenerateVideoPromptInput) {
  try {
    const result = await generateVideoPrompt(input);
    return result;
  } catch (error) {
    console.error("Video prompt generation error:", error);
    return { error: "Failed to generate video prompt. Please try again later." };
  }
}

    