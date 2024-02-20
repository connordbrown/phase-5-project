import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const articlesLoadedSlice = createSlice({
    name: 'articlesLoaded',
    initialState,
    reducers: {
        setArticlesLoaded: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setArticlesLoaded } = articlesLoadedSlice.actions;
export default articlesLoadedSlice.reducer;