import { Button, Container, Stack, Text, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { Link } from "@/lib/i18n/navigation"

const SubscriptionExpired = () => {
  const { t } = useTranslation()

  return (
    <Container size="sm">
      <Stack align="center" justify="center" gap="xl" py={120}>
        <Stack align="center" gap="md">
          <Title order={1} ta="center">
            {t("subscription.expired.title")}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={480}>
            {t("subscription.expired.description")}
          </Text>
        </Stack>
        <Button component={Link} to="/plans" size="lg">
          {t("subscription.expired.renew")}
        </Button>
      </Stack>
    </Container>
  )
}

export default SubscriptionExpired