import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { analyzeResume } from "../workflows/analyze-resume/analyze-resume";
import { base64Pdf } from "../workflows/analyze-resume/schema";

export const aiRouter = createTRPCRouter({
  analyzeResume: publicProcedure
    .input(
      z.object({
        resumePdf: base64Pdf,
        jobDescriptionPdf: base64Pdf,
      }),
    )
    .mutation(async ({ input }) => await analyzeResume(input)),
});
