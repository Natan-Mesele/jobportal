import { APPLY_JOB_FAILURE, APPLY_JOB_REQUEST, APPLY_JOB_SUCCESS, FETCH_APPLICATIONS_FAILURE, FETCH_APPLICATIONS_REQUEST, FETCH_APPLICATIONS_SUCCESS } from "./ActionType";


const initialState = {
  applying: false,
  applicationError: null,
  applicationResponse: null,
  userId: null,
  applications: [], // Always start as an empty array
};

const jobApplicationReducer = (state = { applications: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case APPLY_JOB_REQUEST:
      return {
        ...state,
        applying: true,
        applicationError: null,
      };

    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        applying: false,
        applicationResponse: action.payload.message, // Store the success message
        userId: action.payload.userId, // Store userId directly
      };

    case APPLY_JOB_FAILURE:
      return {
        ...state,
        applying: false,
        applicationError: action.payload,
      };

      case FETCH_APPLICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        applications: action.payload, 
      };

    case FETCH_APPLICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set the error from the payload
      };

    default:
      return state;
  }
};

export default jobApplicationReducer;
