import { createSlice } from '@reduxjs/toolkit';
import { groupAvatar } from '../../assets';


const initialState = {
  bioImage: groupAvatar[0], 
  image_type:"avatar",
  uploadedImage: null,
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
      state.uploadedImage = action.payload; // تحديث `uploadedImage`
    },
  },
});

export const { setBioImage , setImage_type , setUploadedImage} = generalSlice.actions;
export default generalSlice.reducer;
