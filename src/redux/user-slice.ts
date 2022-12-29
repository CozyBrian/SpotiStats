import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  access_token: string;
  refresh_token: string;
};

const initialState: initialStateType = {
  access_token: "",
  refresh_token: "",
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refresh_token = action.payload;
    },
  },
});

export default userState;
