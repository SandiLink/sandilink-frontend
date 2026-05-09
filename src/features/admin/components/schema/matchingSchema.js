import z from "zod";

export const matchingSchema = z.object({
  specialtyWeight: z.array(z.number()),
  distanceWeight: z.array(z.number()),
  ratingWeight: z.array(z.number()),
  availabilityWeight: z.array(z.number()),
  maxDistance: z.string(),
  minRating: z.string(),
  matchThreshold: z.string(),
}).refine((data) => {
  const total =
    data.specialtyWeight[0] +
    data.distanceWeight[0] +
    data.ratingWeight[0] +
    data.availabilityWeight[0];
  return total === 100;
}, {
  message: "Total weight must equal 100%",
  path: ["specialtyWeight"],
});