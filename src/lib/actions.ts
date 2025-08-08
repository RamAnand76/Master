"use server";

import { suggestResumeImprovements } from "@/ai/flows/suggest-resume-improvements";
import { generateTailoredResume } from "@/ai/flows/generate-tailored-resume";
import { analyzeResumeForAts } from "@/ai/flows/analyze-resume-for-ats";
import { GenerateTailoredResumeInput, type AnalyzeResumeForAtsInput } from "./types";

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

export async function analyzeResumeAction(input: AnalyzeResumeForAtsInput) {
    try {
        const result = await analyzeResumeForAts(input);
        return result;
    } catch (error) {
        console.error("ATS analysis error:", error);
        return { error: "Failed to analyze resume for ATS. Please try again later." };
    }
}
