export function generateWebComponent(name, html, css) {
  if (!html && !css) return null
  if (!customElements.get(name)) {
    class CustomElement extends HTMLElement {
      constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        shadow.innerHTML = `
            <style>${css} 
                border-radius: 2.9rem;
              </style>
            ${html}
          `
      }
    }
    customElements.define(name, CustomElement)
  }
  return `<${name}></${name}>`
}
