import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RefreshListState {
  refreshList: boolean;
}

const initialState: RefreshListState = {
  refreshList: false,
};

const refreshListSlice = createSlice({
  name: 'refreshList',
  initialState,
  reducers: {
    setRefreshList: (state, action: PayloadAction<boolean>) => {
      state.refreshList = action.payload;
    },
  },
});

export const { setRefreshList } = refreshListSlice.actions;
export default refreshListSlice.reducer;
