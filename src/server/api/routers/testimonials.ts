import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const testimonialsRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const testimonials = await ctx.db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      where: { deletedAt: null },
    });

    return testimonials;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const testimonial = await ctx.db.testimonial.findFirst({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });

      return testimonial;
    }),

  create: publicProcedure
    .input(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().min(1).optional(),
        company: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.testimonial.create({ data: input });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.testimonial.update({
        where: { id: input },
        data: { deletedAt: new Date() },
      });
    }),
});
