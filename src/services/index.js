import axios from "axios"

import { LOCALSTORAGE_KEY } from "../config"
import { getLang } from "../utils/get-lang"

const API_URL = "https://back-dev-project.linkatik.com/api"

export const AuthLinkatikApi = axios.create({
  baseURL: API_URL,
})
export const LinkatikApi = axios.create({
  baseURL: API_URL,
})

LinkatikApi.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined")
      throw new Error("A request happened on the server that supposed to run on client")

    const lang = getLang()
    config.headers["Accept-Language"] = lang
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
AuthLinkatikApi.interceptors.request.use(
  (config) => {
    console.log("🚀 ~ config:", config.url)
    if (typeof window === "undefined")
      throw new Error("A request happened on the server that supposed to run on client")

    const lang = getLang()
    config.headers["Accept-Language"] = lang
    const rowUser = window.localStorage.getItem(LOCALSTORAGE_KEY)
    if (!rowUser) new Error("unauthorized")

    const parsedUser = JSON.parse(rowUser)

    config.headers["Authorization"] = `Bearer ${parsedUser.token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
AuthLinkatikApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log("🚀 ~ error:", error.response.data)
    if (error.response?.status === 401 || error.response?.data?.message.includes("Unauthenticated")) {
      window.localStorage.removeItem(LOCALSTORAGE_KEY)
      window.location = "/"
    }
    if (error.response?.status === 403 && error.response?.data?.message === "خطة الاشتراك الخاصة بك قد انتهت") {
      window.location = "/user/subscription-expired"
    }
    return Promise.reject(error)
  },
)
