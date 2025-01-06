// import React from "react"
// import { Box, ColorInput, Group, useMantineColorScheme } from "@mantine/core"
// import { useFormContext } from "react-hook-form"

// const CustomColorPicker = ({
//     label,field
// }) => {
//   const { control, watch } = useFormContext()
//   const { colorScheme } = useMantineColorScheme()

//   return (
//     <Group gap={"sm"}>
//       <Box
//         style={{
//           width: "50px",
//           height: "50px",
//           background: watch("settings.color"),
//           borderRadius: "var(--mantine-radius-md)",
//         }}></Box>
//       <Box
//         style={{
//           borderRadius: "var(--mantine-radius-md)",
//         }}
//         bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
//         px="sm">
//         <ColorInput
//           size="sm"
//           w={200}
//           leftSection={"HEX"}
//           variant="unstyled"
//           label={t("bioBlocks.createBlock.custom.divider.color")}
//           {...field}
//         />
//       </Box>
//     </Group>
//   )
// }

// export default CustomColorPicker
