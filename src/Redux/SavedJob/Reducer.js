import { GET_SAVED_JOBS_FAILURE, GET_SAVED_JOBS_REQUEST, GET_SAVED_JOBS_SUCCESS, SAVE_JOB_FAILURE, SAVE_JOB_REQUEST, SAVE_JOB_SUCCESS, UNSAVE_JOB_FAILURE, UNSAVE_JOB_REQUEST, UNSAVE_JOB_SUCCESS } from "./ActionType";

const initialState = {
  savedJobs: [],
  jobDetails: [],
  isLoading: false,
  error: null,
};

export const savedJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_JOB_REQUEST:
    case UNSAVE_JOB_REQUEST:
    case GET_SAVED_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedJobs: [...state.savedJobs, action.payload], // Add the saved job to the list
      };

    // Unsave Job Success - remove the unsaved job from the list
    case UNSAVE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedJobs: state.savedJobs.filter((job) => job.id !== action.payload.id), // Remove the unsaved job
      };

    case 'GET_SAVED_JOBS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        savedJobs: action.payload
      };

    case SAVE_JOB_FAILURE:
    case UNSAVE_JOB_FAILURE:
    case GET_SAVED_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
