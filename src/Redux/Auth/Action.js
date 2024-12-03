import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_BASE_URL } from "../config/api";

export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    if (data.jwt) {
      // Store JWT in localStorage
      localStorage.setItem("jwt", data.jwt);
      
      // Dispatch REGISTER_SUCCESS action to update Redux state
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      
      // Optionally dispatch login to auto-login user (if you want)
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
    console.log("register success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};


export const login = (formData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formData);

    if (data.jwt) {
      // Store JWT in localStorage
      localStorage.setItem("jwt", data.jwt);

      // Dispatch login success
      dispatch({ type: LOGIN_SUCCESS, payload: data });

      // Navigate to profile page on success
      navigate("/profile");
    } else {
      // Handle login failure
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Invalid email or password. Please try again.",
      });
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;

    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage || "An error occurred. Please try again later.",
    });
    console.error("Login error:", errorMessage);
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("user success", data);
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
  window.location.href = '/login';
};