import z from "zod";

export const profileSchema = z.object({
  institutionName: z.string().min(1, "Required"),
  department: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  website: z.string().url("Invalid URL"),
  description: z.string().min(1, "Required"),

  contactName: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),

  programs: z.array(z.string()).min(1, "Select at least one program"),
});