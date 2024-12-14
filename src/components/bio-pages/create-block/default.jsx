import { TextInput } from "@mantine/core"
import { Link, Loader2 } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import LinkBehavior from "../bio-blocks/settings/link-behavior"

const DefaultForm = () => {
  const { t } = useTranslation()

  const { formState, control, linkBehaviorOptions, checkURL, status } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        name="url"
        render={({ field }) => (
          <TextInput
            disabled={status === "pending"}
            size="md"
            placeholder="https://example.com"
            leftSection={
              status === "pending" ? <Loader2 size={14} className="spinner" /> : <Link size={14} />
            }
            type="url"
            label={t("bioBlocks.createBlock.urlInputLabel")}
            error={formState.errors.url?.message && t(`bioBlocks.errors.${formState.errors.url?.message}`)}
            {...field}
            onBlur={(e) => {
              checkURL(e.target.value)
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            size="md"
            label={t("bioBlocks.createBlock.titleInputLabel")}
            error={
              formState.errors.title?.message && t(`bioBlocks.errors.${formState.errors.title?.message}`)
            }
            {...field}
          />
        )}
      />
      {linkBehaviorOptions?.length > 0 && (
        <LinkBehavior blockLinkBehaviorOptions={linkBehaviorOptions} control={control} />
      )}
    </>
  )
}

export default DefaultForm
