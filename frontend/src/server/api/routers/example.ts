import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  fetch: publicProcedure.input(z.string()).query(async ({ input }) => {
    const res = await fetch(`http://127.0.0.1:8000/${input}`);
    return res.json() as Promise<{
      hotels: {
        name: string;
      }[];
    }>;
  }),
});
