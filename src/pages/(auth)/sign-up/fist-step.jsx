import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Flex, Stack, Text, TextInput, Title } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import SocialLoginButton from "@/components/ui/social-login-button"
import { Link } from "@/lib/i18n/navigation"
import { setFormData, setStep } from "@/store/sign-up/sign-up-slice"
import { signUpSchema } from "@/validation/sign-up"
import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

const FirstStep = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { formData, errorMessage } = useSelector((state) => state.signUp)

  // manage form state
  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: formData,
  })

  const onSubmit = handleSubmit(async (data) => {
    dispatch(setFormData(data))
    dispatch(setStep(1))
  })

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit} w={500} gap={"xl"} py={"xl"}>
      <div>
        <Title ta={"center"} justify="center">
          {t("signUp.title")}
        </Title>
        <Text ta={"center"} justify="center" fw={400} c={"gray.8"} mt={9}>
          {t("signUp.description")}
        </Text>
      </div>
      <Stack gap={"md"}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              variant="filled"
              error={
                formState.errors.username?.message && t(`signUp.errors.${formState.errors.username?.message}`)
              }
              placeholder={t("signUp.usernameInput")}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              variant="filled"
              type="email"
              error={formState.errors.email?.message && t(`signUp.errors.${formState.errors.email?.message}`)}
              placeholder={t("signUp.emailInput")}
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
                formState.errors.password?.message && t(`signUp.errors.${formState.errors.password?.message}`)
              }
              type={showPassword ? "text" : "password"}
              placeholder={t("signUp.passwordInput")}
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
        <Text lh={"xl"} c={"gray.8"} size="sm" pt={15}>
          <Trans
            i18nKey="signUp.warning"
            components={{ Link: <Link to={"/"} />, PrivacyPolicyLink: <Link to={"/"} /> }}
          />
        </Text>{" "}
        <Button loading={formState.isSubmitting} type="submit" fullWidth>
          {t("signUp.signUpButton")}
        </Button>
        {errorMessage ? (
          <Text c={"red"} size="sm" ta={"center"}>
            {errorMessage}
          </Text>
        ) : null}
        {formState.errors.root?.message && (
          <Text c={"red"} size="sm" ta={"center"}>
            {t(`signUp.errors.${formState.errors.root?.message}`)}
          </Text>
        )}
        <Text ta={"center"} size="md" c="gray.8">
          {t("signUp.or")}
        </Text>
        <Stack gap={"sm"}>
          <SocialLoginButton type={"google"} />
          <SocialLoginButton type={"apple"} />
        </Stack>
        <Stack gap={"md"}>
          <Flex justify={"center"} align={"center"}>
            <Text ta={"center"} c={"gray.8"} size="sm">
              {t("signUp.haveAccount")}{" "}
            </Text>{" "}
            <Button ta={"center"} component={Link} to="/login" variant="transparent" p={0} size="sm">
              {" "}
              {t("signUp.loginButton")}
            </Button>
          </Flex>
        </Stack>
      </Stack>
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default FirstStep


