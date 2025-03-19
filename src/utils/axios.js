import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

export const rootURL = axios.create({
  baseURL: "https://mern-job-app-tyd0.onrender.com/api",
});

rootURL.interceptors.request.use((configuration) => {
  const user = getUserFromLocalStorage();
  if (user) {
    configuration.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return configuration;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
