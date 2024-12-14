import { memo, useState } from "react"
import { ActionIcon, Flex, Group, Space, Tabs, Text, useDirection, useMantineTheme } from "@mantine/core"
import { AlignEndHorizontal, Calendar, CornerDownRight, Image, Lock, Settings, Star, X } from "lucide-react"
import { useTranslation } from "react-i18next"

import AutoHeight from "../../common/auto-height"
import { BioBlockTabLoader } from "./bio-block-tab-loader"
import DeleteBioBlockButton from "./delete-block-button"

const BlockTabsOptions = [
  { Icon: Settings, value: "settings" },
  {
    Icon: CornerDownRight,
    value: "redirect",
  },
  {
    Icon: Image,
    value: "thumbnail",
  },
  {
    Icon: Star,
    value: "prioritize",
  },
  {
    Icon: Calendar,
    value: "schedule",
  },
  {
    Icon: Lock,
    value: "lock",
  },
]

const noSettingsTab = [
  "link",
  "buy_me_coffee",
  "snapchat",
  "paypal",
  "facebook",
  "threads",
  "twitter",
  "instagram",
]
const BioBlockTabs = ({ block }) => {
  const { t } = useTranslation()
  const theme = useMantineTheme()
  const { dir } = useDirection()
  const [activeTab, setActiveTab] = useState("")
  return (
    <div>
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius={"sm"} defaultValue="settings">
        <Tabs.List ps={"md"} px={"lg"} pb={"lg"} style={{ gap: "var(--mantine-spacing-sm)" }}>
          <Space />
          <Space />
          <Space />
          {BlockTabsOptions.map(({ value, Icon }) => {
            if (value === "settings" && noSettingsTab.includes(block.type)) return null
            return (
              <Tabs.Tab p={0} key={value} value={value}>
                <Flex p={5} align="center" justify={"center"}>
                  <Icon
                    color={activeTab === value ? "white" : theme.colors.gray[7]}
                    size={23}
                    strokeWidth={1.3}
                  />
                </Flex>
              </Tabs.Tab>
            )
          })}
          <Group gap={4} p={5} align="center" justify={"center"}>
            <AlignEndHorizontal color={theme.colors.gray[7]} size={23} strokeWidth={1.3} />
            <Text size="sm" c="gray.6">
              {block.clicks_count} {dir === "rtl" ? "زيارات" : "clicks"}
            </Text>
          </Group>
          <Flex flex={1} justify="flex-end">
            <DeleteBioBlockButton blockId={block.id} />
          </Flex>
        </Tabs.List>

        {activeTab && (
          <Group bg={theme.colors.primary[1]} p={4}>
            <span style={{ width: "25px" }}></span>
            <Text style={{ flex: 1 }} ta={"center"} c="gray.8">
              {t(`bioBlocks.tabs.${activeTab}.label`)}
            </Text>
            <ActionIcon onClick={() => setActiveTab("")} variant="transparent">
              <X strokeWidth={1.3} size={16} />
            </ActionIcon>
          </Group>
        )}
        <AutoHeight>
          {BlockTabsOptions.map(({ value }) => {
            if ((value === "settings" && noSettingsTab.includes(block.type)) || value !== activeTab)
              return null
            return (
              <Tabs.Panel key={value} value={value}>
                <BioBlockTabLoader componentKey={value} block={block} />
              </Tabs.Panel>
            )
          })}
        </AutoHeight>
      </Tabs>
    </div>
  )
}

export default memo(BioBlockTabs)
