import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllGiftSelections, saveGiftSelection, removeGiftSelection } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  gifts: router({
    getSelections: publicProcedure.query(async () => {
      return await getAllGiftSelections();
    }),
    saveSelection: publicProcedure
      .input(
        z.object({
          giftId: z.string(),
          giftName: z.string(),
          selectedBy: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        return await saveGiftSelection({
          giftId: input.giftId,
          giftName: input.giftName,
          selectedBy: input.selectedBy,
        });
      }),
    removeSelection: publicProcedure
      .input(z.object({ giftId: z.string() }))
      .mutation(async ({ input }) => {
        return await removeGiftSelection(input.giftId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
