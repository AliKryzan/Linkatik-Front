import { lazy, Suspense } from "react"
import { Group } from "@mantine/core"

import Loader from "../../../common/loader"

const componentMap = {
  countdown: lazy(() => import("./custom/count-down")),
  contact_form: lazy(() => import("./custom/contact-form")),
  divider: lazy(() => import("./custom/divider")),
  text_block: lazy(() => import("./custom/text")),
  socials: lazy(() => import("./custom/socials")),
  file: lazy(() => import("./custom/file")),
  image: lazy(() => import("./custom/file")),
  audio: lazy(() => import("./custom/file")),
  video: lazy(() => import("./custom/file")),
  faq: lazy(() => import("./custom/faq")),
  image_slider: lazy(() => import("./custom/image_slider")),
  header: lazy(() => import("./custom/header")),
  email_collector: lazy(() => import("./custom/email-collector")),
  vcard: lazy(() => import("./custom/contact-details")),
  product: lazy(() => import("./custom/product")),
}

export function BlockSettingsLoader({ componentKey, ...props }) {
  const Component = componentMap[componentKey]

  if (!Component) {
    return null
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
