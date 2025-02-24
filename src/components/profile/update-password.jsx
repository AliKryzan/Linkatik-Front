import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { PutChangePassword } from "@/services/utils"
import { updatePasswordSchema } from "@/validation/update-profile"

const UpdatePassword = () => {
  const { t } = useTranslation()
  const { formState, handleSubmit, control, setError, reset } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await PutChangePassword(data)
      reset()
      toast.success(t("profile.updatePasswordSuccess"))
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response.data.message })
    }
  })

  return (
    <Stack component={"form"} gap={"lg"} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="current_password"
        render={({ field }) => (
          <TextInput
            label={t("profile.oldPasswordInput")}
            error={
              formState.errors.current_password?.message &&
              t(`profile.errors.${formState.errors.current_password?.message}`)
            }
            placeholder={t("profile.oldPasswordInput")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="new_password"
        render={({ field }) => (
          <TextInput
            label={t("profile.newPasswordInput")}
            error={
              formState.errors.new_password?.message &&
              t(`profile.errors.${formState.errors.new_password?.message}`)
            }
            placeholder={t("profile.newPasswordInput")}
            {...field}
          />
        )}
      />

      <div>
        <Button variant="light" fullWidth={false} loading={formState.isSubmitting} type="submit">
          {t("profile.updatePassword")}
        </Button>
        {formState.errors.root?.message ? (
          <Text c={"red"} size="xs">
            {formState.errors.root.message}
          </Text>
        ) : null}
      </div>
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default UpdatePassword
