import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: null, // Store the base64 string
};

const cropImageSlice = createSlice({
    name: 'cropImage',
    initialState,
    reducers: {
        setCropImage: (state, action) => {
            state.image = action.payload; // Store the base64 string
        },
        clearCropImage: (state) => {
            state.image = null; // Clear the image
        },
    },
});

export const { setCropImage, clearCropImage } = cropImageSlice.actions;

export const selectCropImage = (state) => state.cropImage.image;

export default cropImageSlice.reducer;