import { useEffect } from "react";
import { memo } from "react"
import { DevTool } from "@hookform/devtools"
import { ActionIcon, Button, Group, Stack, Text, TextInput, useMantineTheme } from "@mantine/core"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { X } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { convertTo24HourFormat } from "@/utils/convertTo24HourFormat"
import { Link } from "@/lib/i18n/navigation"
import { PutProduct } from "@/services/utils"
import { objectToFormData } from "@/utils/obj-to-formdata"
import RichTextEditorModal from "../rich-text-editor/rich-text-editor-model"
import Dropzone from "../ui/dropzone"
import ProductPriceType from "./product-price-type"
import ProductPricing from "./product-pricing"
import { useNavigate } from "@/lib/i18n/navigation";
import ProductTypeUpdate from "./Product-type-update"


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


const UpdateProductForm = ({type}) => {
  const { productId } = useParams()
  const navigate = useNavigate();

  const theme = useMantineTheme()
  const { t } = useTranslation()
  const form = useFormContext()
  const { control, handleSubmit, formState, watch, setValue, setError, reset } = form

  const digitalProductFile = watch("digital_product_file")
  const time_slots = watch("time_slots")
  const duration = watch("duration")
  const next_days = watch("next_days")
  const description = watch("description")

  // console.log("time_slots ========>",time_slots)
  // console.log("duration ========>",duration)





  const onSubmit = handleSubmit(async (data) => {

    if (type === "booking") {
      data.time_slots = time_slots.map((slot) => ({
        ...slot,
        start_time: convertTo24HourFormat(slot.start_time),
        end_time: convertTo24HourFormat(slot.end_time),
      }))
    }

    try {
      await PutProduct(
        productId,
        objectToFormData({
           ...data,
           type,
           ...productTypeDefaults[data.type],
           image: typeof data.image === "string" ? data.image_path : data.image,
          ...(type === "digital" ? { digital_product_file: digitalProductFile } : {duration : duration,next_days}),
          }),
      )
      toast.success(t("products.addProduct.successMessage"))
      navigate(`/user/products`);
      reset()
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
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
      <Stack maw={550} component={"form"} noValidate onSubmit={onSubmit}  >
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
        <ProductTypeUpdate type={type}/>

        <Group>
          <Button type="submit" loading={formState.isSubmitting}>
            {t(`products.updateProductPage.button`)}
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

export default memo(UpdateProductForm)
