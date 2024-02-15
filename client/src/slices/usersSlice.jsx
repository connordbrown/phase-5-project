import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        }
    }
})

export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;