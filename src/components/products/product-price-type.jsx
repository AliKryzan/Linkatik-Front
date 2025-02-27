import { Group, Radio, Text } from "@mantine/core"
import { Check } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const ProductPriceType = () => {
  const { control, formState } = useFormContext()
  const { t } = useTranslation()
  const cards = [
    { name: t("products.general.free"), value: "free", description: t("products.general.freeDescription") },
    {
      name: t("products.general.pay_what_you_want"),
      value: "pay_what_you_want",
      description: t("products.general.pay_what_you_wantDescription"),
    },
    {
      name: t("products.general.single_payment"),
      value: "single_payment",
      description: t("products.general.single_paymentDescription"),
    },
    {
      name: t("products.general.membership"),
      value: "membership",
      description: t("products.general.membershipDescription"),
    },
  ].map((item) => (
    <Radio.Card
      disabled={item.value === "membership"}
      className="price_radio_root"
      radius="md"
      value={item.value}
      key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator variant="outline" icon={Check} />
        <div>
          <Text c={"gray"} className="!font-semibold !text-sm">
            {item.name}
          </Text>
          <Text c={"gray"} size="xs" className="!text-xm">
            {item.description}
          </Text>
        </div>
      </Group>
    </Radio.Card>
  ))
  return (
    <div>
      <Controller
        control={control}
        name="pricing_type"
        render={({ field }) => (
          <>
            <Radio.Group
              error={
                formState.errors.pricing_type?.message &&
                t(`products.addProduct.errors.${formState.errors.pricing_type?.message}`)
              }
              label={t("products.addProduct.pricing_type")}
              {...field}>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">{cards}</div>
            </Radio.Group>
          </>
        )}
      />
    </div>
  )
}

export default ProductPriceType
