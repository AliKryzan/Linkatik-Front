import { Stack } from "@mantine/core"
import { useTranslation } from "react-i18next"

import ListSubscribers from "../../components/subscribers/list-subscribers"
import TableHeader from "../../components/table/table-header"

const Subscribers = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("subscribers.title")} />
      <ListSubscribers />
    </Stack>
  )
}

export default Subscribers
