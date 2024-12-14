import { describe, expect, it } from "vitest"

import { objectToFormData } from "../utils/obj-to-formdata"

describe("objectToFormData", () => {
  it("converts simple object to FormData", () => {
    const obj = { name: "John", age: 30 }
    const formData = objectToFormData(obj)

    expect(formData.get("name")).toBe("John")
    expect(formData.get("age")).toBe("30")
  })

  it("converts nested objects to FormData", () => {
    const obj = { user: { name: "Alice", age: 25 } }
    const formData = objectToFormData(obj)

    expect(formData.get("user[name]")).toBe("Alice")
    expect(formData.get("user[age]")).toBe("25")
  })

  it("converts arrays to FormData with indexed keys", () => {
    const obj = { tags: ["developer", "designer"] }
    const formData = objectToFormData(obj)

    expect(formData.get("tags[0]")).toBe("developer")
    expect(formData.get("tags[1]")).toBe("designer")
  })

  it("handles Date objects correctly", () => {
    const date = new Date("2022-01-01T00:00:00Z")
    const obj = { createdAt: date }
    const formData = objectToFormData(obj)

    expect(formData.get("createdAt")).toBe(date.toISOString())
  })

  it("handles File objects correctly", () => {
    const file = new File(["content"], "example.txt", { type: "text/plain" })
    const obj = { file }
    const formData = objectToFormData(obj)

    expect(formData.get("file")).toBe(file)
  })
})
