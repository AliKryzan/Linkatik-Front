import { useSelector } from "react-redux"

import FirstStep from "./fist-step"
import SecondStep from "./second-step"

const SignUp = () => {
  const { step } = useSelector((state) => state.signUp)

  return step === 0 ? <FirstStep /> : <SecondStep />
}

export default SignUp
