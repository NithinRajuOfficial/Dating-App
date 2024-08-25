import { createSlice } from "@reduxjs/toolkit";

const userLoggedIn = createSlice({
  name: "userLoggedIn",
  initialState: {
    isUserLoggedIn: false,
  },
  reducers: {
    toggleUserLogStatus: (state) => {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
  },
});

export const { toggleUserLogStatus } = userLoggedIn.actions;
export default userLoggedIn.reducer;
