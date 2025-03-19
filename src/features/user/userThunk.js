import { rootURL, checkForUnauthorizedResponse } from "../../utils/axios.js";
import { clearAllJobsState } from "../allJobs/allJobsSlice.js";
import { clearValues } from "../job/jobSlice.js";
import { logoutUser } from "./userSlice.js";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await rootURL.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await rootURL.post(url, user);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await rootURL.patch(url, user);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
