import z from "zod";

export const availabilitySchema = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      enabled: z.boolean(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
  ),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  hoursPerWeek: z.string().min(1),
  shift: z.string().min(1),
});