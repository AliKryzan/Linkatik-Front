import { Button, Group, Select, Stack, Switch, Text, TextInput } from "@mantine/core"
import { Trash2 } from "lucide-react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const PaymentGatewayForm = ({ form, onSubmit, edit, deleteMutation }) => {
  const { t } = useTranslation()

  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const { mutate, isPending } = deleteMutation || {}

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput label={t("paymentGateways.form.name")} error={errors.name?.message} {...field} />
        )}
      />
      {!edit && (
        <Controller
          control={control}
          name="processor"
          render={({ field }) => (
            <Select
              label={t("paymentGateways.form.processor")}
              error={errors.name?.message}
              {...field}
              data={[
                { value: "paypal", label: "PayPal" },
                { value: "stripe", label: "Stripe" },
                { value: "moyasar", label: "moyasar" },
                { value: "tap", label: "Tap" },
                { value: "paylink", label: "Paylink" },
              ]}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="settings.client_id"
        render={({ field }) => (
          <TextInput
            label={t("paymentGateways.form.client_id")}
            error={errors.settings?.client_id?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="settings.secret"
        render={({ field }) => (
          <TextInput
            label={t("paymentGateways.form.secret")}
            error={errors.settings?.secret?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="settings.mode"
        render={({ field }) => (
          <Select
            label={t("paymentGateways.form.mode")}
            error={errors.name?.message}
            {...field}
            data={[
              { value: "live", label: t("paymentGateways.form.live_mode") },
              { value: "test", label: t("paymentGateways.form.test_mode") },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="is_active"
        render={({ field }) => (
          <Switch
            label={t("paymentGateways.form.is_active")}
            error={errors.is_active?.message}
            checked={watch("is_active")}
            color="green"
            labelPosition="left"
            {...field}
          />
        )}
      />

      {edit ? (
        <Group>
          <Button disabled={isPending} variant="outline" loading={isSubmitting} type="submit">
            {t("paymentGateways.form.updateButton")}
          </Button>
          <Button
            color="red"
            variant="subtle"
            leftSection={<Trash2 color="red" size={18} />}
            onClick={mutate}
            disabled={isSubmitting}
            loading={isPending}
            type="button">
            {t("paymentGateways.form.deleteButton")}
          </Button>
        </Group>
      ) : (
        <Button loading={isSubmitting} type="submit">
          {t("paymentGateways.form.addButton")}
        </Button>
      )}
      {errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {errors.root.message}
        </Text>
      )}
    </Stack>
  )
}

export default PaymentGatewayForm
