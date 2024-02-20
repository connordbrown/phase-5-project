import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null,
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setArticles } = articlesSlice.actions;
export default articlesSlice.reducer;