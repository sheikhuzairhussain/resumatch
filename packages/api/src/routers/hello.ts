import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  sayHello: publicProcedure.query(async () => "Hello World"),
});
