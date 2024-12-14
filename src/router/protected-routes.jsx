import { Navigate } from "../lib/i18n/navigation"
import { getLocalstorageUser } from "../utils/get-localstorage-user"
import { isAuthenticated } from "../utils/is-authenticated"

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  const user = getLocalstorageUser()
  if (!user?.plan_settings) {
    return <Navigate to="/plans" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
