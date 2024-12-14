import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslation } from "react-i18next"

import CreateBioPageForm from "./create-bio-page-form"

const CreateBioPageButton = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open}>{t("bioPages.addButton")}</Button>
      <Modal centered opened={opened} onClose={close} title={t("bioPages.addButton")}>
        <CreateBioPageForm />
      </Modal>
    </>
  )
}

export default CreateBioPageButton
