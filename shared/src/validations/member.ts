import { DateTime } from "luxon";
import { z } from "zod";

export const userRoles = ["staff", "member"] as const;

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "profile.validation.fullName")
    .max(50, "profile.validation.fullName"),
  role: z.enum(userRoles, {
    required_error: "profile.validation.role",
    invalid_type_error: "profile.validation.role",
  }),
  dateOfBirthday: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || DateTime.fromISO(value).isValid,
      "profile.validation.dateOfBirthday"
    ),
});

export type MemberFormValues = z.infer<typeof profileSchema>;
