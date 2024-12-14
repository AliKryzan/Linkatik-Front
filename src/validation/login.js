import { z } from "zod"

export const loginSchema = z.object({
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
