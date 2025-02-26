import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import "react-tooltip/dist/react-tooltip.css"
import { Box, useMantineColorScheme } from "@mantine/core"
import { Tooltip } from "react-tooltip"

const WorldMap = ({ data }) => {
  const countries = {}
  data.forEach((country) => {
    countries[country.country_en] = country
  })
  const { colorScheme } = useMantineColorScheme()
  
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
        <Geographies geography={"/map.json"}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = countries[geo.properties.name] || { clicks: 0, views: 0, subscribe: 0 }
              const hasClicks = countryData.clicks > 0
              
              return (
                <Geography
                  data-tooltip-id={hasClicks ? "world-map-tooltip" : ""}
                  data-tooltip-content={hasClicks ? geo.properties.name : ""}
                  data-tooltip-html={hasClicks ? `<div class="map-tooltip"><p class="map-tooltip-title">${geo.properties.name}</p><ul>
                    <li>Clicks: ${countryData.clicks || 0}</li>
                    </ul></div>` : ""}
                  data-tooltip-place="top"
                  data-tooltip-float={hasClicks}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: hasClicks 
                        ? colorScheme === "dark" 
                          ? "var(--mantine-color-primary-7)" 
                          : "var(--mantine-color-primary-4)"
                        : colorScheme === "dark" 
                          ? "var(--mantine-color-gray-5)" 
                          : "#D6D6D6",
                      stroke: "#fafafa",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: hasClicks ? "var(--mantine-color-primary-6)" : "#9E1E7D",
                      outline: "none",
                    },
                    pressed: {
                      fill: "var(--mantine-color-primary-8)",
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id="world-map-tooltip" />
    </Box>
  )
}

export default WorldMap