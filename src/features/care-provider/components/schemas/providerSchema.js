import { z } from "zod";
import { localizedString } from "@/lib/localized-schema";

export const providerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  title: z.string(),

  // Multi-select specialties from the admin-managed SPECIALTIES catalog. At
  // least one must be picked so providers always surface in directory facets.
  specialtyIds: z.array(z.string()).min(1, "Pick at least one specialty"),

  // Multi-select credentials from the CREDENTIALS catalog. Optional — some
  // categories (e.g. wellness coaches) carry no licensure.
  credentialIds: z.array(z.string()).default([]),

  // Multi-select delivery modes from the DELIVERY_MODES catalog. At least one.
  deliveryModeIds: z.array(z.string()).min(1, "Pick at least one delivery mode"),

  // Multi-locale bio: required in the default language (≥10 chars), optional
  // in every other configured locale.
  bio: localizedString({ minLength: 10 }),

  // Provider-defined services. `typeId` references the SERVICE_TYPES catalog;
  // `customName` is only used when the picked service type has
  // `customAllowed: true` and is bounded by the type's `customMaxLength`.
  services: z
    .array(
      z.object({
        typeId: z.string().min(1, "Pick a service type"),
        customName: z.string().optional().default(""),
        description: localizedString({ minLength: 5 }),
      }),
    )
    .default([]),

  virtualRate: z.coerce.number().min(0),
  inPersonRate: z.coerce.number().min(0),

  acceptPatients: z.boolean(),

  duration: z.string(),
  buffer: z.string(),

  bankName: z.string().min(1, "Bank name required"),
  accountNumber: z.string().min(4),
  routingNumber: z.string().min(4),
  payoutFrequency: z.string(),
});
