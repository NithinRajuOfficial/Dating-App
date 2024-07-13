import { createSlice } from "@reduxjs/toolkit";

const signupDialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = signupDialogSlice.actions;
export default signupDialogSlice.reducer;
