import { Group, Modal, ScrollArea } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { BIOBLOCKS } from "../../config/bio-blocks"
import { CloseBlockModal } from "../../store/bio-block/bio-block-slice"
import FormContext from "./create-block/form-context"
import { CreateBlockLoader } from "./create-block/loader"

const CreateBioBlockModal = () => {
  const { t } = useTranslation()
  const { name } = useSelector((state) => state.bioBlock.block)
  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(CloseBlockModal())
  }
  const Icon = Object.values(BIOBLOCKS)
    .flat()
    .find((block) => block.name === name)?.icon
  return (
    <Modal.Root
      scrollAreaComponent={ScrollArea.Autosize}
      size={["fag", "product"].includes(name) ? "lg" : "md"}
      centered
      opened={name}
      onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group>
              <img width={35} src={Icon} alt={name} />
              {t(`bioBlocks.blocks.${name}`)}
            </Group>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <FormContext>
            <CreateBlockLoader componentKey={name} />
          </FormContext>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

export default CreateBioBlockModal
