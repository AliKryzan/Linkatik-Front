export function generateWebComponent(name, html, css) {
  if (!html && !css) return null
  if (!customElements.get(name)) {
    class CustomElement extends HTMLElement {
      constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        shadow.innerHTML = `
            <style>${css}</style>
            ${html}
          `
      }
    }
    customElements.define(name, CustomElement)
  }
  return `<${name}></${name}>`
}
