import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Radio, Space, Stack, Text } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PutUpdateBlock } from "../../../../services/utils"
import { BioBlockPrioritizeSchema } from "../../../../validation/bio-block"

const animations = [
  {
    value: "bounce",
    label: "bounce",
  },
  {
    value: "pulse",
    label: "pulse",
  },
  {
    value: "shakex",
    label: "shake x",
  },
  {
    value: "tada",
    label: "tada",
  },
]
const BlockPrioritize = ({ block }) => {
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioBlockPrioritizeSchema),
    defaultValues: {
      type: block.priority?.type || "none",
      animation: block.priority?.animation,
    },
  })
  const { control, formState, handleSubmit, watch } = form

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.prioritize === "none") {
        await PutUpdateBlock({
          pageId: id,
          blockId: block.id,
          data: {
            type: block.type,
            priority: {
              is_enable: false,
            },
          },
        })
        return
      }
      await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          priority: {
            is_enable: true,
            ...data,
          },
        },
      })
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      form.setError("root", {
        message: error?.response?.data?.message || error?.response?.message || error.message,
      })
    }
  })

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit} p={"md"}>
      <div>
        <Text size="lg" fw={500}>
          {t("bioBlocks.tabs.prioritize.title")}
        </Text>
        <Text size="sm" c="gray.8">
          {t("bioBlocks.tabs.prioritize.description")}
        </Text>
      </div>

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Radio.Group
            {...field}
            onChange={(e) => {
              form.setValue("animation", "")
              field.onChange(e)
            }}
            error={
              formState.errors.type?.message &&
              t(`bioBlocks.tabs.prioritize.errors.${formState.errors.type?.message}`)
            }
            label={t("bioBlocks.tabs.prioritize.radio.label")}>
            <Stack gap={"xs"} mt={"sm"}>
              <Radio
                value="animation"
                description={t("bioBlocks.tabs.prioritize.radio.values.animation_d")}
                label={t("bioBlocks.tabs.prioritize.radio.values.animation")}
              />
              <Controller
                control={control}
                name="animation"
                render={({ field }) => (
                  <Radio.Group
                    error={
                      formState.errors.animation?.message &&
                      t(`bioBlocks.tabs.prioritize.errors.${formState.errors.animation?.message}`)
                    }
                    {...field}>
                    <Group grow>
                      {animations.map((element) => (
                        <Radio.Card
                          opacity={watch("type") === "animation" ? 1 : 0.5}
                          disabled={watch("type") !== "animation"}
                          className="animation-type-radio-root"
                          w={"fit-content"}
                          p="lg"
                          value={element.value}
                          key={element.value}>
                          <Text ta={"center"}>{element.label}</Text>
                        </Radio.Card>
                      ))}
                    </Group>
                  </Radio.Group>
                )}
              />
              <Radio
                value="spotlight"
                description={t("bioBlocks.tabs.prioritize.radio.values.spotlight_d")}
                label={t("bioBlocks.tabs.prioritize.radio.values.spotlight")}
              />
              <Radio value="none" label={t("bioBlocks.tabs.prioritize.radio.values.none")} />
            </Stack>
          </Radio.Group>
        )}
      />
      <Space />
      <Button loading={formState.isSubmitting} type="submit" radius={"xl"}>
        {t("bioBlocks.tabs.prioritize.button")}
      </Button>
      {formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root?.message}
        </Text>
      )}
      <DevTool control={control} />
    </Stack>
  )
}

export default BlockPrioritize
