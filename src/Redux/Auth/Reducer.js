import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    userId: null,
    isloading: false,
    error: null,
    jwt: localStorage.getItem("jwt") || null,  // Get JWT from localStorage
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isloading: true,
                error: null
            }

        case REGISTER_SUCCESS:
            localStorage.setItem("jwt", action.payload.jwt); // Save to localStorage
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt,
                success: "Registration successful!",
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt,
                userId: action.payload.userId, // Store userId here
                success: "Operation successful",
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            };

        case LOGOUT:
            return {
                ...state,
                jwt: null,
            };

        default:
            return state;
    }
};