import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: null,
};

const cropImageSlice = createSlice({
    name: 'cropImage',
    initialState,
    reducers: {
        setCropImage: (state, action) => {
            state.image = action.payload;
        },
        clearCropImage: () => initialState, // Return the initial state to reset the state
    },
});

export const { setCropImage, clearCropImage } = cropImageSlice.actions;

export const selectCropImage = (state) => state.cropImage.image;

export default cropImageSlice.reducer;
