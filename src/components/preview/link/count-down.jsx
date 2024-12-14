import { Group, Stack, Text } from "@mantine/core"
import Countdown from "react-countdown"
import { useTranslation } from "react-i18next"

function toTwoDigits(num) {
  return num < 10 ? "0" + num : num.toString()
}

const CountDown = ({ block }) => {
  const { t } = useTranslation()

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Text>{t("bioBlocks.tabs.redirect.form.countdown")}</Text>
    } else {
      // Render a countdown
      return (
        <Group dir="ltr" justify="center" gap={"xs"} align="center">
          <Group>
            <Stack gap={"xs"} align="center">
              <Group gap={6}>
                <Text className="timer-number">{toTwoDigits(days)[0]}</Text>
                <Text className="timer-number">{toTwoDigits(days)[1]}</Text>
              </Group>
              <Text>DAYS</Text>
            </Stack>
          </Group>
          <p className="timer-divider">:</p>
          <Group>
            <Stack gap={"xs"} align="center">
              <Group gap={6}>
                <Text className="timer-number">{toTwoDigits(hours)[0]}</Text>
                <Text className="timer-number">{toTwoDigits(hours)[1]}</Text>
              </Group>
              <Text>HOURS</Text>
            </Stack>
          </Group>
          <p className="timer-divider">:</p>
          <Group>
            <Stack gap={"xs"} align="center">
              <Group gap={6}>
                <Text className="timer-number">{toTwoDigits(minutes)[0]}</Text>
                <Text className="timer-number">{toTwoDigits(minutes)[1]}</Text>
              </Group>
              <Text>MIN</Text>
            </Stack>
          </Group>
          <p className="timer-divider">:</p>
          <Group>
            <Stack gap={"xs"} align="center">
              <Group gap={6}>
                <Text className="timer-number">{toTwoDigits(seconds)[0]}</Text>
                <Text className="timer-number">{toTwoDigits(seconds)[1]}</Text>
              </Group>
              <Text>SEC</Text>
            </Stack>
          </Group>
        </Group>
      )
    }
  }

  return (
    <div className="countdown-preview-block">
      <Countdown date={new Date(block?.settings?.end_date)} renderer={renderer} oPadDays={2} zeroPadTime={2}>
        <Text>{t("bioBlocks.tabs.redirect.form.countdown")}</Text>
      </Countdown>
    </div>
  )
}

export default CountDown
