import { lazy, Suspense } from "react"

import "@mantine/dates/styles.css"

import Loader from "../../../components/common/loader"

const componentMap = {
  analysis: lazy(() => import("./analysis/analysis")),
  appearance: lazy(() => import("./appearance/appearance")),
  settings: lazy(() => import("./settings/settings")),
  links: lazy(() => import("./bio-page/bio-page")),
}

export function PagesWrapper({ componentKey, ...props }) {
  const Component = componentMap[componentKey]

  console.log("props =====>",{props})
  console.log("componentKey =====>",componentKey)

  if (!Component) {
    return <div>Component not found</div>
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}
