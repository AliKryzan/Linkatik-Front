import { useMemo, useRef, useState } from "react"
import { Button, Group, Modal, Pill, SegmentedControl, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Plus } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useWatch } from "react-hook-form"

import { generateTimeSlots } from "@/utils/generate-time-slots"
import { IosPickerItem } from "./ios-picker-item"

const UpdateTimeSlots = () => {
  const { t } = useTranslation()

  const data = useWatch('time_slots')

  // from state
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "time_slots",
  })
  const [day, setDay] = useState(fields[0]?.day ?? "saturday")

  console.log("fields==========>",fields)
  // console.log("slots==========>",fields[0].slots)

  // modal state
  const [opened, { open, close }] = useDisclosure()
  const duration = watch("duration")
  const availablePeriods = useMemo(() => {
    const selectedPeriods = fields.map((period) => {
      if (period.day == day) return `${period.start_time} - ${period.end_time}`
    })
    return generateTimeSlots(duration).filter((value) => {
      return !selectedPeriods.includes(value)
    })
  }, [duration, fields, day])

  const pickerRef = useRef(null)

  // handle select

  const handleSelect = () => {
    if (!pickerRef.current) return
    const slide = pickerRef.current.getActiveSlide().split("-")

    append({
      day,
      start_time: slide[0].trim(),
      end_time: slide[1].trim(),
    })

    close()
  }
  return (
    <>
      <Stack>
        <div>
          <Text fz={"sm"} fw={500} pb={3}>
            {t(`products.addProduct.time_slots`)}
          </Text>
          <SegmentedControl
            fullWidth
            value={day}
            onChange={(value) => {
              setDay(value)
            }}
            withItemsBorders={false}
            size="xs"
            data={[
              {
                label: "SAT",
                value: "saturday",
              },
              {
                label: "SUN",
                value: "sunday",
              },
              {
                label: "MON",
                value: "monday",
              },
              {
                label: "TUE",
                value: "tuesday",
              },
              {
                label: "WED",
                value: "Wednesday",
              },
              {
                label: "THU",
                value: "thursday",
              },
              {
                label: "FRI",
                value: "friday",
              },
            ]}
          />
        </div>
        <Group wrap="wrap">
          {fields.map((item, index) => {
            if (item.day != day) return null
            return (
              <Pill
                radius={"md"}
                color="primary"
                size="lg"
                onRemove={() => {
                  console.log(item)
                  remove(item)
                }}
                key={index}
                withRemoveButton>
                <div dir="ltr">
                  {item.start_time} - {item.end_time}
                </div>
              </Pill>
            )
          })}
        </Group>
        <div>
          <Button onClick={open} rightSection={<Plus strokeWidth={1.1} />} color="dark">
            {t("products.addProduct.addTimeSlot")}
          </Button>
        </div>
      </Stack>

      <Modal size={"sm"} opened={opened} onClose={close} title={t("products.addProduct.addTimeSlot")}>
        <div dir="ltr" className="embla">
          <IosPickerItem
            ref={pickerRef}
            slides={availablePeriods}
            perspective="right"
            loop={true}
            label={t("products.addProduct.addTimeSlot")}
          />
        </div>
        <Button onClick={handleSelect} fullWidth>
          {t("products.addProduct.choose")}
        </Button>
      </Modal>
    </>
  )
}

export default UpdateTimeSlots
