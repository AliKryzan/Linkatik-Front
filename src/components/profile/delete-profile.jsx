import { useState } from "react"
import { Button, Stack, Text, Title } from "@mantine/core"
import { isAxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { LOCALSTORAGE_KEY } from "../../config"
import { DeleteProfile } from "../../services/utils"

const DeleteProfileComponent = () => {
  const { t } = useTranslation()

  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleDeleteAccount = async () => {
    try {
      setError("")
      setIsLoading(true)
      await DeleteProfile()
      window.localStorage.removeItem(LOCALSTORAGE_KEY)
      navigate("/")
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Stack>
      <Title order={3}> {t("profile.deleteProfileTitle")}</Title>
      <Text> {t("profile.deleteProfileDescription")}</Text>
      <div>
        <Button loading={loading} onClick={handleDeleteAccount} variant="outline" color="red">
          {t("profile.deleteProfileButton")}
        </Button>
        {error ? (
          <Text c={"red"} size="xs">
            {error}
          </Text>
        ) : null}
      </div>
    </Stack>
  )
}

export default DeleteProfileComponent
