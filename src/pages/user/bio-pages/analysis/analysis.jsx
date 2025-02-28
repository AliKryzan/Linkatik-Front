import WorldMap from "@/components/bio-pages/analysis/world-map"

import "@mantine/charts/styles.css"

import { GetBioPageStatistics } from "@/services/utils"
import { SimpleGrid, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { DynamicDonutChart } from "@/components/bio-pages/analysis/donut-chart"
import GeneralStatistics from "@/components/bio-pages/general-statistics"
import Error from "@/components/common/error"
import Loader from "@/components/common/loader"

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
    clicks_countries: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const country = acc.find((c) => c.country_en === item.country)
          if (country) {
            country.clicks++
          } else {
            acc.push({ country_en: item.country, clicks: 1, views: 0, subscribe: 0 })
          }
          return acc
        }, []),
    clicks_os: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const os = acc.find((o) => o.name === item.os)
          if (os) {
            os.value++
          } else {
            acc.push({ name: item.os || "Unknown", value: 1 })
          }
          return acc
        }, []),
    clicks_browsers: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const browser = acc.find((b) => b.name === item.browser)
          if (browser) {
            browser.value++
          } else {
            acc.push({ name: item.browser || "Unknown", value: 1 })
          }
          return acc
        }, []),
    clicks_devices: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const device = acc.find((b) => b.name === item.device)
          if (device) {
            device.value++
          } else {
            acc.push({ name: item.device || "Unknown", value: 1 })
          }
          return acc
        }, []),
    referrers: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const referrer = acc.find((b) => b.name === item?.referrer)
          if (referrer) {
            referrer.value++
          } else {
            acc.push({ name: item?.referrer || "Unknown", value: 1 })
          }
          return acc
        }, []),
    cities: !data?.data?.length
      ? []
      : data.data.reduce((acc, item) => {
          const city = acc.find((b) => b.name === item?.city)
          if (city) {
            city.value++
          } else {
            acc.push({ name: item?.city || "Unknown", value: 1 })
          }
          return acc
        }, []),
  }

  return (
    <Stack gap={"xl"}>
      <WorldMap data={processedData.clicks_countries} />
      <GeneralStatistics id={id} />
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="col-span-full">
          <DynamicDonutChart title={"referrers"} data={processedData.cities} />
        </div>
        <DynamicDonutChart title={"clicks_os"} data={processedData.clicks_os} />
        <DynamicDonutChart title={"clicks_browsers"} data={processedData.clicks_browsers} />
        <DynamicDonutChart title={"clicks_devices"} data={processedData.clicks_devices} />
        <DynamicDonutChart title={"cities"} data={processedData.cities} />
      </div>
    </Stack>
  )
}

export default Analysis
