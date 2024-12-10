import api from "../config/api";
import { CREATE_COMPANY_FAILURE, CREATE_COMPANY_REQUEST, CREATE_COMPANY_SUCCESS, DELETE_COMPANY_FAILURE, DELETE_COMPANY_REQUEST, DELETE_COMPANY_SUCCESS, GET_ALL_COMPANIES_FAILURE, GET_ALL_COMPANIES_REQUEST, GET_ALL_COMPANIES_SUCCESS, GET_COMPANY_BY_ID_FAILURE, GET_COMPANY_BY_ID_REQUEST, GET_COMPANY_BY_ID_SUCCESS, UPDATE_COMPANY_FAILURE, UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS } from "./ActionType";

export const getAllCompanies = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_COMPANIES_REQUEST });

  try {
    const config = jwt
      ? { headers: { Authorization: `Bearer ${jwt}` } }
      : {};
    const { data } = await api.get('/api/company', config);
    console.log('Fetched Companies:', data);
    dispatch({ type: GET_ALL_COMPANIES_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error fetching companies:', error.response || error);
    dispatch({
      type: GET_ALL_COMPANIES_FAILURE,
      payload: error.response ? error.response.data : 'Network Error',
    });
  }
};
  
  // Fetch a single company by ID
  export const getCompanyById = (id) => async (dispatch) => {
    dispatch({ type: GET_COMPANY_BY_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/company/${id}`);
      console.log("Company Details:", data);
      dispatch({ type: GET_COMPANY_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_COMPANY_BY_ID_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };
  
  // Create a new company
  export const createCompany = (company) => async (dispatch) => {
    dispatch({ type: CREATE_COMPANY_REQUEST });
    try {
      const { data } = await api.post("/api/companies", company);
      console.log("Created Company:", data);
      dispatch({ type: CREATE_COMPANY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_COMPANY_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };
  
  // Update an existing company
  export const updateCompany = (id, company) => async (dispatch) => {
    dispatch({ type: UPDATE_COMPANY_REQUEST });
    try {
      const { data } = await api.put(`/api/companies/${id}`, company);
      console.log("Updated Company:", data);
      dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };
  
  // Delete a company
  export const deleteCompany = (id) => async (dispatch) => {
    dispatch({ type: DELETE_COMPANY_REQUEST });
    try {
      await api.delete(`/api/companies/${id}`);
      console.log("Deleted Company ID:", id);
      dispatch({ type: DELETE_COMPANY_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_COMPANY_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };