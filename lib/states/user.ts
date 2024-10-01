import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "models";
import { RootState } from 'lib/store'

export const EmptyUserState: UserInfo = {
    id: 0,
    name: "",
    email: "",
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: EmptyUserState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => action.payload, 
        resetUser: () => EmptyUserState
    }
})

export const {setUser, resetUser} = userSlice.actions
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer