"use server";

import { suggestResumeImprovements } from "@/ai/flows/suggest-resume-improvements";

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
