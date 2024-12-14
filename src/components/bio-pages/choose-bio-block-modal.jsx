import React, { useState } from "react"
import {
  Badge,
  Divider,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { LOCALSTORAGE_KEY } from "../../config"
import { BIOBLOCKS } from "../../config/bio-blocks"
import { close, createBlock } from "../../store/bio-block/bio-block-slice"
import Error from "../common/error"

const BioBock = ({ name, icon, blocked }) => {
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()
  const dispatch = useDispatch()
  const handleClick = () => {
    if (blocked) return
    dispatch(createBlock({ name, icon }))
    dispatch(close())
  }
  return (
    <Tooltip label={blocked ? t(`bioBlocks.general.upgradeMessage`) : t(`bioBlocks.blocks.${name}_d`)}>
      <Group
        onClick={handleClick}
        opacity={blocked ? 0.5 : 1}
        style={{ cursor: blocked ? "default" : "pointer" }}>
        <img width={44} src={icon} alt={t(`bioBlocks.blocks.${name}`)} />
        <Group
          justify="space-between"
          py={"lg"}
          style={{
            flexGrow: 1,
            borderBottom: `1px solid var(${colorScheme === "dark" ? "--mantine-color-gray-8" : "--mantine-color-gray-2"})`,
          }}>
          <Text
            fw={500}
            size="sm"
            style={{
              textDecoration: blocked ? "line-through" : "none",
            }}>
            {t(`bioBlocks.blocks.${name}`)}
          </Text>
          {!blocked && (
            <Badge radius={"xl"} variant="light" color="gray">
              <Text c="blue" size="xs">
                {t("bioBlocks.general.choose")}
              </Text>
            </Badge>
          )}
        </Group>
      </Group>
    </Tooltip>
  )
}
const Blocks = ({ searchValue }) => {
  const { t } = useTranslation()
  const [value] = useLocalStorage({
    key: LOCALSTORAGE_KEY,
    defaultValue: {},
  })
  if (!value.plan_settings?.enabled_bio_link_blocks) return <Error />

  const userAllowedBlocks = { ...value.plan_settings.enabled_bio_link_blocks }

  let blocksToRender = Object.entries(BIOBLOCKS)
  if (searchValue) {
    blocksToRender = blocksToRender.map(([key, value]) => {
      const filteredValues = value.filter((element) => {
        if (
          element.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          t(`bioBlocks.blocks.${element.name}`).includes(searchValue)
        )
          return true
        return null
      })
      return [key, filteredValues]
    })
  }

  blocksToRender = blocksToRender.filter((element) => element[1].length > 0)

  return (
    <Stack p="sm" gap={"lg"}>
      {blocksToRender.map(([key, value], index) => (
        <React.Fragment key={key}>
          <div>
            <Text fw={600}>{t(`bioBlocks.general.${key}Title`)}</Text>
            <Text size="sm" c={"gray"}>
              {t(`bioBlocks.general.${key}Description`)}
            </Text>
          </div>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={55} verticalSpacing={"xl"}>
            {value.map((element) => (
              <BioBock
                blocked={!userAllowedBlocks[element.name]}
                key={element.name}
                name={element.name}
                icon={element.icon}
              />
            ))}
          </SimpleGrid>
          {index < blocksToRender.length - 1 && (
            <>
              <Space />
              <Divider />
              <Space />
            </>
          )}
        </React.Fragment>
      ))}
    </Stack>
  )
}

const SearchInput = ({ state }) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = state
  return (
    <TextInput
      value={searchValue}
      onChange={(event) => setSearchValue(event.currentTarget.value)}
      leftSection={<Search strokeWidth={1.3} />}
      variant="filled"
      placeholder={t(`bioBlocks.general.searchPlaceholder`)}
    />
  )
}

const ModalContent = () => {
  const state = useState("")

  return (
    <>
      <SearchInput state={state} />
      <Blocks searchValue={state[0]} />
    </>
  )
}
const ChooseBioBlockModal = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(close())
  }
  const { chooseModal: opened } = useSelector((state) => state.bioBlock)

  return (
    <>
      <Modal
        styles={{
          title: {
            flexGrow: 1,
            textAlign: "center",
          },
        }}
        scrollAreaComponent={ScrollArea.Autosize}
        centered
        size={"xl"}
        opened={opened}
        onClose={handleClose}
        title={t("bioPages.bioPage.addLinkButton")}>
        <Divider pb={"sm"} />
        <ModalContent />
      </Modal>
    </>
  )
}

export default ChooseBioBlockModal
