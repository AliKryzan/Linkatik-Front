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
  if (!data || !Array.isArray(data)) return []

  // Handle pre-formatted data with name and value properties
  return data.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: getRandomColor(index)
  }))
}
