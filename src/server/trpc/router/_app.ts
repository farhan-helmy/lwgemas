import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { salesRouter } from "./sales";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  sale: salesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
