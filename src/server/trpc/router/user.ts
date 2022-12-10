import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
    updateUser: publicProcedure.input(z.object({ tweet: z.string().nullish(), image64Base: z.string().nullish() }).nullish())
        .mutation(({ input }) => {
            return input;
        })
});
