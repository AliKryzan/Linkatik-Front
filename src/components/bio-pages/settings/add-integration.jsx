import { Badge, Group, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { useTranslation } from "react-i18next"

import { INTEGRATIONS } from "../../../config"

const Integration = ({ name, icon, blocked }) => {
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()
  const handleClick = () => {
    if (blocked) return
  }
  return (
    // <Tooltip label={blocked ? t(`upgradeMessage`) : t(`bioBlocks.blocks.${name}_d`)}>
    <Group
      onClick={handleClick}
      opacity={blocked ? 0.5 : 1}
      style={{ cursor: blocked ? "default" : "pointer" }}>
      <img width={44} src={icon} alt={t(`bioPages.settings.commerce.form.${name}`)} />
      <Group
        justify="space-between"
        py={"lg"}
        style={{
          flexGrow: 1,
          borderBottom: `1px solid var(${colorScheme === "dark" ? "--mantine-color-gray-8" : "--mantine-color-gray-2"})`,
        }}>
        <Text
          fw={500}
          size="sm"
          style={{
            textDecoration: blocked ? "line-through" : "none",
          }}>
          {t(`bioPages.settings.commerce.form.${name}`)}
        </Text>
        {!blocked && (
          <Badge radius={"xl"} variant="light" color="blue">
            <Text c="blue" size="xs">
              {t("bioPages.settings.commerce.form.connect")}
            </Text>
          </Badge>
        )}
      </Group>
    </Group>
    // </Tooltip>
  )
}
const Blocks = () => {
  const blocksToRender = Object.values(INTEGRATIONS)
  return (
    <Stack p="sm" gap={"lg"}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={55} verticalSpacing={"xl"}>
        {blocksToRender.map((element) => (
          <Integration key={element.name} name={element.name} icon={element.icon} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

const AddIntegration = () => {
  return (
    <>
      <Blocks />
    </>
  )
}

export default AddIntegration
