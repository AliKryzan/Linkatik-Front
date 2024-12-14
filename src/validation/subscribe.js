import { z } from "zod"

export const subscribeSchema = z.object({
  name: z
    .string({ required_error: "required" })
    .trim()
    .min(1, { message: "required" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "invalidName" }),
  email: z
    .string({ required_error: "required" })
    .trim()
    .min(1, { message: "required" })
    .email({ message: "invalidEmail" }),
})
