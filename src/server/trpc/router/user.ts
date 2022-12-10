import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
    updateUser: protectedProcedure.input(z.object({ tweet: z.string().nullish(), image64Base: z.string().nullish() }))
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user?.id;
            const { tweet, image64Base } = input;
            if (typeof tweet !== 'string' && typeof image64Base !== 'string') return {};
            const updateUser = await ctx.prisma.user.update({
                where: {
                    id: userId,
                }, data: {
                    //Type error solve this!
                    tweet: tweet,
                    cardImage: image64Base,
                }
            })
            return updateUser;
        })
});
