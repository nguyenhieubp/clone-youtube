import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: number | null;
  avatar: string;
  name: string;
  email: string;
  password: string;
}

interface InitialState {
  user: User;
}
const initialState: InitialState = {
  user: { _id: null, avatar: "", email: "", password: "", name: "" },
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (token: string | null) => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/auth/checkCurrentUser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
