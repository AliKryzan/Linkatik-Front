import { Table } from "@mantine/core"

const SubscribersBody = ({ data }) => {
  const rows = data.map((element) => {
    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.bio_page.title}</Table.Td>
        <Table.Td>{element.created_at}</Table.Td>
        {/* <Table.Td>{element.filter}</Table.Td> */}
      </Table.Tr>
    )
  })
  return rows
}

export default SubscribersBody
