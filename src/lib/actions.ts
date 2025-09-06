
"use server";

import { suggestResumeImprovements } from "@/ai/flows/suggest-resume-improvements";
import { generateTailoredResume } from "@/ai/flows/generate-tailored-resume";
import { analyzeResumeForAts } from "@/ai/flows/analyze-resume-for-ats";
import { getKeywordSuggestion } from "@/ai/flows/get-keyword-suggestion";
import { validateJobDetails } from "@/ai/flows/validate-job-details";
import { enhanceDescriptionForAts } from "@/ai/flows/enhance-description-for-ats";
import { GenerateTailoredResumeInput, type AnalyzeResumeForAtsInput, type GetKeywordSuggestionInput, type ValidateJobDetailsInput, type EnhanceDescriptionForAtsInput } from "./types";

export async function getAiSuggestions(resumeContent: string) {
  if (!resumeContent.trim()) {
    return { error: "Content is empty, cannot provide suggestions." };
  }
  
  try {
    const result = await suggestResumeImprovements({ resumeContent });
    return result;
  } catch (error) {
    console.error("AI suggestion error:", error);
    return { error: "Failed to get AI suggestions. Please try again later." };
  }
}

export async function generateTailoredResumeAction(input: GenerateTailoredResumeInput) {
  try {
    const result = await generateTailoredResume(input);
    return result;
  } catch (error) {
    console.error("AI tailoring error:", error);
    return { error: "Failed to generate tailored content. Please try again later." };
  }
}

export async function enhanceDescriptionAction(input: EnhanceDescriptionForAtsInput) {
    if (!input.descriptionToEnhance.trim()) {
        return { error: "Content is empty, cannot provide suggestions." };
    }
    if (!input.jobDescription.trim()) {
        return { error: "Job description is empty, cannot enhance content." };
    }

    try {
        const result = await enhanceDescriptionForAts(input);
        return result;
    } catch (error) {
        console.error("AI enhancement error:", error);
        return { error: "Failed to enhance description. Please try again." };
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
