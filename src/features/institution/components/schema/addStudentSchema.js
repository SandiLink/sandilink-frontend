import z from "zod";

export const addStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  program: z.string().min(1, "Program is required"),
  year: z.string().min(1, "Year is required"),
});
