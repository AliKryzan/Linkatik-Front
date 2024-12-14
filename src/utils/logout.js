import { LOCALSTORAGE_KEY } from "../config"

export const removeUser = async () => {
  localStorage.removeItem(LOCALSTORAGE_KEY)
}
