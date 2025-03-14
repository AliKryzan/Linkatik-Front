import { Group, Space, Stack, Text } from "@mantine/core"
import Countdown from "react-countdown"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import CustomDateTimePicker from "../../../../ui/custom-date-time-picker"
import CustomSelect from "../../../../ui/custom-select"

const CountDown = ({ form }) => {
  const { control, watch, formState } = form
  const {
    errors: { settings: settingsErrors },
  } = formState
  const { t } = useTranslation()

  return (
    <Stack>
      {/* <Text c="gray.8">{t("bioBlocks.createBlock.custom.countdown.title")}</Text> */}
      <Space />
      <Text
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        lh={"30px"}
        fz={"45px"}
        ta={"center"}>
        <Countdown
          key={watch("settings.end_date")}
          date={watch("settings.end_date")}
          oPadDays={2}
          zeroPadTime={2}>
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
              fullWidth
              minDate={new Date()}
              variant="filled"
              label={t("bioBlocks.createBlock.custom.countdown.form.end_date")}
              error={
                settingsErrors?.end_date?.message &&
                t(`bioBlocks.createBlock.custom.countdown.form.errors.${settingsErrors?.end_date?.message}`)
              }
              {...field}
            />
          )}
        />
      </Group>
    </Stack>
  )
}

export default CountDown
