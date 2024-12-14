import toast from "react-hot-toast"

import { LOCALSTORAGE_KEY } from "../config"
import i18n from "../lib/i18n"
import { GetUser } from "../services/utils"

/**
 * Updates the user in local storage and logs the user in
 * @param {string|object} user - either the user object or the user token
 * @returns {Promise<void>}
 */
export const updateUser = async (userDataOrToken) => {
  if (userDataOrToken && typeof userDataOrToken === "object") {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userDataOrToken))
    return
  }
  try {
    const user = await GetUser({ token: userDataOrToken })
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user))
    return user
  } catch (error) {
    console.log("🚀 ~ UpdateUser ~ error:", error)
    toast.error(i18n.t("general.updateUserError"))
  }
}
