import { createSlice } from '@reduxjs/toolkit';
import { groupAvatar } from '../../assets';


const initialState = {
  bioImage: groupAvatar[0], 
  image_type:"avatar",
  uploadedImage: null,
  main_button_color:'',
  main_text_color:'sss'
};

const generalSlice = createSlice({
  name: 'GeneralSlice',
  initialState,
  reducers: {
    setBioImage: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.bioImage = [...action.payload]; 
      } else {
        state.bioImage = action.payload; 
      }
    },
    setImage_type:(state,action) => {
      state.image_type = action.payload
    },setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload; 
    },setMain_button_color: (state, action) => {
      state.main_button_color = action.payload; 
    },setMain_text_color: (state, action) => {
      state.main_text_color = action.payload; 
    },
  },
});

export const { setBioImage , setImage_type , setUploadedImage,setMain_button_color,setMain_text_color} = generalSlice.actions;
export default generalSlice.reducer;
