// filled buttons
export const Filled = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"filled-button bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const FilledRoundedSm = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"filled-button bio-link rounded-sm " + className} {...props}>
      {children}
    </Component>
  )
}
export const FilledRoundedLg = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"filled-button bio-link rounded-lg " + className} {...props}>
      {children}
    </Component>
  )
}

// outline buttons

export const Outline = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"outline-button bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const OutlineRoundedSm = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"outline-button bio-link rounded-sm " + className} {...props}>
      {children}
    </Component>
  )
}
export const OutlineRoundedLg = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"outline-button bio-link rounded-lg " + className} {...props}>
      {children}
    </Component>
  )
}
// shadow buttons
export const Shadow = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"shadow-button bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const ShadowRoundedSm = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"shadow-button bio-link rounded-sm " + className} {...props}>
      {children}
    </Component>
  )
}
export const ShadowRoundedLg = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"shadow-button bio-link rounded-lg " + className} {...props}>
      {children}
    </Component>
  )
}
// hard shadow buttons
export const HardShadow = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"hard-shadow-button bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const HardShadowRoundedSm = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"hard-shadow-button bio-link rounded-sm " + className} {...props}>
      {children}
    </Component>
  )
}
export const HardShadowRoundedLg = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"hard-shadow-button bio-link rounded-lg " + className} {...props}>
      {children}
    </Component>
  )
}
// custom
export const CustomButtonOne = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"custom-button-one bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const FilledAnimation = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"filled-button-animation bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const CustomButtonTwo = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"custom-button-two bio-link " + className} {...props}>
      {children}
    </Component>
  )
}
export const CustomButtonThree = ({ component: Component = "a", children, className, ...props }) => {
  return (
    <Component className={"custom-button-three " + className} {...props}>
      {children}
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
    </Component>
  )
}

export const Buttons = {
  filled: Filled,
  "filled-animation": FilledAnimation,
  "filled-rounded-sm": FilledRoundedSm,
  "filled-rounded-lg": FilledRoundedLg,
  outline: Outline,
  "outline-rounded-sm": OutlineRoundedSm,
  "outline-rounded-lg": OutlineRoundedLg,
  shadow: Shadow,
  "shadow-rounded-sm": ShadowRoundedSm,
  "shadow-rounded-lg": ShadowRoundedLg,
  "hard-shadow": HardShadow,
  "hard-shadow-rounded-sm": HardShadowRoundedSm,
  "hard-shadow-rounded-lg": HardShadowRoundedLg,
  "custom-1": CustomButtonOne,
  "custom-2": CustomButtonTwo,
  "custom-3": CustomButtonThree,
}
