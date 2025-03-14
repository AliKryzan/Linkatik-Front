import { Badge, Flex, Group, Paper, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Eye, Grid2x2, MousePointerClickIcon, User } from "lucide-react"
import { useTranslation } from "react-i18next"

import { GetBioPageStatistics, GetGeneralStatistics } from "@/services/utils"

const statistics = {
  views: {
    color: "green",
    Icon: Eye,
  },
  clicks: {
    color: "blue",
    Icon: MousePointerClickIcon,
  },
  subscriber: {
    color: "yellow",
    Icon: User,
  },
  blocks: {
    color: "pink",
    Icon: Grid2x2,
  },
}

const GeneralStatistics = ({ id }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["analysis", id || "genral"],
    queryFn: id ? () => GetBioPageStatistics(id) : GetGeneralStatistics,
  })

  console.log('GeneralStatistics',data);
  // Calculate statistics from either array or object data structure
  const statsData = {
    views: Array.isArray(data?.data) 
      ? data.data.length 
      : typeof data?.data?.views === 'number' 
        ? data.data.views 
        : 0,
    clicks: Array.isArray(data?.data) 
      ? data.data.length 
      : typeof data?.data?.clicks === 'number' 
        ? data.data.clicks 
        : 0,
    subscriber: Array.isArray(data?.data) 
      ? data.data.filter(item => item?.subscriber).length 
      : typeof data?.data?.subscriber === 'number' 
        ? data.data.subscriber 
        : 0,
    blocks: Array.isArray(data?.data) 
      ? data.data.filter(item => item?.block).length 
      : typeof data?.data?.blocks === 'number' 
        ? data.data.blocks 
        : 0
  }
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()
  return (
    <Stack gap={"sm"}>
      <Text className="chart-title">
        <span></span>
        {t(`dashboard.analysis.title`)}
      </Text>
      <SimpleGrid
        cols={{ base: 2, md: 4 }}
        component={Paper}
        bg={colorScheme == "dark" ? "dark.8" : "gray.1"}
        p="xs"
        radius="lg">
        {Object.keys(statistics).map((key) => {
          const Icon = statistics[key].Icon
          return (
            <Group key={key} component={Paper} py="sm" shadow="sm" px="lg" align="center">
              <Badge size="xl" radius={"xl"} circle color={statistics[key].color}>
                <Flex>
                  <Icon size={19} />
                </Flex>
              </Badge>
              <Stack gap={"xs"}>
                <Text size="xs" c={"gray"}>
                  {t(`dashboard.analysis.${key}`)}
                </Text>
                <Text
                  fw={500}
                  style={{
                    fontSize: "42px",
                    lineHeight: "0.7",
                  }}
                  c={"dark"}>
                  {statsData[key]}
                </Text>
              </Stack>
            </Group>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

export default GeneralStatistics
