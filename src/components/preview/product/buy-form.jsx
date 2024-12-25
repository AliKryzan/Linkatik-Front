import { useState } from "react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Group, Image, NumberInput, Radio, Stack, Text, TextInput } from "@mantine/core"
import { Check } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"

import { imagePlaceholder } from "../../../assets"
import { PAYMENTGATEWAYS_LOGOS } from "../../../config"
import { PostPlaceOrder } from "../../../services/utils"
import { buyProductSchema } from "../../../validation/product"

const BuyForm = ({ product }) => {
  const form = useForm({
    resolver: zodResolver(buyProductSchema),
    defaultValues: {
      name: "",
      email: "",
      ...(product.max_price ? { price: product.max_price } : {}),
    },
  })
  const { t } = useTranslation()
  // store payment url incase use was not redirected
  const [paymentURL, setPaymentURl] = useState(null)
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const redirect_url = new URL(window.location.href)
      redirect_url.searchParams.set("success", "true")

      const response = await PostPlaceOrder({
        redirect_url,
        product_id: product.id,
        ...data,
      })
      setPaymentURl(response.pay_url)
      window.open(response.pay_url)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      form.setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })
  return (
    <Stack component={"form"} onSubmit={onSubmit} gap={"md"}>
      <Group align="center" justify="space-between" wrap="nowrap" py="sm">
        <Group align="center">
          <Box h={56} w={56}>
            <Image radius="md" fit="cover" src={product.image} alt={product.title} />
          </Box>
          <Text>{product.title}</Text>
        </Group>
        <div>
          <Text fw={600}>
            {product.price} {product.currency}
          </Text>
        </div>
      </Group>
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <TextInput
            label={t("product-preview.form.name-input-label")}
            placeholder={t("product-preview.form.name-input-placeholder")}
            error={
              form.formState.errors.name?.message &&
              t(`product-preview.form.errors.${form.formState.errors.name?.message}`)
            }
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <TextInput
            label={t("product-preview.form.email-input-label")}
            placeholder={t("product-preview.form.email-input-placeholder")}
            error={
              form.formState.errors.email?.message &&
              t(`product-preview.form.errors.${form.formState.errors.email?.message}`)
            }
            {...field}
          />
        )}
      />
      {product.sales_price ? (
        <Controller
          control={form.control}
          name="price"
          render={({ field }) => (
            <NumberInput
              min={Number(product.sales_price)}
              max={Number(product.max_price)}
              label={t("product-preview.form.price-input-label", {
                min: Number(product.sales_price),
                max: product.max_price,
              })}
              variant="filled"
              placeholder={t("product-preview.form.price-input-placeholder")}
              error={
                form.formState.errors.price?.message &&
                t(`product-preview.form.errors.${form.formState.errors.price?.message}`)
              }
              {...field}
            />
          )}
        />
      ) : null}
      <Controller
        control={form.control}
        name="payment_processors_id"
        render={({ field }) => (
          <Radio.Group
            label={t("product-preview.form.payment_processors_id-input-label")}
            variant="filled"
            placeholder={t("product-preview.form.payment_processors_id-input-placeholder")}
            error={
              form.formState.errors.payment_processors_id?.message &&
              t(`product-preview.form.errors.${form.formState.errors.payment_processors_id?.message}`)
            }
            {...field}>
            <Group gap={"sm"} pt={"sm"}>
              {product.payment_processors.map((element) => {
                return (
                  <Radio.Card
                    key={element.id}
                    className="price_radio_root payment_method"
                    radius="md"
                    value={element.id + ""}>
                    <Group wrap="nowrap" align="flex-start">
                      <Radio.Indicator variant="outline" icon={Check} />
                      <Group wrap="nowrap">
                        <Box w={56} h={56}>
                          <Image
                            w={"100%"}
                            h={"100%"}
                            radius={"50%"}
                            fit="cover"
                            fallbackSrc={imagePlaceholder}
                            src={PAYMENTGATEWAYS_LOGOS[element.processor]}
                            alt={element.processor}
                          />
                        </Box>
                        <Text c={"gray"} className="label">
                          {element.name}
                        </Text>
                      </Group>
                    </Group>
                  </Radio.Card>
                )
              })}
            </Group>
          </Radio.Group>
        )}
      />

      <Button loading={form.formState.isSubmitting} type="submit">
        {t("product-preview.form.buy-button")}
      </Button>
      {form.formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {form.formState.errors.root.message}
        </Text>
      )}
      {form.formState.isSubmitSuccessful && paymentURL ? (
        <Text size="sm" c={"gray"}>
          <Trans
            i18nKey="product-preview.payment-url"
            components={{
              Link: <a rel="noopener" target="_blank" href={paymentURL} />,
            }}
          />
        </Text>
      ) : null}
      <DevTool control={form.control} />
    </Stack>
  )
}

export default BuyForm
