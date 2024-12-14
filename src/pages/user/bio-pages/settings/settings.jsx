import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import SettingsForm from "../../../../components/bio-pages/settings/settings-form"
import Error from "../../../../components/common/error"
import Loader from "../../../../components/common/loader"
import { GetBioPageInfo } from "../../../../services/utils"

const Analysis = () => {
  const { id } = useParams()

  const { data, status } = useQuery({
    queryKey: ["bio-page-info", id],
    queryFn: () => GetBioPageInfo(id),
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return <SettingsForm data={data.data} />
}

export default Analysis
