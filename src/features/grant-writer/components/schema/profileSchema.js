import z from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Title is required"),
  degree: z.string().min(1, "Degree is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  yearsExperience: z.coerce.number().min(0, "Must be 0 or more"),
  grantsWon: z.coerce.number().min(0, "Must be 0 or more"),
  totalFunding: z.string().min(1, "Funding is required"),
  successRate: z.coerce.number().min(0).max(100, "Max 100%"),
  expertise: z.array(z.string()).min(1, "Add at least one expertise"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  minRate: z.coerce.number().min(0),
  maxRate: z.coerce.number().min(0),
  availability: z.string().min(1, "Select availability"),
  maxProjects: z.coerce.number().min(1, "Minimum 1 project"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
});
