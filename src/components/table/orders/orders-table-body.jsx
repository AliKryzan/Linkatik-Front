import { Badge, Table } from "@mantine/core"
import { t } from "i18next"

const OrdersBody = ({ data }) => {
  const statusColors = {
    pending: "orange",
    fail: "red",
    success: "green",
  }
  const rows = data.map((element) => {
    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element?.product?.title}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.subscriber_email}</Table.Td>
        <Table.Td>{element.created_at}</Table.Td>
        <Table.Td>
          <Badge variant="dot" color={statusColors[element.status.toLowerCase()]}>
            {t(`orders.status.${element.status}`)}
          </Badge>
        </Table.Td>
        <Table.Td>{element.subtotal}</Table.Td>
      </Table.Tr>
    )
  })
  return rows
}

export default OrdersBody
