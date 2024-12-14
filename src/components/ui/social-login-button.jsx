import { useState } from "react"
import { Button, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"

import { appleIcon, googleIcon } from "../../assets"
import { LinkatikApi } from "../../services"

const SocialLoginButton = ({ type, ...props }) => {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const handleSocialMediaSignIn = async () => {
    try {
      setIsLoading(true)
      setError(false)
      const response = await LinkatikApi.get(`/user/login/${type}/redirect`)
      if (response.data.data.url) window.location.href = response.data.data.url
    } catch (error) {
      console.log("🚀 ~ handleSocialMediaSignIn ~ error:", error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const { t } = useTranslation()
  if (type === "google")
    return (
      <>
        <Button
          onClick={handleSocialMediaSignIn}
          type="button"
          fw={500}
          leftSection={<img src={googleIcon} alt="sign in with google" />}
          variant="outline"
          radius={30}
          color="gray"
          loading={loading}
          fullWidth
          {...props}>
          {t("login.googleButton")}
        </Button>
        {error && (
          <Text c={"red"} size="xs" ta={"center"}>
            {t("login.errors.socialLogin")}
          </Text>
        )}
      </>
    )

  if (type === "apple")
    return (
      <>
        <Button
          onClick={handleSocialMediaSignIn}
          type="button"
          fw={500}
          variant="outline"
          leftSection={<img src={appleIcon} alt="sign in with apple" />}
          radius={30}
          color="gray"
          loading={loading}
          {...props}>
          {t("login.appleButton")}
        </Button>
        {error && (
          <Text c={"red"} size="xs" ta={"center"}>
            {t("login.errors.socialLogin")}
          </Text>
        )}
      </>
    )
  return null
}

export default SocialLoginButton
