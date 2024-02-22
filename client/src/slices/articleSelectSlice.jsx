import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {},
}

const articleSelectSlice = createSlice({
    name: 'selectedArticle',
    initialState,
    reducers: {
        setSelectedArticle: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setSelectedArticle } = articleSelectSlice.actions;
export default articleSelectSlice.reducer;