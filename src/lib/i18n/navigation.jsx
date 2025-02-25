import React from "react"
import {
  Link as ReactRouterLink,
  Navigate as ReactRouterNavigate,
  NavLink as ReactRouterNavLink,
  useParams as uesReactRouterParams,
  useLocation,
  useNavigate as useReactRouterNavigate,
} from "react-router-dom"

import { LOCALES } from "../../config"
import { useTranslation } from "react-i18next"

export const useChangeLocale = () => {
  const navigate = useReactRouterNavigate()
  const location = useLocation()
  const { lang } = useParams()
  const { i18n } = useTranslation()

  return (newLocale) => {
    // Change URL locale
    const newPath = location.pathname.replace(`/${lang}`, `/${newLocale}`)
    navigate(newPath)
    
    // Change i18next language
    i18n.changeLanguage(newLocale)
    
    // Change document direction
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  }
}

export const useCurrentLocale = () => {
  const { lang } = useParams()
  return lang || "ar"
}

// wrappers for react-router-dom elements to add language prefix on navigation
export const useParams = () => {
  const params = uesReactRouterParams()
  const allowedLocales = LOCALES
  if (params.lang && !allowedLocales.includes(params.lang)) {
    params.lang = undefined
  }
  return params
}
export const Link = React.forwardRef(function Comp({ to, ...props }, ref) {
  const { lang } = useParams()
  return <ReactRouterLink to={`/${lang || "ar"}${to}`} ref={ref} {...props} />
})

export const NavLink = ({ to, ...props }) => {
  const { lang } = useParams()
  return <ReactRouterNavLink to={`/${lang || "ar"}${to}`} {...props} />
}
export const Navigate = ({ to, ...props }) => {
  const { lang } = useParams()
  return <ReactRouterNavigate to={`/${lang || "ar"}${to}`} {...props} />
}

export const useNavigate = () => {
  const { lang } = useParams()
  const navigate = useReactRouterNavigate()
  return (to) => {
    return navigate(`/${lang || "ar"}${to}`)
  }
}

export const usePathname = () => {
  const location = useLocation()
  const { lang } = useParams()
  return location.pathname.replace(`/${lang}`, "")
}
