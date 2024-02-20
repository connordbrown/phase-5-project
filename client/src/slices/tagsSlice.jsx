import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setTags } = tagsSlice.actions;
export default tagsSlice.reducer;