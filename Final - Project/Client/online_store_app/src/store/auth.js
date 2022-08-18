import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: localStorage.getItem("token") ? true : false,
  loggedInName: "Guest",
  loggedInId: "",
  loggedInPhone: "",
  loggedInAddress: "",
  userData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = [];
    },
    updatedUser(state, action) {
      state.userData = action.payload;
    },

    loginUser(state, action) {
      state.loggedInName = action.payload;
    },

    loginId(state, action) {
      state.loggedInId = action.payload;
    },
    loginPhone(state, action) {
      state.loggedInPhone = action.payload;
    },
    loginAddress(state, action) {
      state.loggedInAddress = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
