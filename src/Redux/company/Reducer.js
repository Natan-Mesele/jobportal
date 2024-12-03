import { CREATE_COMPANY_FAILURE, CREATE_COMPANY_REQUEST, CREATE_COMPANY_SUCCESS, DELETE_COMPANY_FAILURE, DELETE_COMPANY_REQUEST, DELETE_COMPANY_SUCCESS, GET_ALL_COMPANIES_FAILURE, GET_ALL_COMPANIES_REQUEST, GET_ALL_COMPANIES_SUCCESS, GET_COMPANY_BY_ID_FAILURE, GET_COMPANY_BY_ID_REQUEST, GET_COMPANY_BY_ID_SUCCESS, UPDATE_COMPANY_FAILURE, UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS } from "./ActionType";

const initialState = {
    companies: [],
    company: null,
    loading: false,
    error: null,
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch all companies
      case GET_ALL_COMPANIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ALL_COMPANIES_SUCCESS:
        return {
          ...state,
          loading: false,
          companies: action.payload,
        };
      case GET_ALL_COMPANIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Fetch a company by ID
      case GET_COMPANY_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_COMPANY_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          company: action.payload,
        };
      case GET_COMPANY_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Create a new company
      case CREATE_COMPANY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_COMPANY_SUCCESS:
        return {
          ...state,
          loading: false,
          companies: [...state.companies, action.payload],
        };
      case CREATE_COMPANY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Update an existing company
      case UPDATE_COMPANY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_COMPANY_SUCCESS:
        return {
          ...state,
          loading: false,
          companies: state.companies.map((company) =>
            company.id === action.payload.id ? action.payload : company
          ),
        };
      case UPDATE_COMPANY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Delete a company
      case DELETE_COMPANY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_COMPANY_SUCCESS:
        return {
          ...state,
          loading: false,
          companies: state.companies.filter(
            (company) => company.id !== action.payload
          ),
        };
      case DELETE_COMPANY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Default state
      default:
        return state;
    }
  };
  
  export default companyReducer;