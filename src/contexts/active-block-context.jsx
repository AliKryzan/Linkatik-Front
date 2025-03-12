import { createContext, useContext, useState } from "react"

const ActiveBlockContext = createContext(null)

export const ActiveBlockProvider = ({ children }) => {
  const [activeBlockId, setActiveBlockId] = useState(null)

  const value = {
    activeBlockId,
    setActiveBlockId,
    isBlockActive: (blockId) => activeBlockId === blockId,
  }

  return <ActiveBlockContext.Provider value={value}>{children}</ActiveBlockContext.Provider>
}

export const useActiveBlock = () => {
  const context = useContext(ActiveBlockContext)
  if (!context) {
    throw new Error("useActiveBlock must be used within an ActiveBlockProvider")
  }
  return context
}