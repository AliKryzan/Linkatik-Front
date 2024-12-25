import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import ListSubscribers from "../../../components/subscribers/list-subscribers"
import TableHeader from "../../../components/table/table-header"

const Subscribers = () => {
  const { t } = useTranslation()
  const [value, setValue] = useDebouncedState("", 400)

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("subscribers.title")}>
        <Group wrap="nowrap">
          <TextInput
            placeholder={t("general.search-placeholder")}
            defaultValue={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            size="sm"
            leftSection={<Search size={16} />}
          />
          <Button size="sm">{t("general.export")}</Button>
        </Group>
      </TableHeader>
      <ListSubscribers searchValue={value} />
    </Stack>
  )
}

export default Subscribers
