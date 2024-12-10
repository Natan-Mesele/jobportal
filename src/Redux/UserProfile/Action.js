import api from "../config/api";
import { CREATE_PROFILE_FAILURE, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

export const createProfile = (formData, jwt) => async (dispatch) => {
  dispatch({ type: CREATE_PROFILE_REQUEST });

  // Ensure JWT is available
  if (!jwt) {
    console.error("JWT is missing or invalid.");
    dispatch({
      type: CREATE_PROFILE_FAILURE,
      payload: "You need to be logged in to create a profile.",
    });
    return; // Don't proceed if JWT is missing
  }

  try {
    const { data } = await api.post('/api/user-profile', formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: data });
    console.log("Profile created successfully:", data);
  } catch (error) {
    console.error("Profile creation failed:", error);
    dispatch({
      type: CREATE_PROFILE_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

  
  // Update user profile
  export const updateProfile = (profileData, token) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      const { data } = await api.put('/api/user-profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };