import { z } from "zod"

export const BlankBioBaPageSchema = z.object({
  path: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, { message: "invalidPath" })
    .optional(),
  bio_page_theme_id: z.number().min(1, "required"),
  style: z.enum(["buttons", "blocks"], { required_error: "required" }),
})

export const BioPageProfileSchema = z.object({
  title: z.string({ required_error: "required" }).min(1, "required"),
  bio: z.string({ required_error: "required" }).min(1, "required"),
  image: z.string().nullable(),
})
