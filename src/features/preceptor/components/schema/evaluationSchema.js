import { z } from "zod";

export const evaluationSchema = z.object({
  evaluationType: z.string(),
  ratings: z.record(z.string().min(1, "Required")),
  strengths: z.string().min(1, "Required"),
  improvements: z.string().min(1, "Required"),
  comments: z.string().min(1, "Required"),
  recommendation: z.string().min(1, "Required"),
});