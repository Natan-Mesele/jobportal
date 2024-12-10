import axios from "axios";

import { CREATE_JOB_FAILURE, CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, DELETE_JOB_FAILURE, DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, GET_ALL_JOBS_FAILURE, GET_ALL_JOBS_REQUEST, GET_ALL_JOBS_SUCCESS, GET_JOB_FAILURE, GET_JOB_REQUEST, GET_JOB_SUCCESS, UPDATE_JOB_FAILURE, UPDATE_JOB_REQUEST, UPDATE_JOB_SUCCESS } from "./ActionType";
import api, { API_BASE_URL } from "../config/api";

export const createJob = (jobData, jwt) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_REQUEST });
    try {
      const response = await api.post(`${API_BASE_URL}/job`, jobData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_JOB_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: CREATE_JOB_FAILURE,
        payload: error.response ? error.response.data : 'Network Error',
      });
    }
  };
  
  // Get a Single Job
export const getJobById = (id, jwt) => async (dispatch) => {
  dispatch({ type: GET_JOB_REQUEST });
  
  try {
    const response = await api.get(`${API_BASE_URL}/api/job/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }, // Ensure Bearer prefix is included
    });
    
    dispatch({
      type: GET_JOB_SUCCESS,
      payload: response.data, // Assuming response.data contains the job details
    });
  } catch (error) {
    dispatch({
      type: GET_JOB_FAILURE,
      payload: error.response ? error.response.data : 'Network Error', // Check for undefined error.response
    });
  }
};
  
  export const getAllJobs = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_JOBS_REQUEST });
  
    try {
      const config = jwt
        ? { headers: { Authorization: `Bearer ${jwt}` } }
        : {};

      const { data } = await api.get('/api/job', config);
      console.log('Fetched Jobs:', data);

      dispatch({ type: GET_ALL_JOBS_SUCCESS, payload: data });
    } catch (error) {
      console.error('Error fetching jobs:', error.response || error);
      dispatch({
        type: GET_ALL_JOBS_FAILURE,
        payload: error.response ? error.response.data : 'Network Error',
      });
    }
  };

  export const updateJob = (id, jobData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_JOB_REQUEST });
    try {
      const response = await api.put(`${API_BASE_URL}/${id}`, jobData, {
        headers: { Authorization: jwt },
      });
      dispatch({ type: UPDATE_JOB_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: UPDATE_JOB_FAILURE,
        payload: error.response ? error.response.data : 'Network Error',
      });
    }
  };
  
  // Delete Job
  export const deleteJob = (id, jwt) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_REQUEST });
    try {
      await api.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: jwt },
      });
      dispatch({ type: DELETE_JOB_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_JOB_FAILURE,
        payload: error.response ? error.response.data : 'Network Error',
      });
    }
  };