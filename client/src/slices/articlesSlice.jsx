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
        deleteArticle: (state, action) => {
            const articleID = action.payload;
            state.value = state.value.filter(article => article.id !== articleID);
        }
    }
})

export const { setArticles, addArticle, updateArticle, deleteArticle } = articlesSlice.actions;
export default articlesSlice.reducer;