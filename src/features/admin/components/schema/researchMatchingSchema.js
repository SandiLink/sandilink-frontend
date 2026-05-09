import z from "zod";

export const researchMatchingSchema = z
  .object({
    weights: z.object({
      expertise: z.number(),
      deadline: z.number(),
      success: z.number(),
      location: z.number(),
      rating: z.number(),
    }),
    rules: z.object({
      auto: z.boolean(),
      writers: z.boolean(),
      journals: z.boolean(),
      cross: z.boolean(),
      international: z.boolean(),
      notify: z.boolean(),
    }),
    thresholds: z.object({
      minMatch: z.string(),
      minNotify: z.string(),
      maxMatches: z.string(),
    }),
  })
  .refine(
    (data) => {
      const total = Object.values(data.weights).reduce((s, v) => s + v, 0);
      return total === 100;
    },
    {
      message: "Weights must sum to 100%",
      path: ["weights"],
    },
  );