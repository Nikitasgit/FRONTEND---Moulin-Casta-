import { createSlice } from "@reduxjs/toolkit";
import { GiToken } from "react-icons/gi";

const initialState = {
  loginStatus: true,
  viewClient: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      const tokenExist = localStorage.getItem("SavedToken");
      if (tokenExist) {
        state.loginStatus = true;
      } else {
        state.loginStatus = false;
      }
    },
    changeViewMode: (state, action) => {
      state.viewClient = action.payload;
    },
  },
});
export default loginSlice.reducer;
export const { changeLoginStatus, changeViewMode } = loginSlice.actions;
