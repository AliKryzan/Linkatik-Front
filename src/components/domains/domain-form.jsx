import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput } from "@mantine/core"
import { isAxiosError } from "axios"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useNavigate } from "@/lib/i18n/navigation"
import { PostDomain, PutDomain } from "@/services/utils"
import { domainSchema } from "@/validation/domain"

const DomainForm = ({ domain }) => {
  const updateForm = domain?.id ? true : false
  const { t } = useTranslation()
  const { control, handleSubmit, formState, setError, reset } = useForm({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: updateForm ? domain.domain : "",
    },
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    if (updateForm) {
      try {
        await PutDomain(domain.id, data)
        toast.success(t("domains.updateDomainPage.successMessage"))
        navigate("/user/domains")
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
        if (isAxiosError(error) && error.status !== 500) {
          setError("root", { message: error.response.data.message })
          return
        }

        setError("root", { message: t(`domains.addDomain.errors.${formState.errors.root?.message}`) })
      }

      return
    }
    try {
      await PostDomain(data)
      reset()
      toast.success(t("domains.addDomain.successMessage"))
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      if (isAxiosError(error) && error.status !== 500) {
        setError("root", { message: error.response.data.message })
        return
      }

      setError("root", { message: t(`domains.addDomain.errors.${formState.errors.root?.message}`) })
    }
  })

  return (
    <Stack component={"form"} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="domain"
        render={({ field }) => (
          <TextInput
            dir="ltr"
            styles={{ input: { direction: "ltr", textAlign: "left" } }}
            label={t("domains.addDomain.domainInput")}
            type="url"
            error={
              formState.errors.domain?.message &&
              t(`domains.addDomain.errors.${formState.errors.domain?.message}`)
            }
            placeholder={t("domains.addDomain.domainInput")}
            {...field}
          />
        )}
      />
      <Button type="submit" loading={formState.isSubmitting}>
        {t(`domains.${updateForm ? "updateDomainPage" : "addDomain"}.button`)}
      </Button>
      {formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root?.message}
        </Text>
      )}
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default DomainForm
