import z from "zod";

export const submissionSchema = z.object({
  journal: z.string().min(1, "Please select a journal to continue"),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  articleType: z.string().min(1, "Please select an article type"),
  abstract: z.string().min(20, "Abstract must be at least 20 characters long"),
  keywords: z.array(z.string()).min(1, "Please add at least one keyword"),
  coverLetter: z.string().optional().refine((val) => !val || val.length >= 20,"Cover letter should be at least 20 characters if provided",),
});
    