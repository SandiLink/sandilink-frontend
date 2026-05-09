import z from "zod";

export const notSchema = z.object({
  category: z.string().min(1, "Categroy is Required"),
  visibility: z.string().min(1, "Visibility isRequired"),
  note: z.string().min(1, "Note is Required"),
});
