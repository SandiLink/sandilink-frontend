import { z } from "zod";

export const preferencesSchema = z.object({
  searchRadius: z.enum(["5", "10", "25", "50", "100", "any"]),
  defaultSort: z.enum([
    "relevance",
    "distance",
    "rating",
    "availability",
    "price-low",
    "price-high",
  ]),

  virtualOnly: z.boolean(),
  showAvailability: z.boolean(),

  visitType: z.enum(["no-preference", "virtual", "in-person"]),
  reminderTime: z.enum(["15m", "1h", "24h", "48h"]),

  autoConfirm: z.boolean(),
  calendarSync: z.boolean(),

  language: z.enum(["en", "es", "fr", "zh", "ar", "hi"]),

  contactEmail: z.boolean(),
  contactSms: z.boolean(),
  contactPhone: z.boolean(),
});