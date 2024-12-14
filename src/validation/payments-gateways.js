import { z } from "zod"

export const AddPaymentGatewaySchema = z.object({
  name: z.string({ required_error: "required" }).min(1, "required"),
  processor: z.string({ required_error: "required" }).min(1, "required"),
  is_active: z.boolean(),
  settings: z.object({
    mode: z.enum(["test", "live"], { required_error: "required" }),
    client_id: z.string({ required_error: "required" }).min(1, { message: "required" }),
    secret: z.string({ required_error: "required" }).min(1, { message: "required" }),
  }),
})
