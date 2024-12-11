import api from "../config/api";
import { APPLY_JOB_FAILURE, APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, FETCH_APPLICATIONS_FAILURE, FETCH_APPLICATIONS_REQUEST, FETCH_APPLICATIONS_SUCCESS } from "./ActionType";

export const applyForJob = (jobId, resume, jwt, userId) => async (dispatch) => {
  dispatch({ type: APPLY_JOB_REQUEST });

  try {
    const formData = new FormData();
    formData.append('resume', resume);  // File upload
    formData.append('jobId', jobId);    // Adding jobId as form data

    // Send the request without manually setting the 'Content-Type' header
    const response = await api.post(`/api/applications/${userId}/${jobId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,  
      },
    });
    

    dispatch({
      type: APPLY_JOB_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_JOB_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllApplyJob = (userId, jwt) => async (dispatch) => {
  dispatch({ type: FETCH_APPLICATIONS_REQUEST });

  try {
    // Assuming `api` is an instance of axios or a similar library
    const response = await api.get(`api/applications/${userId}/applied-jobs`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    const data = response.data; // Extract the data directly from the response

    console.log('Applications fetched:', data);
    dispatch({ type: FETCH_APPLICATIONS_SUCCESS, payload: Array.isArray(data) ? data : [] });
  } catch (error) {
    console.error('Error occurred:', error.message || error.response?.data?.message);
    dispatch({
      type: FETCH_APPLICATIONS_FAILURE,
      payload: error.response?.data?.message || 'An unexpected error occurred',
    });
  }
};



