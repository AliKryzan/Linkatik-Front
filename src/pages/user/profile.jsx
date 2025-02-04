import { Space, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"

import DeleteProfile from "../../components/profile/delete-profile"
import UpdatePassword from "../../components/profile/update-password"
import UpdateProfile from "../../components/profile/update-profile"

const Profile = () => {
  const { t } = useTranslation()

  return (
    <Stack maw={500} gap={"xl"} >
      <Title order={2}>{t("profile.title")}</Title>
      <UpdateProfile />
      <Space />
      <UpdatePassword />
      <Space />
      <DeleteProfile />
      <Space />
    </Stack>
  )
}

export default Profile
