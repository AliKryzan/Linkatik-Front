import { z } from "zod"

export const domainSchema = z.object({
  domain: z.string({ required_error: "required" }).min(1, "required").url({ message: "invalidUrl" }),
})
