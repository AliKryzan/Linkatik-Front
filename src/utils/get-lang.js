export const getLang = () => {
  const pathName = window.location.pathname
  const lang = pathName.startsWith("/en") ? "en" : "ar"
  return lang
}
