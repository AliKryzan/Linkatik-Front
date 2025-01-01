function getRandomColor(index) {
  const defaults = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#F44336", // Dark Red
    "#8BC34A", // Light Green
    "#2196F3", // Dark Blue
    "#FFEB3B", // Light Yellow
    "#00BCD4", // Cyan
    "#9C27B0", // Violet
  ]
  if (defaults[index]) return defaults[index]
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
export function formatDynamicData(data) {
  let formattedData = []

  if (data && Array.isArray(data) && length >= 1) {
    const nameKey = Object.keys(data[0] ?? {}).find((key) => key.includes("ar") || key.includes("en"))
    const countKey = Object.keys(data[0] ?? {}).find((key) => key === "clicks")
    formattedData = data.map((item, index) => {
      return {
        name: item[nameKey],
        value: item[countKey],
        color: getRandomColor(index),
      }
    })
  }

  return formattedData
}
