import { useEffect, useState } from "react"
import { LinkatikApi } from "@/services"
import { GetUser, ResetPasswordService } from "@/services/utils"
import { Box, Button, Group, PasswordInput, Stack, Text } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

const ResetPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const encodedToken = searchParams.get("token")
  const token = encodedToken ? atob(encodedToken) : null
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
console.log(token);
    // Fetch user data using token
    const fetchUserData = async () => {
      try {
        const user = GetUser({ token })
        setUserEmail(user?.email)
      } catch (error) {
        toast.error(t("general.error"))
        navigate("/login")
      }
    }

    fetchUserData()
  }, [token, navigate, t])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ResetPasswordService({ ...data, token }),
    onSuccess: () => {
      toast.success(t("auth.resetPassword.success"))
      navigate("/login")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("general.error"))
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <Stack w={500} gap={"xl"} py={"xl"}>
      <Text size="xl" fw={500} mb="xl" ta="center">
        {t("auth.resetPassword.title")}
      </Text>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <PasswordInput
            label={t("auth.resetPassword.newPassword")}
            placeholder={t("auth.resetPassword.newPasswordPlaceholder")}
            {...register("password", {
              required: t("auth.resetPassword.passwordRequired"),
              minLength: {
                value: 8,
                message: t("auth.resetPassword.passwordMinLength"),
              },
            })}
            error={errors.password?.message}
          />

          <PasswordInput
            label={t("auth.resetPassword.confirmPassword")}
            placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
            {...register("confirmPassword", {
              required: t("auth.resetPassword.confirmPasswordRequired"),
              validate: (value) => value === watch("password") || t("auth.resetPassword.passwordMismatch"),
            })}
            error={errors.confirmPassword?.message}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={isPending}>
              {t("auth.resetPassword.submit")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  )
}

export default ResetPassword
