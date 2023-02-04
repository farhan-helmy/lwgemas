import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const salesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sale.findMany();
  }),
  getSales: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.sale.groupBy({
        by: ["date"],
        orderBy: {
          date: "asc",
        },
        _sum: {
          amount: true,
        },
        where: {
          type: {
            name: input.type,
          },
        },
      });
    }),
  getCashoutOnDate: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.sale.findMany({
        where: {
          date: {
            equals: new Date(input.date),
          },
          type: {
            name: "CASHOUT",
          },
        },
        include: {
          type: true,
          detail: true,
        },
      });
    }),
  storeAeon: publicProcedure
    .input(z.object({ amount: z.string(), date: z.string(), type: z.string(), detail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.type.upsert({
        where: {
          name: input.type,
        },
        update: {},
        create: {
          name: input.type,
        },
      });

      await ctx.prisma.detail.upsert({
        where: {
          name: input.detail,
        },
        update: {},
        create: {
          name: input.detail,
        },
      });

      const result = await ctx.prisma.sale.create({
        data: {
          amount: Number(input?.amount),
          date: new Date(input?.date),
          type: {
            connect: {
              name: "AEON",
            },
          },
          detail: {
            connect: {
              name: "AEON",
            },
          }
        },
      });

      return result;
    }
    ),
  storeCashout: publicProcedure
    .input(z.object({ amount: z.string(), date: z.string(), type: z.string(), detail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.type.upsert({
        where: {
          name: input.type,
        },
        update: {},
        create: {
          name: input.type,
        },
      });

      const result = await ctx.prisma.sale.create({
        data: {
          amount: Number(input?.amount),
          date: new Date(input?.date),
          type: {
            connect: {
              name: "CASHOUT",
            },
          },
          detail: {
            connect: {
              name: input.detail,
            },
          }
        },
      });

      return result;
    }
    ),
  storeDetail: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.detail.create({
        data: {
          name: input.name,
        },
      });

      return result;
    }),
  getDetails: publicProcedure
    .query(async ({ ctx }) => {
      const result = await ctx.prisma.detail.findMany();

      return result;
    }),
});
