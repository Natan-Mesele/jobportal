import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    isloading: false,
    error: null,
    jwt: null,
}

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
        case LOGIN_SUCCESS:
            return {
                ...state,
                isloading: false,
                error: null,
                jwt: action.payload.jwt,
            }

        case GET_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};