import WorldMap from "@/components/bio-pages/analysis/world-map"

import "@mantine/charts/styles.css"

import { SimpleGrid, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { DynamicDonutChart } from "@/components/bio-pages/analysis/donut-chart"
import GeneralStatistics from "@/components/bio-pages/general-statistics"
import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import { GetBioPageStatistics } from "@/services/utils"

const Analysis = () => {
  const { id } = useParams()
  const { data, status } = useQuery({
    queryKey: ["analysis", id],
    queryFn: () => GetBioPageStatistics(id),
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />

  return (
    <Stack gap={"xl"}>
      <WorldMap data={data.data.clicks_countries} />
      <GeneralStatistics id={id} />
      <SimpleGrid spacing="lg" cols={2}>
        <DynamicDonutChart title={"clicks_os"} data={data.data.clicks_os} />
        <DynamicDonutChart title={"clicks_browsers"} data={data.data.clicks_browsers} />
      </SimpleGrid>
    </Stack>
  )
}

export default Analysis
