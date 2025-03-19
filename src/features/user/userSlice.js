import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage.js";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk.js";
import { rootURL } from "../../utils/axios.js";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

// Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/users/update-user", user, thunkAPI);
  }
);

// Clear Store
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action) => {
      const { payload } = action;
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { msg } = action.payload;

        rootURL
          .get("/users/current-user", { withCredentials: true })
          .then((response) => {
            const { user } = response.data;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`${msg}: ${user.name}`);
          })
          .catch((error) => {
            toast.error(error.response?.data?.msg || "An error occurred");
          });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`User Updated`);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
