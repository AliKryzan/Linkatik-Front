import { Button, Stack, Text, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"

import { Link } from "@/lib/i18n/navigation"
import { updateUser } from "@/utils/update-user"

const ThankYou = () => {
  const { t } = useTranslation()

  updateUser()

  return (
    <Stack w={"500"} gap={"xl"} py={"xl"}>
      <div>
        <Title ta={"center"}>{t("thankYou.title")}</Title>
        <Text size="sm" ta={"center"} mt={9}>
          {t("thankYou.description")}
        </Text>
      </div>
      <Button component={Link} to="/user" radius={"xl"}>
        {t("thankYou.continueButton")}
      </Button>
    </Stack>
  )
}

export default ThankYou
