// features/formSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 0,
  errorMessage: "",
  formData: {
    username: "",
    email: "",
    password: "",
    name: "",
    interest_id: "",
    sub_interest_id: "",
  },
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
    },
  },
})

export const { setFormData, resetForm, setStep, setErrorMessage } = formSlice.actions
export default formSlice.reducer
