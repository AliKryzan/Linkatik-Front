import React from "react"
import { Box, Select, Text } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"

// eslint-disable-next-line no-unused-vars
const CustomSelect = React.forwardRef(function Com({ label, ...props }, ref) {
  const { ref: elementRef, width } = useElementSize()

  return (
    <Box w={width + 100}>
      <Select
        variant="filled"
        allowDeselect={false}
        leftSectionWidth={width}
        leftSection={
          <div ref={elementRef}>
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
})

export default CustomSelect
