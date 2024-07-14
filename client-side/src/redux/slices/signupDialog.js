import { createSlice } from "@reduxjs/toolkit";

const signupDialogSlice = createSlice({
  name: "signupDialog",
  initialState: {
    isSignupDialogOpen: false,
  },
  reducers: {
    toggleSignupDialog: (state) => {
      state.isSignupDialogOpen = !state.isSignupDialogOpen;
    },
  },
});

export const { toggleSignupDialog } = signupDialogSlice.actions;
export default signupDialogSlice.reducer;
