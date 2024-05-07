import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  userInfo: {
    phoneNumber: string;
    fullName: string | null;
    role: string | null;
    balance?: number;
    haveWallet?: boolean;
    createdAt?: string;
    numberOfProfile?: number;
    avatar?: string;
  };
}

const initialState: AuthState = {
  token: null,
  userInfo: {
    phoneNumber: '',
    fullName: null,
    role: null,
    balance: 0,
    haveWallet: false,
    createdAt: '',
    numberOfProfile: 0,
    avatar: '',
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
        phoneNumber: string;
        fullName: string | null;
        role: string | null;
        balance: number;
        haveWallet: boolean;
        createdAt: string;
        numberOfProfile: number;
        avatar: string;
      }>,
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setToken, setUserInfo} = authSlice.actions;
export default authSlice.reducer;
