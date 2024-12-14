export const getScale = (value) => {
  switch (value) {
    case 0:
      return "xs"
    case 25:
      return "sm"
    case 50:
      return "md"
    case 75:
      return "lg"
    case 100:
      return "xl"
    default:
      return "xl"
  }
}
