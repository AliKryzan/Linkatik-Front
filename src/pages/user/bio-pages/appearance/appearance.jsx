import { Space, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import ProfileForm from "../../../../components/bio-pages/appearane/profile-form"
import Themes from "../../../../components/bio-pages/appearane/themes"
import Error from "../../../../components/common/error"
import Loader from "../../../../components/common/loader"
import { GetBioPageInfo, GetBioPageThemes } from "../../../../services/utils"

const Appearance = () => {
  const { id } = useParams()

  const { data, status } = useQuery({
    queryKey: ["bio-page-info", id],
    queryFn: () => GetBioPageInfo(id),
  })

  const bioPageThemesQuery = useQuery({
    queryKey: ["bio-page-themes"],
    queryFn: GetBioPageThemes,
  })
  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return (
    <Stack gap={"xl"} >
      <ProfileForm data={data.data} />
      <Space />
      <Themes bioPageThemesQuery={bioPageThemesQuery} data={data.data} />
    </Stack>
  )
}

export default Appearance
