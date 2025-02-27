import React, { useState } from "react"
import { Box, useMantineColorScheme } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { Tooltip } from "react-tooltip"

const getCountryFlag = (countryCode) => {
  // Convert country code to flag emoji
  if (!countryCode) return ""
  // Convert to regional indicator symbols - take only first 2 letters
  const codePoints = [...countryCode.toUpperCase().slice(0, 2)].map((char) => char.charCodeAt(0) + 127397)

  return String.fromCodePoint(...codePoints)
}

const WorldMap = ({ data = [] }) => {
  const [tooltipContent, setTooltipContent] = useState("")

  // Process country data into a lookup object
  const countries = {}
  data.forEach((country) => {
    countries[country.country_en] = country
  })
  const { colorScheme } = useMantineColorScheme()
  const { t } = useTranslation()
  return (
    <Box
      bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
      style={{
        borderRadius: "var(--mantine-radius-lg)",
      }}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          center: [25, 15],
          scale: 180,
        }}
        width={1000}
        height={450}>
        <Geographies geography="/map.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name
              const countryCode = geo.id
              const svgPath = geo.svgPath
              const countryData = countries[countryName] || { clicks: 0, views: 0, subscribe: 0 }
              const hasClicks = countryData.clicks > 0

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-tooltip-id="world-map-tooltip"
                  // data-tooltip-content={hasClicks ? geo.properties.name : ""}
                  // data-tooltip-html={hasClicks ? `<div class="map-tooltip"><p class="map-tooltip-title">${geo.properties.name}</p><ul>
                  //   <li>Clicks: ${countryData.clicks || 0}</li>
                  //   </ul></div>` : ""}
                  // data-tooltip-place="top"
                  // data-tooltip-float={hasClicks}
                  onMouseEnter={() => {
                    const flag = getCountryFlag(countryCode)
                    console.log(flag)
                    const content = `
                      <div class="flex flex-col p-2">
                        <div class="flex flex-col items-center justify-center">
                          <p class="text-5xl">${flag}</p>
                          <p class="font-bold -mt-2">${countryName}</p>
                        </div>
                        ${
                          hasClicks
                            ? `
                        <ul class="mt-2">
                          <li class="text-gray-300">${t(`dashboard.analysis.clicks`)}: ${countryData.clicks}</li>
                         <li class="text-gray-300">${t(`dashboard.analysis.views`)}: ${countryData.views}</li>
                         <li class="text-gray-300">${t(`dashboard.analysis.subscriber`)}: ${countryData.subscribe}</li>
                        </ul>
                        `
                            : ""
                        }
                      </div>
                    `
                    setTooltipContent(content)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("")
                  }}
                  style={{
                    default: {
                      fill: hasClicks ? "#4299e1" : "#d1d5db",
                      stroke: "#f5f5f5",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: hasClicks ? "#3182ce" : "#9e1e7d",
                      stroke: "#f5f5f5",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#2c5282",
                      stroke: "#f5f5f5",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      <Tooltip id="world-map-tooltip" html={tooltipContent} className="shadow-lg" float={true} />
    </Box>
  )
}

export default WorldMap
