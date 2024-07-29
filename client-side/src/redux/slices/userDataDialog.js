import { createSlice } from "@reduxjs/toolkit";

const userDataDialogSlice = createSlice({
  name: "userDataDialog",
  initialState: {
    isUserDataDialogOpen: false,
  },
  reducers: {
    toggleUserDataDialog: (state) => {
      state.isUserDataDialogOpen = !state.isUserDataDialogOpen;
    },
  },
});

export const { toggleUserDataDialog } = userDataDialogSlice.actions;
export default userDataDialogSlice.reducer;
