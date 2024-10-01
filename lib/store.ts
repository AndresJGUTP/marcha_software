import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "models";
import { userSlice } from "./states/user";

export interface AppStore {
  user : UserInfo
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store