import { Button, Stack, Text } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PutUpdateBlock } from "@/services/utils"
import { convertDateStringsToDateObjects } from "@/utils/convert-date-strings-to-date-objects"
import LinkBehavior from "./link-behavior"
import { BlockSettingsLoader } from "./settings-loader"

const BlockSettings = ({ block }) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const queryClient = useQueryClient()

  // checking if block is a contact_form to validate it's selection
  const form = useForm({
    defaultValues:
      block.type === "product"
        ? { products: block.products }
        : { settings: convertDateStringsToDateObjects(block.settings) },
  })
  const { handleSubmit, control, formState, setError } = form
  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    if (
      block.type === "contact_form" &&
      Object.values(data.settings)
        .filter((e) => typeof e === "object")
        .filter((e) => {
          return e.enabled
        }).length === 0
    ) {
      setError("root", { message: t(`bioBlocks.createBlock.invalidSelection`) })
      return
    }

    if (
      (block.type === "image" || block.type === "video" || block.type === "audio" || block.type === "file") &&
      !data.settings.file_url
    ) {
      setError("root", { message: t(`bioBlocks.createBlock.fileRequired`) })
      return
    }
    try {
      const response = await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          settings: { ...data.settings },
          // for block of type product
          ...(data.products ? { products: data.products } : {}),
        },
      })
      queryClient.invalidateQueries({
        queryKey: ["bio-block-preview", block.id, id],
      })
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })
  return (
    <Stack p={"lg"} component={"form"} onSubmit={onSubmit} noValidate>
      <div>
        <Text size="lg" fw={500}>
          {t("bioBlocks.tabs.settings.title")}
        </Text>
        <Text size="sm" c="gray.8">
          {t("bioBlocks.tabs.settings.description")}
        </Text>
      </div>
      {block.link_behavior ? (
        <LinkBehavior blockLinkBehaviorOptions={block.link_behavior} control={control} />
      ) : null}
      <BlockSettingsLoader componentKey={block.type} form={form} block={block} />
      <Button loading={formState.isSubmitting} type="submit" radius={"xl"}>
        {t("bioBlocks.tabs.settings.form.button")}
      </Button>
      {formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root?.message}
        </Text>
      )}
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default BlockSettings
