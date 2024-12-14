import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chooseModal: false,
  block: {
    name: "",
    icon: "",
  },
}

const bioBlockSlice = createSlice({
  name: "bioBlock",
  initialState,
  reducers: {
    open: (state) => {
      state.chooseModal = true
    },
    close: (state) => {
      state.chooseModal = false
    },
    createBlock: (state, action) => {
      state.block = action.payload
    },
    CloseBlockModal: (state) => {
      state.block = initialState.block
    },
  },
})

export const { open, close, createBlock, CloseBlockModal } = bioBlockSlice.actions
export default bioBlockSlice.reducer
