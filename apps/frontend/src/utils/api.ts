import type { AppRouter } from "@resumatch/api";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
export type { RouterInputs, RouterOutputs } from "@resumatch/api";
