import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Space, Stack, Text } from "@mantine/core"
import Countdown from "react-countdown"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PutUpdateBlock } from "@/services/utils"
import { BioBlockRedirectSchema } from "@/validation/bio-block"
import CustomDateTimePicker from "../../../ui/custom-date-time-picker"

// import CustomSelect from "../../../ui/custom-select"

const RedirectForm = ({ block }) => {
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioBlockRedirectSchema),
    defaultValues: {
      expired_at: new Date(block?.redirect?.expired_at || new Date()),
      // timezone: block.redirect?.timezone,
    },
  })
  const { handleSubmit, control, formState, watch, setError } = form
  const onSubmit = handleSubmit(async (data) => {
    try {
      data = {
        ...data,
        expired_at: new Date(data.expired_at).toGMTString(),
      }
      await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          redirect: { ...data, is_enable: true },
        },
      })
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", {
        message: error?.response?.data?.message || error?.response?.message || error.message,
      })
    }
  })
  return (
    <Stack p={"lg"} component={"form"} onSubmit={onSubmit} noValidate>
      <Text c="gray.8">{t("bioBlocks.tabs.redirect.form.description")}</Text>
      <Space />
      <Text
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        lh={"30px"}
        fz={"45px"}
        ta={"center"}>
        <Countdown key={watch("expired_at")} date={watch("expired_at")} oPadDays={2} zeroPadTime={2}>
          <Text>{t("bioBlocks.tabs.redirect.form.countdown")}</Text>
        </Countdown>
      </Text>
      <Group gap={"xl"} dir="ltr" justify="center" ta={"center"}>
        <Text>DAY</Text>
        <Text>HOUR</Text>
        <Text>MIN</Text>
        <Text>SEC</Text>
      </Group>

      <Group grow>
        <Controller
          control={control}
          name="expired_at"
          render={({ field }) => (
            <CustomDateTimePicker
              minDate={new Date()}
              variant="filled"
              label={t("bioBlocks.tabs.redirect.form.expired_at")}
              error={
                formState.errors.expired_at?.message &&
                t(`bioBlocks.tabs.redirect.form.errors.${formState.errors.expired_at?.message}`)
              }
              {...field}
            />
          )}
        />

        {/* <Controller
          control={control}
          name={"timezone"}
          render={({ field }) => (
            <CustomSelect
              label={t("bioBlocks.tabs.redirect.form.timezone")}
              error={
                formState.errors.timezone?.message &&
                t(`bioBlocks.tabs.redirect.form.errors.${formState.errors.timezone?.message}`)
              }
              data={["GMT", "UTC"]}
              {...field}
            />
          )}
        /> */}
      </Group>

      <Button loading={formState.isSubmitting} type="submit" radius={"xl"}>
        {t("bioBlocks.tabs.redirect.form.button")}
      </Button>
      {formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root?.message}
        </Text>
      )}
    </Stack>
  )
}

export default RedirectForm
