import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput, Title } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { LinkatikApi } from "../../services"

const ForgotPassword = () => {
  const { t } = useTranslation()

  // manage form state
  const { handleSubmit, control, formState, setError, reset } = useForm({
    resolver: zodResolver(
      z.object({ email: z.string({ required_error: "required" }).email({ message: "invalidEmail" }) }),
    ),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await LinkatikApi.post("/user/forgot-password", data)
      toast.success(t(`forgotPassword.successMessage`), {
        duration: 3000,
      })
      reset()
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: "invalidResponse" })
    }
  })

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit} w={500} gap={"xl"} py={"xl"}>
      <div>
        <Title fs={"sm"}>{t("forgotPassword.title")}</Title>
        <Text size="sm" fw={400} mt={9}>
          {t("forgotPassword.description")}
        </Text>
      </div>
      <Stack gap={"xl"}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              variant="filled"
              type="email"
              error={
                formState.errors.name?.message && t(`forgotPassword.errors.${formState.errors.name?.message}`)
              }
              placeholder={t("forgotPassword.emailInput")}
              {...field}
            />
          )}
        />
        <Stack gap={"sm"}>
          <Button loading={formState.isSubmitting} type="submit" fullWidth>
            {t("forgotPassword.submitButton")}
          </Button>
          {formState.errors.root?.message && (
            <Text c={"red"} size="xs" ta={"center"}>
              {t(`forgotPassword.errors.${formState.errors.root?.message}`)}
            </Text>
          )}
        </Stack>
      </Stack>
      <DevTool control={control} />
    </Stack>
  )
}

export default ForgotPassword
