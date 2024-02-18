import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.value = action.payload;
        },
        addUser: (state, action) => {
            state.value.push(action.payload);
        },
    }
})

export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;