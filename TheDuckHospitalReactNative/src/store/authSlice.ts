import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  userInfo: {
    fullName: string | null;
    role: string | null;
  };
}

const initialState: AuthState = {
  token: null,
  userInfo: {
    fullName: null,
    role: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<{ fullName: string; role: string }>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setToken, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
