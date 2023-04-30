import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const recipeRouter = createTRPCRouter({
  recipes: publicProcedure.query(async ({ input }) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      recipes: await prisma.recipe.findMany(),
    };
  }),
  recipe: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
      });

      // Define the regular expression pattern with capture groups
      const pattern = /(\d+) (\w+) of (\w+)/gi;

      // Loop through all matches of the pattern in the text
      const ingredients: { qty: string; unit: string; ingredient: string }[] =
        [];
      let match;
      while ((match = pattern.exec(recipe?.instructions ?? "")) !== null) {
        // Extract all capture groups using array destructuring
        const [, qty, unit, ingredient] = match;
        ingredients.push({ qty: qty!, unit: unit!, ingredient: ingredient! });
      }

      return {
        ...recipe,
        ingredients: ingredients,
      };
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.recipe.delete({ where: { id: input.id } });
      return {
        success: true,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        instructions: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.recipe.create({
        data: {
          name: input.name,
          instructions: input.instructions,
        },
      });

      return {
        success: true,
      };
    }),
});
