import { Box, Select, Text } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"

const CustomSelect = ({ label, ...props }) => {
  const { ref, width } = useElementSize()

  return (
    <Box w={width + 100}>
      <Select
        variant="filled"
        leftSectionWidth={width}
        leftSection={
          <div ref={ref}>
            <Text
              style={{
                whiteSpace: "nowrap",
              }}
              size="sm"
              fw={500}
              px={10}
              c="gray">
              {label}
            </Text>
          </div>
        }
        {...props}
      />
    </Box>
  )
}

export default CustomSelect
