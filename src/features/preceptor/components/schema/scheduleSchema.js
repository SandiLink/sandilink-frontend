import z from "zod";

export const scheduleSchema = z.object({
  availability: z.array(
    z.object({
      day: z.string(),
      enabled: z.boolean(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
  ),
});