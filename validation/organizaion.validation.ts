import { z } from "zod";

const errorMessages = {
  name: {
    required: "Organization name is required",
    min: "Organization name must be at least 2 characters",
    max: "Organization name must be at most 100 characters",
  },
  slug: {
    required: "Slug is required",
    invalid: "Slug can contain lowercase letters, numbers and single hyphens (no leading/trailing hyphen)",
  },
};

// Slug regex: lowercase alphanumerics separated by single hyphens
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const organizaionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty({ message: errorMessages.name.required })
      .min(2, { message: errorMessages.name.min })
      .max(100, { message: errorMessages.name.max }),

    // Allow optional explicit slug; if absent we derive from name in a refinement step
    slug: z
      .string()
      .trim()
      .transform((v) => v.toLowerCase())
      .refine((v) => slugRegex.test(v), { message: errorMessages.slug.invalid }),
  })
  .superRefine((data, ctx) => {
    // Auto-generate slug if user passed empty string (e.g., UI sends "")
    if (!data.slug) {
      const generated = data.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      if (!generated || !slugRegex.test(generated)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
            path: ["slug"],
          message: errorMessages.slug.invalid,
        });
      } else {
        (data as any).slug = generated;
      }
    }
  });

export type OrganizationFormType = z.infer<typeof organizaionSchema>;

// Optional alias with corrected spelling
export { organizaionSchema as organizationSchema };