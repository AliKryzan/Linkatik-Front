import { configureStore } from "@reduxjs/toolkit"

import bioBlockReducer from "./bio-block/bio-block-slice"
import counterReducer from "./counter/counter-slice"
import signUpReducer from "./sign-up/sign-up-slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signUp: signUpReducer,
    bioBlock: bioBlockReducer,
  },
})
