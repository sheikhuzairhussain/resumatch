import type { GenerateContentRequest, GenerateContentResponse } from "@google-cloud/vertexai";
import { env } from "../../utils/env";

export const generateResponse = async (request: GenerateContentRequest) => {
  const response = await fetch("https://intertest.woolf.engineering/invoke", {
    method: "POST",
    headers: {
      Authorization: env.AUTHORIZATION_TOKEN,
    },
    body: JSON.stringify(request),
  });
  const data = (await response.json()) as GenerateContentResponse;
  return data.candidates?.[0]?.content.parts[0];
};
