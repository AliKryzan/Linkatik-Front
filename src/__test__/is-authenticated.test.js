import { describe, expect, test } from "vitest"

import { LOCALSTORAGE_KEY } from "../config"
import { isAuthenticated } from "../utils/is-authenticated"

describe("isAuthenticated", () => {
  test("returns false when localStorage is empty", () => {
    localStorage.clear()
    expect(isAuthenticated()).toBe(false)
  })

  test("returns false when localStorage has an invalid user data", () => {
    localStorage.setItem(LOCALSTORAGE_KEY, "fake-token")
    expect(isAuthenticated()).toBe(false)
  })
  test("returns true when localStorage has an invalid user data", () => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ token: "fake-token" }))
    expect(isAuthenticated()).toBe(true)
  })
})
