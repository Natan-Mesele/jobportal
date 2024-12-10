import { CREATE_JOB_FAILURE, CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, DELETE_JOB_FAILURE, DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, GET_ALL_JOBS_FAILURE, GET_ALL_JOBS_REQUEST, GET_ALL_JOBS_SUCCESS, GET_JOB_FAILURE, GET_JOB_REQUEST, GET_JOB_SUCCESS, UPDATE_JOB_FAILURE, UPDATE_JOB_REQUEST, UPDATE_JOB_SUCCESS } from "./ActionType";

const initialState = {
    jobs: [],
    job: null,
    loading: false,
    error: null,
  };
  
  export const jobReducer = (state = { jobs: [], loading: false, error: null }, action) => {
    switch (action.type) {
      // Create Job
      case CREATE_JOB_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_JOB_SUCCESS:
        return { ...state, 
          loading: false, 
          jobs: [...state.jobs, action.payload] 
        };
      case CREATE_JOB_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get a Single Job
      case GET_JOB_REQUEST:
        return { 
          ...state, 
          loading: true, 
          error: null };
      case GET_JOB_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          job: action.payload 
        };
      case GET_JOB_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
  
      // Get All Jobs
      case GET_ALL_JOBS_REQUEST:
        return { 
          ...state, 
          loading: true, 
          error: null 
        };
      case GET_ALL_JOBS_SUCCESS:
        return { ...state, 
          loading: false, 
          jobs: action.payload 
        };
      case GET_ALL_JOBS_FAILURE:
        return { ...state, 
          loading: false, 
          error: action.payload 
        };
  
      // Update Job
      case UPDATE_JOB_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          jobs: state.jobs.map((job) =>
            job.id === action.payload.id ? action.payload : job
          ),
        };
      case UPDATE_JOB_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Delete Job
      case DELETE_JOB_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          jobs: state.jobs.filter((job) => job.id !== action.payload),
        };
      case DELETE_JOB_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };