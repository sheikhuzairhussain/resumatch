import type { FunctionDeclaration, FunctionDeclarationSchema } from "@google-cloud/vertexai";
import { zodToVertexSchema } from "@techery/zod-to-vertex-schema";
import { analysisResultSchema } from "./schema";

export const saveAnalysisResult = {
  name: "saveAnalysisResult",
  description:
    "Save the analysis result to the database. The analysis contains the criteria, overall score, overall comment, and final recommendation. This function must always be called.",
  parameters: zodToVertexSchema(analysisResultSchema) as FunctionDeclarationSchema,
} satisfies FunctionDeclaration;
