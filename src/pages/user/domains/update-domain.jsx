import { Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import DomainForm from "@/components/domains/domain-form"

const UpdateDomain = () => {
  const { t } = useTranslation()
  let { state } = useLocation()

  return (
    <Stack gap={"xl"}>
      <Stack>
        <Title order={2}>{t("domains.updateDomainPage.title")}</Title>
        {/* <Alert variant="light" color="primary" radius="md">
          {t("domains.updateDomain.warning")}
        </Alert> */}
      </Stack>
      <DomainForm domain={state.domain} />
    </Stack>
  )
}

export default UpdateDomain
