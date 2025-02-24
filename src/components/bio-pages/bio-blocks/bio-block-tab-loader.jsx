import { lazy, Suspense } from "react"
import { Group } from "@mantine/core"

import Loader from "@/components/common/loader"

const componentMap = {
  settings: lazy(() => import("./settings/block-settings")),
  schedule: lazy(() => import("./schedule/block-schedule")),
  redirect: lazy(() => import("./redirect/block-redirect")),
  prioritize: lazy(() => import("./prioritize/block-prioritize")),
  lock: lazy(() => import("./lock/block-lock")),
  thumbnail: lazy(() => import("./thumbnail/block-thumbnail")),
}

export function BioBlockTabLoader({ componentKey, ...props }) {
  const Component = componentMap[componentKey]

  if (!Component) {
    return <div>Component not found</div>
  }

  return (
    <Suspense
      fallback={
        <Group p="md" justify="center">
          <Loader size="sm" />
        </Group>
      }>
      <Component {...props} />
    </Suspense>
  )
}
