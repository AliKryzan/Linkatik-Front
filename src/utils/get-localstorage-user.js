import { LOCALSTORAGE_KEY } from "../config"

const getLocalstorageUser = () => {
  try {
    const rowUser = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!rowUser) return null

    const user = JSON.parse(rowUser)
    if (!user.token) return null

    return user
  } catch {
    return null
  }
}

export { getLocalstorageUser }
