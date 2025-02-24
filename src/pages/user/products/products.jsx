import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { Plus, Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import ListProducts from "@/components/products/list-products"
import TableHeader from "@/components/table/table-header"
import { Link } from "@/lib/i18n/navigation"

const Products = () => {
  const { t } = useTranslation()
  const [value, setValue] = useDebouncedState("", 400)

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("products.title")}>
        <Group wrap="nowrap">
          <TextInput
            placeholder={t("products.searchPlaceholder")}
            defaultValue={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            size="sm"
            leftSection={<Search size={16} />}
          />
          <Button visibleFrom="md" size="sm" component={Link} to="/user/products/add-product">
            {t("products.addButton")}
          </Button>
          <ActionIcon bg='red' hiddenFrom="md" size="lg" component={Link} to="/user/products/add-product">
            <Plus />
          </ActionIcon>
        </Group>
      </TableHeader>
      <ListProducts searchValue={value} />
    </Stack>
  )
}

export default Products
