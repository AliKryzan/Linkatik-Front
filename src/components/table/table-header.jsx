import { Group, Title } from "@mantine/core"

const TableHeader = ({ title, children }) => {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Title order={2}>{title}</Title>
      <div>{children}</div>
    </Group>
  )
}

export default TableHeader
