import { lazy, Suspense } from "react"
import { Group } from "@mantine/core"

import Loader from "../../common/loader"
import DefaultForm from "./default"

const componentMap = {
  header: lazy(() => import("./header")),
  countdown: lazy(() => import("./count-down")),
  contact_form: lazy(() => import("./contact-form")),
  divider: lazy(() => import("./divider")),
  text_block: lazy(() => import("./text")),
  socials: lazy(() => import("./socials")),
  discord: lazy(() => import("./discord")),
  file: lazy(() => import("./file")),
  pdf_document: lazy(() => import("./file")),
  image: lazy(() => import("./file")),
  audio: lazy(() => import("./file")),
  video: lazy(() => import("./file")),
  faq: lazy(() => import("./faqs")),
  image_slider: lazy(() => import("./image-slider")),
  email_collector: lazy(() => import("./email-collector")),
  vcard: lazy(() => import("./contact-details")),
  product: lazy(() => import("./product")),
}

export function CreateBlockLoader({ componentKey, ...props }) {
  const Component = componentMap[componentKey] || DefaultForm

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
