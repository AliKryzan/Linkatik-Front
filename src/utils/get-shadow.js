export const getShadow = (value) => {
  switch (value) {
    case 0:
      return ""
    case 25:
      return "0 2px 4px #ccccccaf"
    case 50:
      return "0 3px 6px #ccccccaf"
    case 75:
      return "0 3px 8px #ccccccaf"
    case 100:
      return "0 4px 12px #ccccccaf"
    default:
      return "0 3px 6px #ccccccaf"
  }
}
