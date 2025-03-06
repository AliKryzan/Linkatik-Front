import { z } from "zod"

export const userInfoSchema = z.object({
  name: z
    .string({ required_error: "required" })
    .trim()
    .min(1, { message: "required" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "invalidName" }),
  interest_id: z
    .string({ required_error: "required" })
    .min(1, { message: "required" })
    .regex(/^\d+$/, { message: "invalidNumber" }),
  sub_interest_id: z.string().optional(),
})
export const signUpSchema = z.object({
  username: z
    .string({ required_error: "required" })
    .trim()
    .min(1, { message: "required" })
    .refine(
      (value) => !/\s/.test(value),
      { message: "usernameNoSpaces" }
    )
    .refine(
      (value) => /^[a-zA-Z0-9_-]*$/.test(value),
      { message: "usernameOnlyAllowed" }
    ),
  email: z
    .string({ required_error: "required" })
    .trim()
    .min(1, { message: "required" })
    .email({ message: "invalidEmail" }),
  password: z
    .string({ required_error: "required" })
    .min(1, { message: "required" })
    .min(8, { message: "short" })
    .max(32, { message: "long" }),
})

export const registerSchema = signUpSchema.merge(userInfoSchema)
