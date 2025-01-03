import { ActionIcon, Badge, Group, Image, Menu, Table, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { useQueryClient } from "@tanstack/react-query"
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { imagePlaceholder } from "../../../assets"
import { Link } from "../../../lib/i18n/navigation"
import { DeleteProduct } from "../../../services/utils"

const productType = {
  booking: {
    color: "blue",
    variant: "dot",
  },
  digital: {
    color: "orange",
    variant: "dot",
  },
}
const pricing_type = {
  free: {
    color: "green",
    variant: "dot",
  },
  single_payment: {
    color: "orange",
    variant: "dot",
  },
  pay_what_you_want: {
    color: "blue",
    variant: "dot",
  },
  membership: {
    color: "pink",
    variant: "dot",
  },
}
const ProductsTableBody = ({ data }) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  const queryKey = {
    queryKey: ["products"],
  }
  const rows = data.map((element) => {
    const openDeleteModal = () =>
      modals.openConfirmModal({
        title: t("products.deleteProductModal.title"),
        centered: true,
        children: (
          <Text size="sm">{t("products.deleteProductModal.description", { domain: element.product })}</Text>
        ),
        labels: {
          confirm: t("products.deleteProductModal.deleteButton"),
          cancel: t("products.deleteProductModal.cancelDeleteButton"),
        },
        confirmProps: { color: "red" },
        onCancel: () => console.log("Cancel"),
        onConfirm: async () => {
          try {
            await queryClient.setQueriesData(queryKey, (old) => {
              if (!old) return
              return {
                data: old.data.filter((item) => item.id !== element.id),
                pagination: old.pagination,
              }
            })
            await DeleteProduct(element.id)
            await queryClient.invalidateQueries(queryKey)
            toast.success(t("products.deleteProductModal.successMessage"))
          } catch (error) {
            console.log("🚀 ~ onConfirm:async ~ error:", error)
            toast.success(t("products.deleteProductModal.errorMessage"))
          }
        },
      })
    return (
      <Table.Tr key={element.id}>
        <Table.Td>
          <Group component={Link} to={"/preview/product/" + element.slug} c={"gray"}>
            <div>
              <Image
                w={60}
                h={60}
                fit="cover"
                src={element.image}
                alt="linkatik"
                fallbackSrc={imagePlaceholder}
              />
            </div>
            {element.title}
          </Group>
        </Table.Td>
        <Table.Td>{element.price}</Table.Td>
        <Table.Td>{element.max_price}</Table.Td>
        <Table.Td>{element.price * element.sales_count}</Table.Td>
        <Table.Td>{element.sales_count}</Table.Td>
        <Table.Td>
          <Badge {...productType[element.type]}>{t(`products.table.general.${element.type}`)}</Badge>
        </Table.Td>
        <Table.Td>
          <Badge {...pricing_type[element.pricing_type]}>
            {t(`products.table.general.${element.pricing_type}`)}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon radius={"sm"} variant="transparent">
                <EllipsisVertical strokeWidth={1} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                state={{ product: element }}
                to={"/user/products/" + element.id}
                leftSection={<Pencil size={16} />}>
                {t("products.updateButton")}
              </Menu.Item>

              <Menu.Item onClick={openDeleteModal} color="red" leftSection={<Trash2 size={16} />}>
                {t("products.deleteButton")}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    )
  })
  return rows
}

export default ProductsTableBody
