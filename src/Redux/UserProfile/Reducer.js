import { CREATE_PROFILE_FAILURE, CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

const initialState = {
    profile: null,
    loading: false,
    error: null,
  };
  
  export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PROFILE_REQUEST:
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          profile: action.payload,
        };
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          profile: action.payload,
        };
      case CREATE_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
