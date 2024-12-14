import { describe, expect, test } from "vitest"

import { getLang } from "../utils/get-lang"

describe("getLang", () => {
  test("should return 'ar' when path starts with '/ar'", () => {
    window.location.pathname = "/ar"
    expect(getLang()).toBe("ar")
  })

  test("should return 'en' when path starts with '/en'", () => {
    window.location.pathname = "/en"
    expect(getLang()).toBe("en")
  })

  test("should return 'ar' when path does not start with '/en'", () => {
    window.location.pathname = "/"
    expect(getLang()).toBe("ar")
  })
})
