import { Box, Pagination, Table, useMantineColorScheme } from "@mantine/core"

import { theme } from "@/lib/mantine/theme"

const TableContainer = ({ head, rows, minWidth, page, setPage, totalPages }) => {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Table.ScrollContainer minWidth={minWidth || 900} b>
      <Table borderColor={colorScheme === "light" ? theme.colors.gray[2] : theme.colors.gray[8]}>
        <Table.Thead>
          <Table.Tr>{head}</Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {totalPages > 1 && (
        <Box py={"lg"}>
          <Pagination onChange={setPage} value={page} total={totalPages} />
        </Box>
      )}
    </Table.ScrollContainer>
  )
}

export default TableContainer
