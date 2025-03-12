import { useEffect } from "react"
import { Group, NumberInput } from "@mantine/core"
import { DollarSign } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const ProductPricing = () => {
  const { t } = useTranslation()
  const { control, formState, watch, setValue } = useFormContext()

  const pricing_type = watch("pricing_type")
  useEffect(() => {
    setValue("max_price", 0)
    setValue("price", 0)
  }, [pricing_type])

  if (pricing_type === "single_payment") {
    return (
      <>
        <Controller
          control={control}
          name={"price"}
          render={({ field }) => (
            <NumberInput
              min="0"
              label={t("products.addProduct.price")}
              leftSection={ <img src="/riyal.svg" alt="riyal" className="w-4 object-contain" />}
              error={
                formState.errors.price?.message &&
                t(`products.addProduct.errors.${formState.errors.price?.message}`)
              }
              placeholder={t("products.addProduct.price")}
              {...field}
            />
          )}
        />
        {/* <Controller
          control={control}
          name={"currency"}
          render={({ field }) => (
            <Select
              label={t("products.addProduct.currency")}
              error={
                formState.errors.currency?.message &&
                t(`products.addProduct.errors.${formState.errors.currency?.message}`)
              }
              allowDeselect={false}
              data={["USD", "EUR"]}
              placeholder={t("products.addProduct.currency")}
              {...field}
            />
          )}
        /> */}
      </>
    )
  }

  if (pricing_type === "pay_what_you_want") {
    return (
      <>
        <Group grow wrap="nowrap">
          <Controller
            control={control}
            name={"sales_price"}
            render={({ field }) => (
              <NumberInput
                min="0"
                label={t("products.addProduct.sales_price")}
                leftSection={ <img src="/riyal.svg" alt="riyal" className="w-4 object-contain" />}
                error={
                  formState.errors.sales_price?.message &&
                  t(`products.addProduct.errors.${formState.errors.sales_price?.message}`)
                }
                placeholder={t("products.addProduct.sales_price")}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={"max_price"}
            render={({ field }) => (
              <NumberInput
                min="0"
                label={t("products.addProduct.max_price")}
                leftSection={ <img src="/riyal.svg" alt="riyal" className="w-4 object-contain" />}
                error={
                  formState.errors.max_price?.message &&
                  t(`products.addProduct.errors.${formState.errors.max_price?.message}`)
                }
                placeholder={t("products.addProduct.max_price")}
                {...field}
              />
            )}
          />
        </Group>
        {/* <Controller
          control={control}
          name={"currency"}
          render={({ field }) => (
            <Select
              label={t("products.addProduct.currency")}
              error={
                formState.errors.currency?.message &&
                t(`products.addProduct.errors.${formState.errors.currency?.message}`)
              }
              data={["USD", "EUR"]}
              placeholder={t("products.addProduct.currency")}
              {...field}
            />
          )}
        /> */}
      </>
    )
  }

  if (pricing_type === "free") return null

  if (pricing_type === "membership") {
    return <div>membership</div>
  }

  return null
}

export default ProductPricing
