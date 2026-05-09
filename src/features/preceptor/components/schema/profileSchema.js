import z from "zod";

export const profileSchema =  z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  specialty: z.string().min(1, "Select a specialty"),
  experience: z.number({ invalid_type_error: "Enter valid number" }),
  clinic: z.string().min(1, "Clinic is required"),
  address: z.string().min(1, "Address is required"),
  maxStudents: z.number().min(1).max(10),
  acceptStudents: z.boolean(),
  programs: z.array(z.string()).min(1, "Select at least one program")
});