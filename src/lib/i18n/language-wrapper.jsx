import { Outlet } from "react-router-dom"

import { Navigate, useParams, usePathname } from "./navigation"

const LanguageWrapper = () => {
  const { lang } = useParams()
  const pathname = usePathname()
  if (!lang) {
    return <Navigate to={`${pathname}`} />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default LanguageWrapper
