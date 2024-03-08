import {createAsyncThunk} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  rememberMe: boolean;
  role?: string | null;
}

const initState: AuthState = {
  token: null,
  rememberMe: false,
  role: null,
};

export const login = createAsyncThunk('auth/login', async () => {});
