import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { AnalyzeResume } from "@/features/analyze-resume";
import { api } from "@/utils/api";
import { env } from "@/utils/env";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: env.VITE_API_URL,
          transformer: superjson,
        }),
      ],
    }),
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AnalyzeResume />
      </QueryClientProvider>
    </api.Provider>
  );
}
