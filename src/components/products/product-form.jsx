import { memo } from "react"
import { DevTool } from "@hookform/devtools"
import { ActionIcon, Box, Button, Group, Stack, Text, TextInput, useMantineTheme } from "@mantine/core"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import axios from "axios"
import { X } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { Link } from "@/lib/i18n/navigation"
import { PostProduct } from "@/services/utils"
import { convertTo24HourFormat } from "@/utils/convertTo24HourFormat"
import { objectToFormData } from "@/utils/obj-to-formdata"
import RichTextEditorModal from "../rich-text-editor/rich-text-editor-model"
import Dropzone from "../ui/dropzone"
import ProductPriceType from "./product-price-type"
import ProductPricing from "./product-pricing"
import ProductType from "./product-type"
import { useNavigate } from "@/lib/i18n/navigation";

const productTypeDefaults = {
  digital: {
    duration: "",
    next_days: "",
    meeting_location: "",
    meeting_link: "",
  },
  booking: {
    meeting_location: "",
  },
}
const ProductForm = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const type = searchParams.get("type") ?? "digital"

  const theme = useMantineTheme()
  const { t } = useTranslation()
  const form = useFormContext()
  const { control, handleSubmit, formState, watch, setValue, setError, reset } = form

  const onSubmit = handleSubmit(async (data) => {

    console.log("data from creat product ====>",data)

    if (type === "booking") {
      data.time_slots = data.time_slots.map((slot) => ({
        ...slot,
        start_time: convertTo24HourFormat(slot.start_time),
        end_time: convertTo24HourFormat(slot.end_time),
      }))
    }
    try {
      await PostProduct(objectToFormData({ ...data, type, ...productTypeDefaults[data.type] }))
      toast.success(t("products.addProduct.successMessage"))
      navigate(`/user/products`);
      reset()
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      if (axios.isAxiosError(error) && error.response.data?.errors?.message) {
        setError("root", {
          message: error.response.data.errors.message,
        })
        toast.error(error.response.data.errors.message)
        return
      }
      toast.error(error.response?.data?.message || error.response?.message || error.message)
      setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })

  const handleRemove = () => {
    setValue("image", undefined)
  }

  return (
    <>
      <Stack aw={550} component={"form"} noValidate onSubmit={onSubmit} >
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              label={t("products.addProduct.titleInput")}
              error={
                formState.errors.title?.message &&
                t(`products.addProduct.errors.${formState.errors.title?.message}`)
              }
              placeholder={t("products.addProduct.titleInput")}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              label={t("products.addProduct.description")}
              error={
                formState.errors.description?.message &&
                t(`products.addProduct.errors.${formState.errors.description?.message}`)
              }
              placeholder={t("products.addProduct.description")}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="long_description"
          render={({ field }) => (
            <RichTextEditorModal
              setValue={field.onChange}
              label={t("products.addProduct.long_description")}
              field={field}
              error={
                formState.errors.long_description?.message &&
                t(`products.addProduct.errors.${formState.errors.long_description?.message}`)
              }
            />
          )}
        />

        <Controller
          control={control}
          name="slug"
          render={({ field }) => (
            <div>
              <TextInput
                dir="ltr"
                styles={{
                  input: { direction: "ltr", textAlign: "left" },
                  wrapper: { direction: "ltr", textAlign: "left" },
                }}
                size="md"
                leftSectionWidth={100}
                leftSectionProps={{ bg: "gray" }}
                leftSection={
                  <Box>
                    <Text size="sm">{t("products.addProduct.slug_left")}</Text>
                  </Box>
                }
                label={t("products.addProduct.slug")}
                error={
                  formState.errors.slug?.message &&
                  t(`products.addProduct.errors.${formState.errors.slug?.message}`)
                }
                {...field}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <div>
              <Text fw={"500"}>{t("products.addProduct.image")}</Text>
              <Dropzone
                error={
                  formState.errors.image?.message &&
                  t(`products.addProduct.errors.${formState.errors.image?.message}`)
                }
                {...field}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                onDrop={(files) => {
                  onChange(files[0])
                }}
              />
            </div>
          )}
        />

        {watch("image") ? (
          <Group
            wrap="nowrap"
            bg={theme.colors.primary[1]}
            style={{ borderRadius: theme.radius.md }}
            p={"sm"}
            gap={"xl"}
            align="center"
            justify="space-between">
            <div>
              <Text className="truncate">{watch("image")?.name}</Text>
            </div>
            <ActionIcon onClick={handleRemove} variant="transparent">
              <X strokeWidth={1.3} size={16} />
            </ActionIcon>
          </Group>
        ) : null}

        <ProductPriceType />
        <ProductPricing />
        <ProductType />

        <Group >
          <Button type="submit" loading={formState.isSubmitting}>
            {t(`products.addProduct.button`)}
          </Button>
          <Button
            component={Link}
            to="/user/products"
            variant="light"
            type="button"
            loading={formState.isSubmitting}>
            {t(`products.cancelButton`)}
          </Button>
        </Group>
        {formState.errors.root?.message && (
          <Text pb="md" c={"red"} size="sm" ta={"center"}>
            {formState.errors.root?.message}
          </Text>
        )}
      </Stack>
      {/* <DevTool control={control} placement="left" /> */}
    </>
  )
}

export default memo(ProductForm)
