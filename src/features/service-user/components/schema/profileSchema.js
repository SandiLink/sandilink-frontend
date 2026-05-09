import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),

  dob: z.string().optional(),
  gender: z.enum(["male", "female", "non-binary", "prefer-not"]).optional(),

  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),

  bio: z.string().optional(),

  ecName: z.string().optional(),
  ecRelation: z
    .enum(["spouse", "parent", "sibling", "child", "friend", "other"])
    .optional(),
  ecPhone: z.string().optional(),
  ecEmail: z.string().email().optional().or(z.literal("")),
});
