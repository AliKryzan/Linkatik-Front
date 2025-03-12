import { Group, Stack, Text } from "@mantine/core"
import Countdown from "react-countdown"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

function toTwoDigits(num) {
  return num < 10 ? "0" + num : num.toString()
}

const CountDown = ({ block, className, style }) => {
  const { t } = useTranslation()

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Text
          className="text-center"
          style={{
            color: style?.color,
          }}>
          {t("bioBlocks.tabs.redirect.form.countdown")}
        </Text>
      )
    } else {
      // Render a countdown in horizontal inline format
      return (
        <Group dir="ltr" className="!py-3" justify="center" gap={2} align="center" style={style}>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(days)[0]}</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(days)[1]}</Text>
          <Text className="timer-divider">:</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(hours)[0]}</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(hours)[1]}</Text>
          <Text className="timer-divider">:</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(minutes)[0]}</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(minutes)[1]}</Text>
          <Text className="timer-divider">:</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(seconds)[0]}</Text>
          <Text className="!text-3xl !font-semibold">{toTwoDigits(seconds)[1]}</Text>
        </Group>
      )
    }
  }

  return (
    <div className={cn("countdown-preview-block", className)}>
      <Countdown date={new Date(block?.settings?.end_date)} renderer={renderer} oPadDays={2} zeroPadTime={2}>
        <Text
          className="text-center"
          style={{
            color: style?.color,
          }}>
          {t("bioBlocks.tabs.redirect.form.countdown")}
        </Text>
      </Countdown>
    </div>
  )
}

export default CountDown
