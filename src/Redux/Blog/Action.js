import api from "../config/api";
import { CREATE_BLOG_FAILURE, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GETALL_BLOG_FAILURE, GETALL_BLOG_REQUEST, GETALL_BLOG_SUCCESS, GETALL_BY_ID_BLOG_FAILURE, GETALL_BY_ID_BLOG_REQUEST, GETALL_BY_ID_BLOG_SUCCESS, UPDATE_BLOG_FAILURE, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "./ActionType";

export const createBlog = (blog) => async (dispatch) => {
    dispatch({ type: CREATE_BLOG_REQUEST });
    try {
      const response = await api.post('/api/blog', blog);
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_BLOG_FAILURE, payload: error.message });
    }
  };
  
  export const getAllBlogs = (jwt) => async (dispatch) => {
    dispatch({ type: GETALL_BLOG_REQUEST });
    try {
      const config = jwt
        ? { headers: { Authorization: `Bearer ${jwt}` } }
        : {};
      const response = await api.get('/api/blog', config);
      console.log('Fetched Blogs:', response.data);
      dispatch({ type: GETALL_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching blogs:', error.response || error);
      dispatch({
        type: GETALL_BLOG_FAILURE,
        payload: error.response ? error.response.data : 'Network Error',
      });
    }
  };
  
  // Get Blog by ID
  export const getBlogById = (id) => async (dispatch) => {
    dispatch({ type: GETALL_BY_ID_BLOG_REQUEST });
    try {
      const response = await api.get(`/api/blog/${id}`);
      dispatch({ type: GETALL_BY_ID_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GETALL_BY_ID_BLOG_FAILURE, payload: error.message });
    }
  };
  
  // Update Blog
  export const updateBlog = (id, updatedBlog) => async (dispatch) => {
    dispatch({ type: UPDATE_BLOG_REQUEST });
    try {
      const response = await api.put(`/api/blog/${id}`, updatedBlog);
      dispatch({ type: UPDATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_BLOG_FAILURE, payload: error.message });
    }
  };
  
  // Delete Blog
  export const deleteBlog = (id) => async (dispatch) => {
    dispatch({ type: DELETE_BLOG_REQUEST });
    try {
      await api.delete(`/api/blog/${id}`);
      dispatch({ type: DELETE_BLOG_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_BLOG_FAILURE, payload: error.message });
    }
  };