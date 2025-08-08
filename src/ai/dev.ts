import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-resume-improvements.ts';
import '@/ai/flows/generate-tailored-resume.ts';
import '@/ai/flows/analyze-resume-for-ats.ts';
import '@/ai/flows/get-keyword-suggestion.ts';
