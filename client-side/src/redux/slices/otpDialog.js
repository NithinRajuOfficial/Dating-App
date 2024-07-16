import { createSlice } from "@reduxjs/toolkit";

const otpLoginDialogSlice = createSlice({
  name: "otpDialog",
  initialState: {
    isOtpDialogOpen: false,
  },
  reducers: {
    toggleOtpDialog: (state) => {
      state.isOtpDialogOpen = !state.isOtpDialogOpen;
    },
  },
});

export const { toggleOtpDialog } = otpLoginDialogSlice.actions;
export default otpLoginDialogSlice.reducer;
