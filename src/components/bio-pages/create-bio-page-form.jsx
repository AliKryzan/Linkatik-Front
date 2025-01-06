import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Stack, Text, TextInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { useNavigate } from "../../lib/i18n/navigation"
import { PostCreateBioPage } from "../../services/utils"
import { BlankBioBaPageSchema } from "../../validation/bio-page"

const CreateBioPageForm = () => {
  const { t } = useTranslation()

  const form = useForm({
    resolver: zodResolver(BlankBioBaPageSchema),
    defaultValues: {
      path: "",
      style: "buttons",
      bio_page_theme_id: 1,
    },
  })

  const { control, handleSubmit, formState, setError } = form
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await PostCreateBioPage(data)
      navigate(`/user/bio-pages/${response.data.data.id}/${response.data.data.path}`)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })
  return (
    <Stack gap={"lg"} component={"form"} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="path"
        render={({ field }) => (
          <div>
            <TextInput
              data-autofocus
              dir="ltr"
              styles={{
                input: { direction: "ltr", textAlign: "left" },
                wrapper: { direction: "ltr", textAlign: "left" },
              }}
              size="md"
              leftSectionWidth={100}
              leftSectionProps={{ bg: "gray" }}
              leftSection={
                <Box>
                  <Text size="sm">{t("bioPages.createPage.pathInput.leftSection")}</Text>
                </Box>
              }
              label={t("bioPages.createPage.pathInput.label")}
              error={
                formState.errors.path?.message &&
                t(`bioPages.createPage.errors.${formState.errors.path?.message}`)
              }
              placeholder={t("bioPages.createPage.pathInput.label")}
              {...field}
              // description={t("bioPages.createPage.pathInput.description")}
            />
            <Text size="sm" c="gray.8" py={2}>
              {t("bioPages.createPage.pathInput.description")}
            </Text>
          </div>
        )}
      />

      <Stack gap={"sm"}>
        <Button loading={formState.isSubmitting} type="submit">
          {t("bioPages.createPage.createButton")}
        </Button>
        {formState.errors.root?.message && (
          <Text c={"red"} size="xs" ta={"center"}>
            {formState.errors.root.message}
          </Text>
        )}
      </Stack>

      <DevTool control={control} />
    </Stack>
  )
}

export default CreateBioPageForm
