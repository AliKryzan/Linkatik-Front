import { z } from "zod"

export const CreateInitialBioBlockSchema = z.object({
  url: z.string({ required_error: "required" }).min(1, "required").url("invalidUrl"),
  title: z.string({ required_error: "required" }).optional(),
})

// export const CreateInitialBioBlockSchemaWithLinkBehavior = CreateInitialBioBlockSchema.extend({
//   link_behavior: z.string({ required_error: "required" }).min(1, "required"),
// })

export const CreateInitialBioBlockSchemaWithLinkBehavior = CreateInitialBioBlockSchema.extend({
  settings: z.object({
    link_behavior: z.string({ required_error: "required" }).min(1, "required"),
  }),
})
export const DiscordBlockSchema = CreateInitialBioBlockSchema.extend({
  settings: z.object({
    link_behavior: z.string({ required_error: "required" }).min(1, "required"),
    channel_id: z.string({ required_error: "required" }).min(1, "required"),
  }),
})

export const CountDownBlockSchema = z.object({
  settings: z.object({
    end_date: z.date({ message: "invalidDate", required_error: "required" }),
    theme: z.enum(["light", "dark"], { required_error: "required" }),
  }),
})

export const CreateTextBlockSchema = z.object({
  settings: z.object({
    content: z.string({ required_error: "required" }).min(1, "required"),
  }),
})
export const ContactFormSchema = z.object({
  title: z.string({ required_error: "required" }).min(1, "required"),
  settings: z
    .object({
      thank_you_message: z.string({ required_error: "required" }).min(1, "required"),
      name: z.object({
        enabled: z.boolean(),
        required: z.boolean(),
      }),
      email_from: z.object({
        enabled: z.boolean(),
        required: z.boolean(),
      }),
      phone: z.object({
        enabled: z.boolean(),
        required: z.boolean(),
      }),
      message: z.object({
        enabled: z.boolean(),
        required: z.boolean(),
      }),
      country: z.object({
        enabled: z.boolean(),
        required: z.boolean(),
      }),
      email_to: z.string({ required_error: "required" }).email({ message: "invalidEmail" }),
    })
    .refine(
      (obj) => {
        if (
          !obj.name.enabled &&
          !obj.email_from.enabled &&
          !obj.phone.enabled &&
          !obj.country.enabled &&
          !obj.message.enabled
        ) {
          return false
        }
        return true
      },
      {
        path: ["settings_root"],
        message: "invalidSelection",
      },
    ),
})
export const ContactDetailsSchema = z.object({
  title: z.string({ required_error: "required" }).min(1, "required"),
  settings: z.object({
    first_name: z.string({ required_error: "required" }).min(1, { message: "required" }),
    last_name: z.string({ required_error: "required" }).min(1, { message: "required" }),
    email: z.string({ required_error: "required" }).email({ message: "invalidEmail" }),
    phone: z.string().regex(/^\d+$/, { message: "invalidNumber" }),
    address_street: z.string({ required_error: "required" }).min(1, { message: "required" }),
  }),
})

export const CreateSocialBlockSchema = z.object({
  settings: z
    .object({
      email: z.string().email({ message: "invalidEmail" }),
      phone: z.string().regex(/^\d+$/, { message: "invalidNumber" }),
      whatsapp: z.string().url("invalidUrl"),
      telegram: z.string().url("invalidUrl"),
      linkedin: z.string().url("invalidUrl"),
      facebook: z.string().url("invalidUrl"),
      twitter: z.string().url("invalidUrl"),
      instagram: z.string().url("invalidUrl"),
      youtube: z.string().url("invalidUrl"),
    })
    .partial(),
})
export const CreateEmailCollectorBlockSchema = z.object({
  title: z.string().min(1, { message: "required" }),
})

export const CreateHeaderBlockSchema = z.object({
  title: z.string({ required_error: "required" }).min(1, "required"),
  settings: z.object({
    type: z.enum(["large", "medium", "small"]),
  }),
})

export const CreateFaqsBlockSchema = z.object({
  settings: {
    faqs: z.array(
      z.object({
        question: z.string({ required_error: "required" }).min(1, "required"),
        answer: z.string({ required_error: "required" }).min(1, "required"),
      }),
    ),
  },
})

export const BioBlockRedirectSchema = z.object({
  expired_at: z.date({ message: "invalidDate", required_error: "required" }),
  // timezone: z.string({ required_error: "required" }),
})
export const BioBlockScheduleSchema = z.object({
  start_date: z.date({ message: "invalidDate", required_error: "required" }),
  end_date: z.date({ message: "invalidDate", required_error: "required" }),
  // timezone: z.string({ required_error: "required" }),
})

export const BioBlockPrioritizeSchema = z
  .object({
    type: z.enum(["none", "animation", "spotlight"]),
    animation: z.string().optional(),
  })
  .refine(
    (obj) => {
      if (obj.type === "animation" && !obj.animation) {
        return false
      }
      return true
    },
    {
      message: "required",
      path: ["animation"],
    },
  )
export const BioBlockLockSchema = z
  .object({
    show_with_code: z.boolean().optional(),
    show_with_birthday: z.boolean().optional(),
    show_with_subscribe: z.boolean().optional(),
    show_with_sensitive_content: z.boolean().optional(),
    birthday_year: z.string().optional(),
    code_confirmation: z
      .string()
      .regex(/^[0-9]*$/, { message: "invalidCode" })
      .optional(),
  })
  .refine(
    (obj) => {
      if (obj.show_with_birthday && !obj.birthday_year) {
        return false
      }
      return true
    },
    {
      message: "required",
      path: ["birthday_year"],
    },
  )
  .refine(
    (obj) => {
      if (obj.show_with_code && obj.code_confirmation.length < 4) {
        return false
      }
      return true
    },
    {
      message: "required",
      path: ["code_confirmation"],
    },
  )
