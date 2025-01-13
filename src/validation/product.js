import { z } from "zod"

export const defaultProductSchema = z.object({
  title: z.string({ required_error: "required" }).min(1, { message: "required" }),
  slug: z.string({ required_error: "required" }).min(1, { message: "required" }),
  description: z.string({ required_error: "required" }).min(1, { message: "required" }),
  long_description: z.string().optional(),
  image: z
    .instanceof(File)
    .optional()
    .refine((value) => !!value, {
      message: "required",
    }),
  pricing_type: z.enum(["free", "single_payment", "pay_what_you_want"], {
    required_error: "required",
  }),
})
export const updateProduct = z.object({
  title: z.string({ required_error: "required" }).min(1, { message: "required" }),
  description: z.string({ required_error: "required" }).min(1, { message: "required" }),
  long_description: z.string().optional(),
  image: z.string().or(z.instanceof(File).optional()),

  pricing_type: z.enum(["free", "single_payment", "pay_what_you_want"], {
    required_error: "required",
  }),
})

export const digitalProductSchema = z.object({
  digital_product_file: z
    .instanceof(File)
    .optional()
    .refine((value) => !!value, {
      message: "required",
    }),
})

export const bookingProductSchema = z.object({
  duration: z.string({ required_error: "required" }),
  next_days: z.string({ required_error: "required" }),
  time_slots: z.array(
    z.object({
      day: z.string(),
      start_time: z.string(),
      end_time: z.string(),
    }),
  ),
})

export const productPricingSchema = z.object({
  pricing_type: z.enum(["free", "single_payment", "pay_what_you_want"], {
    required_error: "required",
  }),
  price: z.coerce.number().optional(),
  sales_price: z.coerce.number().optional(),
  max_price: z.coerce.number().optional(),
  currency: z.string().optional(),
})

// .superRefine((data, ctx) => {
//   if (data.pricing_type === "pay_what_you_want") {
//     if (!data.sales_price) {
//       ctx.addIssue({
//         path: ["sales_price"],
//         message: "required",
//       })
//     }
//     if (!data.max_price) {
//       ctx.addIssue({
//         path: ["sales_price"],
//         message: "required",
//       })
//     }
//     if (!data.currency) {
//       ctx.addIssue({
//         path: ["currency"],
//         message: "required",
//       })
//     }
//   }

//   if (data.pricing_type === "single_payment") {
//     if (!data.value) {
//       ctx.addIssue({
//         path: ["price"],
//         message: "required",
//       })
//     }
//     if (!data.currency) {
//       ctx.addIssue({
//         path: ["currency"],
//         message: "required",
//       })
//     }
//   }
// })

export const productSchema = defaultProductSchema.merge(productPricingSchema)
export const updateProductSchema = updateProduct.merge(productPricingSchema)

export const buyProductSchema = z.object({
  name: z.string({ required_error: "required" }).min(1, { message: "required" }),
  email: z.string({ required_error: "required" }).email("invalidEmail"),
  price: z.coerce.string().optional(),
  payment_processors_id: z.coerce.number({ required_error: "required" }),
})
export const buyBookingProductSchema = buyProductSchema.merge(
  z.object({
    date: z.string({ required_error: "required" }).min(1, "required"),
    time_slot_id: z.coerce.string({ required_error: "required" }).min(1, "required"),
  }),
)
