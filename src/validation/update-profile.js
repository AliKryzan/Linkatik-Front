import { z } from "zod"

import { signUpSchema, userInfoSchema } from "./sign-up"

export const updateProfileSchema = signUpSchema.omit({ password: true }).merge(userInfoSchema)

export const updatePasswordSchema = z.object({
  current_password: z
    .string({ required_error: "required" })
    .min(1, { message: "required" })
    .min(8, { message: "short" })
    .max(32, { message: "long" }),
  new_password: z
    .string({ required_error: "required" })
    .min(1, { message: "required" })
    .min(8, { message: "short" })
    .max(32, { message: "long" }),
})
