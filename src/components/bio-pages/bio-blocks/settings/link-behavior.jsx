import { Radio, Stack } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const LinkBehavior = ({ blockLinkBehaviorOptions, control }) => {
  const { t } = useTranslation()
  return (
    <Controller
      name="settings.link_behavior"
      control={control}
      render={({ field }) => (
        <Stack p={"md"}>
          <Radio.Group label={t("bioBlocks.tabs.settings.linkBehavior.title")} withAsterisk {...field}>
            <Stack mt="xs">
              {blockLinkBehaviorOptions.map((item) => {
                return <Radio value={item.id} label={item.title} key={item.id} />
              })}
            </Stack>
          </Radio.Group>
        </Stack>
      )}
    />
  )
}

export default LinkBehavior
