import { LOCALSTORAGE_KEY } from "../config"

export const isAuthenticated = () => {
  // Example check: assume a token in localStorage signifies authentication
  try {
    const rowUser = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!rowUser) return false

    const user = JSON.parse(rowUser)
    if (!user.token) return false

    return true
  } catch {
    return false
  }
}
