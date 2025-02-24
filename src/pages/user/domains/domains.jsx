import { Button, Stack } from "@mantine/core"
import { useTranslation } from "react-i18next"

import ListDomains from "@/components/domains/list-domains"
import TableHeader from "@/components/table/table-header"
import { Link } from "@/lib/i18n/navigation"

const Domains = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"} >
      <TableHeader title={t("domains.title")}>
        <Button component={Link} to="/user/domains/add-domain">
          {t("domains.addButton")}
        </Button>
      </TableHeader>
      <ListDomains />
    </Stack>
  )
}

export default Domains
