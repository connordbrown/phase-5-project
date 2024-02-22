import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.value = action.payload;
        },
        addArticle: (state, action) => {
            state.value.push(action.payload);
        },
        updateArticle: (state, action) => {
            const updatedArticle = action.payload;
            const index = state.value.findIndex(article => article.id === updatedArticle.id);
            if (index !== -1) {
                state.value[index] = updatedArticle;
            }
        },
    }
})

export const { setArticles, addArticle, updateArticle } = articlesSlice.actions;
export default articlesSlice.reducer;