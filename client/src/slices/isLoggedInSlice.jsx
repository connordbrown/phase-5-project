import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}

const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const { setIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;