import { createSlice } from "@reduxjs/toolkit";

const userHobbiesDialogSlice = createSlice({
  name: "userHobbiesDialog",
  initialState: {
    isUserHobbiesDialogOpen: false,
  },
  reducers: {
    toggleUserHobbiesDialog: (state) => {
      state.isUserHobbiesDialogOpen = !state.isUserHobbiesDialogOpen;
    },
  },
});

export const { toggleUserHobbiesDialog } = userHobbiesDialogSlice.actions;
export default userHobbiesDialogSlice.reducer;
