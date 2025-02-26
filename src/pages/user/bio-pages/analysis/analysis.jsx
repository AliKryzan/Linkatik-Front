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
  
  // Process data for different visualizations
  const processedData = {
    clicks_countries: !data?.data?.length ? [] : data.data.reduce((acc, item) => {
      const country = acc.find(c => c.country_en === item.country)
      if (country) {
        country.clicks++
      } else {
        acc.push({ country_en: item.country, clicks: 1, views: 0, subscribe: 0 })
      }
      return acc
    }, []),
    clicks_os: !data?.data?.length ? [] : data.data.reduce((acc, item) => {
      const os = acc.find(o => o.name === item.os)
      if (os) {
        os.value++
      } else {
        acc.push({ name: item.os || "Unknown", value: 1 })
      }
      return acc
    }, []),
    clicks_browsers: !data?.data?.length ? [] : data.data.reduce((acc, item) => {
      const browser = acc.find(b => b.name === item.browser)
      if (browser) {
        browser.value++
      } else {
        acc.push({ name: item.browser || "Unknown", value: 1 })
      }
      return acc
    }, [])
  }

  return (
    <Stack gap={"xl"}>
      <WorldMap data={processedData.clicks_countries} />
      {/* <GeneralStatistics id={id} /> */}
      <SimpleGrid spacing="lg" cols={2}>
        <DynamicDonutChart title={"clicks_os"} data={processedData.clicks_os} />
        <DynamicDonutChart title={"clicks_browsers"} data={processedData.clicks_browsers} />
      </SimpleGrid>
    </Stack>
  )
}

export default Analysis
