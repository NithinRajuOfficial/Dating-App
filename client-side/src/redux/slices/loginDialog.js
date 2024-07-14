import { createSlice } from "@reduxjs/toolkit";

const loginDialogSlice = createSlice({
  name: "loginDialog",
  initialState: {
    isLoginDialogOpen: false,
  },
  reducers: {
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
  },
});

export const { toggleLoginDialog } = loginDialogSlice.actions;
export default loginDialogSlice.reducer;
