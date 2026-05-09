import z from "zod";


export const ProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  title: z.string(),
  degree: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  institution: z.string(),
  department: z.string(),
  position: z.string(),
  country: z.string(),
  city: z.string(),
  primaryField: z.string(),
  secondaryField: z.string(),
  orcid: z.string().optional(),
  scholar: z.string().optional(),
  summary: z.string(),
  website: z.string().optional(),
  researchgate: z.string().optional(),
  linkedin: z.string().optional(),
});