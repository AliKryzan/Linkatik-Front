import { Outlet, useSearchParams } from "react-router-dom"

import { Navigate, useParams, usePathname } from "./navigation"

const LanguageWrapper = () => {
  const { lang } = useParams()
  const pathname = usePathname()
  const [searchParams] = useSearchParams()
  if (!lang) {
    return <Navigate to={`${pathname}?${searchParams.toString()}`} />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default LanguageWrapper
