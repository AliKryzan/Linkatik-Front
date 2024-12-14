// Function to get the text width in pixels
export const getTextWidth = (text, font) => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  context.font = font || "16px Tajawal" // Set the same font as the input
  const metrics = context.measureText(text)
  return metrics.width
}
