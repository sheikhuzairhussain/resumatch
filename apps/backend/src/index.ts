import { appRouter } from "@resumatch/api";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const PORT = 8000;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(PORT).on("listening", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
