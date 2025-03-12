import { Group, Space, Text } from "@mantine/core"
import Countdown from "react-countdown"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import CustomDateTimePicker from "../../ui/custom-date-time-picker"
import CustomSelect from "../../ui/custom-select"

const CountDown = () => {
  const { t } = useTranslation()

  const { control, formState, watch } = useFormContext()
  console.log("🚀 ~ CountDown ~ formState:", formState.errors)

  return (
    <>
      <Text c="gray.8">{t("bioBlocks.createBlock.custom.countdown.title")}</Text>
      <Space />
      <Text
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        lh={"30px"}
        fz={"45px"}
        ta={"center"}>
        <Countdown key={watch("settings.end_date")} date={watch("settings.end_date")} oPadDays={2} zeroPadTime={2}>
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
          name="settings.end_date"
          render={({ field }) => (
            <CustomDateTimePicker
              minDate={new Date()}
              variant="filled"
              label={t("bioBlocks.createBlock.custom.countdown.form.end_date")}
              error={
                formState.errors.settings?.end_date?.message &&
                t(
                  `bioBlocks.createBlock.custom.countdown.form.errors.${formState.errors.settings.end_date?.message}`,
                )
              }
              {...field}
            />
          )}
        />
      </Group>
    </>
  )
}

export default CountDown
