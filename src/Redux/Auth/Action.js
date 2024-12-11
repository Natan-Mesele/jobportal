import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_BASE_URL } from "../config/api";

export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    }
    console.log("register success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("userId", data.userId);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          jwt: data.jwt,
          userId: data.userId,
        },
      });
    }
    console.log("Login success", data);
  } catch (error) {
    console.log("Login error:", error);
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