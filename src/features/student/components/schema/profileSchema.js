import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),

  institution: z.string().min(1, "Institution is required"),
  program: z.string().min(1, "Program is required"),
  year: z.string().min(1, "Year is required"),

  studentId: z.string().min(1, "Student ID is required"),
  graduation: z.string().min(1, "Graduation date required"),
  clinicalHours: z.coerce.number().min(1, "Required"),

  bio: z.string().min(10, "Bio should be at least 10 characters"),
});