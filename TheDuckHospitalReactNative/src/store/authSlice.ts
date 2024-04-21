import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  userInfo: {
    fullName: string | null;
    role: string | null;
    balance?: number;
    haveWallet?: boolean;
  };
}

const initialState: AuthState = {
  token: null,
  userInfo: {
    fullName: null,
    role: null,
    balance: 0,
    haveWallet: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserInfo: (
      state,
      action: PayloadAction<{
        fullName: string | null;
        role: string | null;
        balance: number;
        haveWallet: boolean;
      }>,
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setToken, setUserInfo} = authSlice.actions;
export default authSlice.reducer;
