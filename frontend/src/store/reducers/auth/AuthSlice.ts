import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../models/IUser';
import type { AppStore } from '../../store'; 

type AuthState = {
  user: IUser | null
  authToken: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('user') || "{}"), authToken: null } as AuthState,
  reducers: {
    setUser: (
      state,
      {payload: user}: PayloadAction<IUser>
    ) => {
      state.user = user;
      state.authToken = user.authToken;
    },
    clearUser: (
      state,
      {payload }: PayloadAction
    ) => {
      state.user = null;
      state.authToken = null;
    }
  }
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     authApi.endpoints.login.matchFulfilled,
  //     (state, { payload }) => {
  //       if (payload.authToken) {              
  //         state.authToken = payload.authToken
  //       }
  //     }
  //   );
  // }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AppStore) => state.auth.user;
export const selectCurrentToken = (state: AppStore) => state.auth.authToken;
