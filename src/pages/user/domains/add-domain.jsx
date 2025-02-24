import { Alert, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"

import DomainForm from "@/components/domains/domain-form"

const AddDomain = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"}>
      <Stack>
        <Title order={2}>{t("domains.addDomain.title")}</Title>
        <Alert variant="light" color="primary" radius="md">
          {t("domains.addDomain.warning")}
        </Alert>
      </Stack>
      <DomainForm />
    </Stack>
  )
}

export default AddDomain
