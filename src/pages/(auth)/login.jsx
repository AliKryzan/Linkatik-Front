import { useEffect, useState } from "react"
import { LinkatikApi } from "@/services"
import { updateUser } from "@/utils/update-user"
import { loginSchema } from "@/validation/login"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Flex, Stack, Text, TextInput, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { Link, useNavigate } from "@/lib/i18n/navigation"
import SocialLoginButton from "@/components/ui/social-login-button"

const Login = () => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  // manage form state
  const { handleSubmit, control, formState, reset, setError } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await LinkatikApi.post("/user/login", data)
      if (!response.data.data?.token) throw new Error("invalidToken")
      updateUser(response.data.data)
      reset()
      if (response.data.data.plan_settings) {
        navigate("/user")
        return
      }
      navigate("/plans")
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 422)) {
        setError("root", {
          message: "invalidLogin",
        })
        return
      }
      setError("root", {
        message: "invalidResponse",
      })
    }
  })

  const [searchParams] = useSearchParams()

  const access_token = searchParams.get("access_token")

  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return updateUser(access_token)
    },

    enabled: !!access_token,
  })

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (access_token && !isLoading) {
      navigate("/user")
    }
  }, [isLoading, access_token])

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit} w={500} gap={"xl"} py={"xl"}>
      <div>
        <Title ta={"center"} justify="center">
          {t("login.title")}
        </Title>
        <Text ta={"center"} justify="center" fw={400} c={"gray"} mt={9}>
          {t("login.description")}
        </Text>
      </div>
      <Stack gap={"sm"}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              variant="filled"
              type="email"
              error={formState.errors.email?.message && t(`login.errors.${formState.errors.email?.message}`)}
              placeholder={t("login.emailInput")}
              leftSection={<Mail size={18} />}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              variant="filled"
              error={
                formState.errors.password?.message && t(`login.errors.${formState.errors.password?.message}`)
              }
              type={showPassword ? "text" : "password"}
              placeholder={t("login.passwordInput")}
              leftSection={<Lock size={18} />}
              rightSection={
                <button
                  style={{
                    cursor: "pinter !important",
                  }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye className="!cursor-pinter" size={18} />
                  ) : (
                    <EyeOff className="!cursor-pinter" size={18} />
                  )}
                </button>
              }
              {...field}
            />
          )}
        />

        <div>
          <Button size="sm" component={Link} to={"/forgot-password"} variant="transparent">
            {t("login.forgotPassword")}
          </Button>
        </div>
        <Button loading={formState.isSubmitting} type="submit" fullWidth>
          {t("login.loginButton")}
        </Button>
        {formState.errors.root?.message && (
          <Text size="sm" c={"red"} ta={"center"}>
            {t(`login.errors.${formState.errors.root?.message}`)}
          </Text>
        )}
        <Text ta={"center"} size="md" c="gray">
          {t("login.or")}
        </Text>
        <Stack gap={"sm"}>
          <SocialLoginButton type={"google"} />
          <SocialLoginButton type={"apple"} />
        </Stack>
        <Stack gap={"md"}>
          <Flex justify={"center"} align={"center"}>
            <Text ta={"center"} c={"gray.8"}>
              {t("login.doseNotHaveAccount")}{" "}
            </Text>
            <Button ta={"center"} component={Link} to="/signup" variant="transparent" p={0}>
              {t("login.registerButton")}
            </Button>
          </Flex>
          {/* <Text size="sm" ta={"center"} c={"gray.8"}>
            <Trans
              i18nKey="login.warning"
              components={{
                Link: <a rel="noopener" target="_blank" href={"https://google.com"} />,
                TermsLink: <a rel="noopener" target="_blank" href={"https://google.com"} />,
              }}
            />
          </Text>*/}
        </Stack>
      </Stack>
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default Login
