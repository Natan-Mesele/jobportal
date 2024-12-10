import api from "../config/api";
import { GET_SAVED_JOBS_FAILURE, GET_SAVED_JOBS_REQUEST, GET_SAVED_JOBS_SUCCESS, SAVE_JOB_FAILURE, SAVE_JOB_REQUEST, SAVE_JOB_SUCCESS, UNSAVE_JOB_FAILURE, UNSAVE_JOB_REQUEST, UNSAVE_JOB_SUCCESS } from "./ActionType";

export const saveJob = (userId, jobId, jwt) => async (dispatch) => {
  try {
    const response = await api.post(`/api/saved-jobs/save/${userId}/${jobId}`, null, {
          headers: {
              Authorization: `Bearer ${jwt}`,  
          },
      });
      console.log("Job saved", response.data);
      dispatch({ type: SAVE_JOB_SUCCESS, payload: response.data });
  } catch (error) {
      console.error("Error saving job", error);
      dispatch({ type: SAVE_JOB_FAILURE, payload: error.response ? error.response.data : 'Network Error' });
  }
};
  
  export const unsaveJob = (userId, jobId, jwt) => async (dispatch) => {
    dispatch({ type: UNSAVE_JOB_REQUEST });
    try {
      const response = await api.delete(
        '/api/saved-jobs/unsave',
        {
          params: { userId, jobId },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log('Job unsaved successfully:', response.data); // Success console log
      dispatch({ type: UNSAVE_JOB_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UNSAVE_JOB_FAILURE, payload: error.message });
    }
  };
  
  export const getSavedJobs = (userId, jwt) => async (dispatch) => {
    dispatch({ type: GET_SAVED_JOBS_REQUEST });
    try {
      console.log('Fetching saved jobs for userId:', userId, 'and JWT:', jwt); // Log values before the request
      const response = await api.get(`/api/saved-jobs/${userId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      console.log('Saved jobs fetched successfully:', response.data); // Check if response contains jobs
      dispatch({ type: GET_SAVED_JOBS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log('Error fetching saved jobs:', error); // Add more detailed logging
      dispatch({ type: GET_SAVED_JOBS_FAILURE, payload: error.message });
    }
  };
  

  