import { useMemo, useState } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Space, Stack, Text } from "@mantine/core"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { BlocksWithLinkBehavior, NoURlBlocks } from "../../../config/bio-blocks"
import { useAddBlockMutation } from "../../../hooks/use-add-block-mutation"
import useValidURL from "../../../hooks/use-valid-url"
import { GetLinkDetections } from "../../../services/utils"
import { CloseBlockModal } from "../../../store/bio-block/bio-block-slice"
import {
  ContactDetailsSchema,
  ContactFormSchema,
  CountDownBlockSchema,
  CreateEmailCollectorBlockSchema,
  CreateHeaderBlockSchema,
  CreateInitialBioBlockSchema,
  CreateInitialBioBlockSchemaWithLinkBehavior,
  CreateSocialBlockSchema,
  CreateTextBlockSchema,
  DiscordBlockSchema,
} from "../../../validation/bio-block"

const pickSchema = (name) => {
  const defaultValues = {
    url: "",
    title: "",
  }

  name = BlocksWithLinkBehavior.find((e) => e === name) ? "link_behavior" : name

  switch (name) {
    case "link_behavior":
      return {
        schema: CreateInitialBioBlockSchemaWithLinkBehavior,
        defaultValues: {
          ...defaultValues,
          settings: {
            link_behavior: "target",
          },
        },
      }
    case "header":
      return {
        schema: CreateHeaderBlockSchema,
        defaultValues: {
          title: "",
          settings: {
            type: "large",
          },
        },
      }
    case "text_block":
      return {
        schema: CreateTextBlockSchema,
        defaultValues: {
          settings: {
            content: "",
          },
        },
      }
    case "socials":
      return {
        schema: CreateSocialBlockSchema,
        defaultValues: undefined,
      }
    case "image_slider":
      return {
        schema: undefined,
        defaultValues: {
          settings: {
            images: [],
          },
        },
      }
    case "file":
    case "image":
    case "audio":
    case "video":
    case "file":
      return {
        defaultValues: {
          settings: {
            file_url: "",
            file_name: "",
          },
        },
      }
    case "faq":
      return {
        defaultValues: {
          settings: {
            faqs: [
              {
                question: "",
                answer: "",
              },
            ],
          },
        },
      }
    case "divider":
      return {
        defaultValues: {
          settings: {
            margin_top: 0,
            margin_bottom: 0,
          },
        },
      }
    case "countdown":
      return {
        schema: CountDownBlockSchema,
        defaultValues: {
          settings: {
            end_date: "",
            theme: "dark",
          },
        },
      }
    case "contact_form":
      return {
        schema: ContactFormSchema,
        defaultValues: {
          title: "تواصل معي",
          settings: {
            name: {
              enabled: true,
              required: true,
            },
            email_from: {
              enabled: true,
              required: true,
            },
            phone: {
              enabled: true,
              required: true,
            },
            message: {
              enabled: true,
              required: true,
            },
            country: {
              enabled: true,
              required: true,
            },
            email_to: "",
            thank_you_message: "شكرا لتواصلك معنا",
          },
        },
      }
    case "discord":
      return {
        schema: DiscordBlockSchema,
        defaultValues: {
          url: "",
          title: "",
          settings: {
            channel_id: "",
            link_behavior: "target",
          },
        },
      }
    case "email_collector":
      return {
        schema: CreateEmailCollectorBlockSchema,
        defaultValues: {
          title: "",
        },
      }
    case "contact_details":
      return {
        schema: ContactDetailsSchema,
        defaultValues: {
          title: "",
          settings: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address_street: "",
          },
        },
      }
    case "product":
      return {
        defaultValues: {
          products: [],
        },
      }
    default:
      return {
        schema: CreateInitialBioBlockSchema,
        defaultValues: defaultValues,
      }
  }
}
const FormContext = ({ children }) => {
  const { t } = useTranslation()
  const { name } = useSelector((state) => state.bioBlock.block)
  console.log("🚀 ~ FormContext ~ name:", name)
  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(CloseBlockModal())
  }

  //handle form
  const { schema, defaultValues } = useMemo(() => pickSchema(name), [name]) //pickSchema(name)
  console.log("🚀 ~ FormContext ~ defaultValues:", defaultValues)

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  })
  const { handleSubmit, formState, control, setError, reset, setValue, getValues } = form
  console.log("🚀 ~ FormContext ~ formState:", formState.errors)

  // link behavior
  const [linkBehaviorOptions, setLinkBehaviorOptions] = useState([])
  //   checking type of link
  const { checkURL, status } = useValidURL({
    type: name,
    onError: () => setError("url", { message: "invalidUrl" }),
    onSuccess(data) {
      setError("url", "")
      if (!getValues("title")) {
        setValue("title", data.metadata?.["og:title"])
      }
      setLinkBehaviorOptions(data.settings?.link_behavior || [])
    },
  })

  //   check if block dose NOT have url
  const isNoURL = useMemo(() => !!NoURlBlocks.find((value) => name === value), [name])

  //   adding a new block mutation
  const { mutate, isPending } = useAddBlockMutation()

  const onSubmit = handleSubmit(async (data) => {
    try {
      let linkDetectResponse
      if (!isNoURL) {
        linkDetectResponse = await GetLinkDetections({ url: data.url })
        if (name === "link" ? linkDetectResponse.type : linkDetectResponse.type !== name) {
          setError("url", { message: "invalidUrl" })
          return
        }
      }
      const blockData = {
        type: name,
        image: linkDetectResponse?.metadata?.["og:image"] ?? null,
        ...data,
      }
      //   link behavior options are based here to be used in instant adding of the block
      mutate(
        { data: blockData, ...(linkBehaviorOptions.length === 0 ? {} : { linkBehaviorOptions }) },
        {
          onSuccess: () => {
            reset()
            onClose()
          },
          onError: (error) => {
            console.log("🚀 ~ onSubmit mutation ~ error:", error)
            setError("root", {
              message:
                error?.response?.data?.message ||
                error?.response?.message ||
                t("bioBlocks.createBlock.serverError"),
            })
          },
        },
      )
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", {
        message: t("bioBlocks.createBlock.serverError"),
      })
    }
  })

  return (
    <FormProvider {...form} checkURL={checkURL} status={status} linkBehaviorOptions={linkBehaviorOptions}>
      <Stack component={"form"} gap={"md"} noValidate onSubmit={onSubmit}>
        <Space />

        {children}
        <Space />
        <Button
          disabled={!isNoURL && status !== "success"}
          size="md"
          loading={formState.isSubmitting || isPending}
          type="submit">
          {t("bioBlocks.createBlock.createButton")}
        </Button>
        {formState.errors.root?.message && (
          <Text c={"red"} size="xs" ta={"center"}>
            {formState.errors.root?.message}
          </Text>
        )}
      </Stack>
      <DevTool control={control} />
    </FormProvider>
  )
}

export default FormContext
