import { useEffect } from "react"
import { ActionIcon, Center, Group, rem, SegmentedControl, Stack, Text, useMantineTheme } from "@mantine/core"
import { t } from "i18next"
import { X } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import { fileIcon, scheduleIcon } from "../../assets"
import CustomSelect from "../ui/custom-select"
import Dropzone from "../ui/dropzone"
import TimeSlots from "./time-slots"

const ProductType = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get("type") ?? "digital"

  const updateSearchParams = (value) => {
    setSearchParams((pre) => {
      pre.set("type", value)
      return pre
    })
  }
  const { watch, setValue, control, formState } = useFormContext()

  useEffect(() => {
    setValue("meeting_location", "google")
    setValue("duration", "30")
    setValue("next_days", "7")
  }, [type, setValue])

  const handleRemove = () => {
    setValue("digital_product_file", undefined)
  }
  const theme = useMantineTheme()

  return (
    <Stack gap={"lg"}>
      <div>
        <div>
          <Text fz={"sm"} fw={500} pb={3}>
            {t(`products.addProduct.type`)}
          </Text>
          <SegmentedControl
            fullWidth
            withItemsBorders={false}
            size="xs"
            value={type}
            onChange={updateSearchParams}
            data={[
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <img src={fileIcon} style={{ width: rem(16), height: rem(16) }} />
                    <span>{t("products.general.digital")}</span>
                  </Center>
                ),
                value: "digital",
              },
              {
                label: (
                  <Center style={{ gap: 10 }}>
                    <img src={scheduleIcon} style={{ width: rem(16), height: rem(16) }} />
                    <span>{t("products.general.booking")}</span>
                  </Center>
                ),
                value: "booking",
              },
            ]}
          />
        </div>

        {type === "digital" ? (
          <Text size="xs" c="gray" py={4} fw={500}>
            {t("products.fileUpload.label")}
          </Text>
        ) : (
          <Text size="xs" c="gray" py={4} fw={500}>
            {t("products.general.bookingDescription")}
          </Text>
        )}
      </div>

      {type === "digital" && (
        <>
          <Controller
            control={control}
            name="digital_product_file"
            render={({ field: { onChange, ...field } }) => (
              <Dropzone
                error={
                  formState.errors.digital_product_file?.message &&
                  t(`products.addProduct.errors.${formState.errors.digital_product_file?.message}`)
                }
                {...field}
                multiple={false}
                onDrop={(files) => {
                  onChange(files[0])
                }}
              />
            )}
          />

          {watch("digital_product_file") ? (
            <Group
              wrap="nowrap"
              bg={theme.colors.primary[1]}
              style={{ borderRadius: theme.radius.md }}
              p={"sm"}
              gap={"xl"}
              align="center"
              justify="space-between">
              <div>
                <Text className="truncate">{watch("digital_product_file")?.name || "unknown"}</Text>
              </div>
              <ActionIcon onClick={handleRemove} variant="transparent">
                <X strokeWidth={1.3} size={16} />
              </ActionIcon>
            </Group>
          ) : null}
        </>
      )}

      {type === "booking" && (
        <>
          <Stack gap={"xs"}>
            <div>
              <Text size="sm" py={3} fw={500}>
                {t("products.addProduct.meetingDetailsLabel")}
              </Text>
              <Group wrap="nowrap" gap="xs">
                <Controller
                  control={control}
                  name={"duration"}
                  render={({ field }) => (
                    <CustomSelect
                      error={
                        formState.errors.duration?.message &&
                        t(`products.addProduct.errors.${formState.errors.duration?.message}`)
                      }
                      data={[
                        { value: "30", label: `30 ${t("products.addProduct.durationUnit")}` },
                        { value: "45", label: `45 ${t("products.addProduct.durationUnit")}` },
                        { value: "60", label: `60 ${t("products.addProduct.durationUnit")}` },
                      ]}
                      label={t("products.addProduct.duration")}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={"next_days"}
                  render={({ field }) => (
                    <CustomSelect
                      label={t("products.addProduct.next_days")}
                      error={
                        formState.errors.next_days?.message &&
                        t(`products.addProduct.errors.${formState.errors.next_days?.message}`)
                      }
                      data={[
                        { value: "7", label: `7 ${t("products.addProduct.next_daysUnit")}` },
                        { value: "14", label: `14 ${t("products.addProduct.next_daysUnit")}` },
                        { value: "30", label: `30 ${t("products.addProduct.next_daysUnit")}` },
                        { value: "60", label: `60 ${t("products.addProduct.next_daysUnit")}` },
                      ]}
                      {...field}
                    />
                  )}
                />
              </Group>
            </div>
          </Stack>
          <TimeSlots />
        </>
      )}
    </Stack>
  )
}

export default ProductType
