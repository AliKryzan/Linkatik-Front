import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import './index.css'
import App from "./App.jsx"

import "./lib/i18n/index.js"
import AppErrorBoundary from "./components/common/app-error-boundary"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppErrorBoundary>
    <App /></AppErrorBoundary>
  </StrictMode>,
)
