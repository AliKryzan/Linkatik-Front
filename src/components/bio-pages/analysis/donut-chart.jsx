import { DonutChart } from "@mantine/charts"
import { Group, Stack, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"

import { formatDynamicData } from "../../../utils/formate-statistics-data"

export const DynamicDonutChart = ({ data, title }) => {
  const formattedData = formatDynamicData(data)
  const { t } = useTranslation()

  return (
    <div className="chart-container">
      <Text className="chart-title">
        <span></span>
        {t(`bioPages.analysis.${title}`)}
      </Text>
      <Group className="donut-chart-wrapper" justify="space-between">
        <Stack gap="xs">
          {formattedData.map((element) => {
            return (
              <Group key={element.name} align="center">
                <span style={{ backgroundColor: element.color }} className="color-indicator"></span>
                <Text size="sm" c="gray.4" key={element.name}>
                  {element.name} ({element.value})
                </Text>
              </Group>
            )
          })}
        </Stack>
        <DonutChart tooltipDataSource="segment" data={formattedData} />
      </Group>
    </div>
  )
}
