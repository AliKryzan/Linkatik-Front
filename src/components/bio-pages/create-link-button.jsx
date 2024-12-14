import { Button } from "@mantine/core"
import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"

import { open } from "../../store/bio-block/bio-block-slice"
import ChooseBioBlockModal from "./choose-bio-block-modal"
import CreateBioBlockModal from "./create-bio-block-modal"

const CreateLinkButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(open())
  }
  return (
    <>
      <Button onClick={handleOpen} rightSection={<Plus strokeWidth={1.3} />} radius={"xl"}>
        {t("bioPages.bioPage.addLinkButton")}
      </Button>
      <ChooseBioBlockModal />
      <CreateBioBlockModal />
    </>
  )
}

export default CreateLinkButton
