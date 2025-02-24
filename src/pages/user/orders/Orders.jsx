import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import ListOrders from "@/components/orders/list-orders"
import TableHeader from "@/components/table/table-header"

const Orders = () => {
  const { t } = useTranslation()
  const [value, setValue] = useDebouncedState("", 400)

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("orders.title")}>
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
      <ListOrders searchValue={value} />
    </Stack>
  )
}

export default Orders
