import { Box, ColorInput, Group, Radio, Space, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import {
  CustomButtonOne,
  CustomButtonThree,
  CustomButtonTwo,
  Filled,
  FilledRoundedLg,
  FilledRoundedSm,
  HardShadow,
  HardShadowRoundedLg,
  HardShadowRoundedSm,
  Outline,
  OutlineRoundedLg,
  OutlineRoundedSm,
  Shadow,
  ShadowRoundedLg,
  ShadowRoundedSm,
  FilledAnimation
} from "./buttons-preview"
import { useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"



const Buttons = ({ form }) => {
  const { t } = useTranslation()
  const { control } = form
  const { colorScheme } = useMantineColorScheme()
  const dispatch = useDispatch();
  const { main_button_color , main_text_color} = useSelector((state) => state.GeneralSlice)
  const button_color = form.watch('bio_link.button_color')
  return (
    <>
      <Space />

      <Stack gap={"sm"} >
        <Text size="xl">{t("bioPages.appearance.themes.form.buttons")}</Text>
        <Stack className="box">
          <Controller
            name="bio_link.type"
            control={control}
            render={({ field }) => {
              return (
                <Radio.Group {...field}>
                  <Stack>
                    <Stack>
                      <Text size="sm">{t("bioPages.appearance.themes.form.button-types.filled")}</Text>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        <Radio.Card className="button-preview" value={"filled"}>
                          <Radio.Indicator className="indicator" />
                          <Filled />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="filled-rounded-sm">
                          <Radio.Indicator className="indicator" />
                          <FilledRoundedSm />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="filled-rounded-lg">
                          <Radio.Indicator className="indicator" />
                          <FilledRoundedLg />
                        </Radio.Card>
                      </div>
                    </Stack>
                    <Space />
                    {/* outlined */}
                    <Stack>
                      <Text size="sm">{t("bioPages.appearance.themes.form.button-types.outline")}</Text>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        <Radio.Card className="button-preview" value={"outline"}>
                          <Radio.Indicator className="indicator" />
                          <Outline />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="outline-rounded-sm">
                          <Radio.Indicator className="indicator" />
                          <OutlineRoundedSm />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="outline-rounded-lg">
                          <Radio.Indicator className="indicator" />
                          <OutlineRoundedLg />
                        </Radio.Card>
                      </div>
                    </Stack>

                    {/* shadow */}
                    <Stack>
                      <Text size="sm">{t("bioPages.appearance.themes.form.button-types.shadow")}</Text>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        <Radio.Card className="button-preview" value={"shadow"}>
                          <Radio.Indicator className="indicator" />
                          <Shadow />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="shadow-rounded-sm">
                          <Radio.Indicator className="indicator" />
                          <ShadowRoundedSm />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="shadow-rounded-lg">
                          <Radio.Indicator className="indicator" />
                          <ShadowRoundedLg />
                        </Radio.Card>
                      </div>
                    </Stack>
                    {/* hard-shadow */}
                    <Stack>
                      <Text size="sm">{t("bioPages.appearance.themes.form.button-types.hard-shadow")}</Text>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        <Radio.Card className="button-preview" value={"hard-shadow"}>
                          <Radio.Indicator className="indicator" />
                          <HardShadow />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="hard-shadow-rounded-sm">
                          <Radio.Indicator className="indicator" />
                          <HardShadowRoundedSm />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="hard-shadow-rounded-lg">
                          <Radio.Indicator className="indicator" />
                          <HardShadowRoundedLg />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="custom-1">
                          <Radio.Indicator className="indicator" />
                          <CustomButtonOne />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="custom-2">
                          <Radio.Indicator className="indicator" />
                          <CustomButtonTwo />
                        </Radio.Card>
                        <Radio.Card className="button-preview" value="custom-3">
                          <Radio.Indicator className="indicator" />
                          <CustomButtonThree />
                        </Radio.Card>
                        {/* <Radio.Card className="button-preview" value="filled-animation">
                          <Radio.Indicator className="indicator" />
                          <FilledAnimation />
                        </Radio.Card> */}
                      </div>
                    </Stack>
                  </Stack>
                </Radio.Group>
              )
            }}
          />
          <Space />

          <Space />

          <Group>
          
            <Controller
              key={"bio_link.button_color"}
              name="bio_link.button_color"
              control={control}
              render={({ field }) => {
                useEffect(() => {
                  if (!field.value) {
                    field.onChange(main_button_color);
                  }
                }, [field, main_button_color]);
                return (
                  <Group gap={"sm"}>
                    <Box
                      style={{
                        width: "50px",
                        height: "50px",
                        background: form.watch("bio_link.button_color"),
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
                        label={t("bioPages.appearance.themes.form.button-color")}
                        defaultValue={field?.value || main_button_color} 
                        onChange={(color) => field.onChange(color)} 
                        {...field }
                      />
                    </Box>
                  </Group>
                )
              }}
            />
          </Group>
        </Stack>
      </Stack>
    </>
  )
}

export default Buttons
