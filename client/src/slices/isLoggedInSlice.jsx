import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;