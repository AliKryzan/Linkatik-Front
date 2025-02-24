import { Outlet } from "react-router-dom"

import Logo from "@/components/common/logo"
import { Navigate, usePathname } from "../lib/i18n/navigation"
import { isAuthenticated } from "../utils/is-authenticated"

const AuthLayout = () => {
  const whiteList = ["/forgot-password", "/reset-password", "/plans", "/payment"]
  const pathname = usePathname()
  if (isAuthenticated() && !whiteList.includes(pathname)) {
    return <Navigate to="/user" replace />
  }

  return (
    <div className="auth-layout">
      <Logo />
      <div className="container">
        {/* <div className="content"> */}
        <Outlet />
        {/* </div> */}
        {/* <div className="side-animation">some lottie animation</div> */}
      </div>
    </div>
  )
}

export default AuthLayout
