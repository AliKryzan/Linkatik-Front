import React from "react"
import { Box, Text } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useElementSize } from "@mantine/hooks"

const CustomDateTimePicker = React.forwardRef(function Component({ label, ...props }, ref) {
  const { ref: elementRef, width } = useElementSize()

  return (
    <Box w={props.fullWidth ? "100%" : width + 100}>
      <DateTimePicker
        ref={ref}
        valueFormat="DD/MM/YYYY HH:mm"
        variant="filled"
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

export default CustomDateTimePicker
