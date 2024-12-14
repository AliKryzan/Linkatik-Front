// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "./styles/normalize.css"
import "@mantine/core/styles.css"
import "./styles/main.scss"

import { ColorSchemeScript, DirectionProvider, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Toaster } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { RouterProvider } from "react-router-dom"

import { theme } from "./lib/mantine/theme"
import { ReactQueryProvider } from "./lib/react-query/react-query-provider"
import { MyRouter } from "./router/router"
import StoreProvider from "./store/provider"

export default function App() {
  const { i18n } = useTranslation()
  const dir = i18n.dir()
  document.documentElement.dir = dir

  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider theme={theme} defaultColorScheme="light">
        <ModalsProvider>
          <DirectionProvider initialDirection={dir} detectDirection>
            <StoreProvider>
              <ReactQueryProvider>
                <RouterProvider router={MyRouter}></RouterProvider>
                <Toaster
                  toastOptions={{
                    duration: 5000,
                  }}
                  position="bottom-left"
                  reverseOrder={false}
                />
              </ReactQueryProvider>
            </StoreProvider>
          </DirectionProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
