import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;