import type { Part } from "@google-cloud/vertexai";
import { generateResponse } from "../../lib/woolf-gemini";
import { MAX_ATTEMPTS, RETRY_DELAY } from "./constants";
import { analysisResultSchema } from "./schema";
import { saveAnalysisResult } from "./tools";

const SYSTEM_INSTRUCTION = `
  You are a helpful assistant that checks if a resume is a good fit for a job description.
  ALWAYS call the saveAnalysisResult function to save the response.
  DO NOT RETURN ANYTHING ELSE.
  I REPEAT, DO NOT RETURN ANYTHING ELSE.
`;

const USER_PROMPT = `
  Check if the resume is a good fit for the job description.
  Give a detailed analysis of the resume and the job description.
  Always call the saveAnalysisResult function to save the response.
  Do not return anything else.
`;

type AnalyzeResumeInput = {
  resumePdf: string;
  jobDescriptionPdf: string;
};

export const analyzeResume = async ({ resumePdf, jobDescriptionPdf }: AnalyzeResumeInput) => {
  const resumePart = {
    inlineData: {
      mimeType: "application/pdf",
      data: resumePdf,
    },
  } satisfies Part;

  const jobDescriptionPart = {
    inlineData: {
      mimeType: "application/pdf",
      data: jobDescriptionPdf,
    },
  } satisfies Part;

  const userPromptPart = {
    text: USER_PROMPT,
  } satisfies Part;

  /**
   * TODO: Add a retry mechanism with exponential backoff.
   */
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      const response = await generateResponse({
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [saveAnalysisResult] }],
        contents: [
          {
            role: "user",
            parts: [resumePart, jobDescriptionPart, userPromptPart],
          },
        ],
      });

      if (response?.functionCall?.name === "saveAnalysisResult") {
        return analysisResultSchema.parse(response.functionCall.args);
      }
    } catch (_) {
      // TODO: Log the error
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  throw new Error("Failed to analyze resume.");
};
