import { Box, ColorInput, Group, Radio, Space, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { imagePlaceholder } from "@/assets"
import { useUploadFile } from "@/hooks/use-upload-file"
import DropzoneComponent from "../../ui/dropzone"
import GradientColorPicker from "../../ui/gradient-color-picker"
import { ThemePreview } from "./theme-preview"

const Background = ({ form }) => {
  const { t } = useTranslation()

  const { control } = form

  const { mutate: upload, isPending: isUploading } = useUploadFile({
    onSuccess(data) {
      form.setValue("bio_page.image", `url(${data.file_url})`)
    },
  })
  const { colorScheme } = useMantineColorScheme()

  return (
    <>
      <Space />
      <Stack gap={"xl"}>
        <div>
          <Text size="xl">{t("bioPages.appearance.themes.form.title")}</Text>
          <Text c={"gray"}>{t("bioPages.appearance.themes.form.description")}</Text>
        </div>
        <Stack gap={"sm"}>
          <Text size="xl">{t("bioPages.appearance.themes.form.background")}</Text>
          <Stack className="box">
            <Controller
              name="bio_page.background_type"
              control={control}
              render={({ field }) => {
                return (
                  <Radio.Group {...field}>
                    <Group gap={"lg"}>
                      <ThemePreview
                        style={{
                          background: form.watch("bio_page.background_color"),
                        }}
                        theme={{ id: "preset", name: t("bioPages.appearance.themes.form.preset") }}
                      />
                      <ThemePreview
                        style={{
                          background: form.watch("bio_page.background_image"),
                        }}
                        theme={{ id: "gradient", name: t("bioPages.appearance.themes.form.gradient") }}
                      />
                      <ThemePreview
                        key={"image"}
                        style={{
                          backgroundImage: form.watch("bio_page.image") || `url(${imagePlaceholder})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        theme={{ id: "image", name: t("bioPages.appearance.themes.form.image") }}
                      />
                    </Group>
                  </Radio.Group>
                )
              }}
            />
            <Space />
            <Space />
            <div>
              {form.watch("bio_page.background_type") === "preset" && (
                <Controller
                  key={"background_color"}
                  name="bio_page.background_color"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Group gap={"sm"}>
                        <Box
                          style={{
                            width: "50px",
                            height: "50px",
                            background: form.watch("bio_page.background_color"),
                            borderRadius: "var(--mantine-radius-md)",
                          }}></Box>
                        <Box
                          style={{
                            borderRadius: "var(--mantine-radius-md)",
                          }}
                          bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
                          px="sm">
                          <ColorInput
                            size="sm"
                            w={200}
                            //leftSection={"HEXA"}
                            format="hexa"
                            variant="unstyled"
                            label={t("bioPages.appearance.themes.color")}
                            {...field}
                          />
                        </Box>
                      </Group>
                    )
                  }}
                />
              )}
              {form.watch("bio_page.background_type") === "gradient" && (
                <Controller
                  key={"background_image"}
                  name="bio_page.background_image"
                  control={control}
                  render={({ field }) => {
                    return (
                      <GradientColorPicker
                        hideInputs
                        hideEyeDrop
                        hideColorGuide
                        hideInputType
                        hideAdvancedSliders
                        value={form.watch("bio_page.background_image")}
                        {...field}
                      />
                    )
                  }}
                />
              )}
              {form.watch("bio_page.background_type") === "image" && (
                <DropzoneComponent
                  loading={isUploading}
                  accept={IMAGE_MIME_TYPE}
                  multiple={false}
                  onDrop={(files) => {
                    upload({
                      files: files[0],
                      collection_name: name,
                    })
                  }}
                />
              )}
            </div>
            {/* <div>
          </div> */}
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Background
