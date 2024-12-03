import {
  CREATE_BLOG_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  GETALL_BLOG_FAILURE,
  GETALL_BLOG_REQUEST,
  GETALL_BLOG_SUCCESS,
  GETALL_BY_ID_BLOG_FAILURE,
  GETALL_BY_ID_BLOG_REQUEST,
  GETALL_BY_ID_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
} from "./ActionType";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
    case GETALL_BLOG_REQUEST:
    case GETALL_BY_ID_BLOG_REQUEST:
    case UPDATE_BLOG_REQUEST:
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.payload], // Add new blog to the list
      };

    case GETALL_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload, // Replace with fetched blogs list
      };

    case GETALL_BY_ID_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [action.payload], // Assuming it's a single blog object; replace with the single blog
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ), // Update specific blog in the list
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload), // Remove the deleted blog
      };

    case CREATE_BLOG_FAILURE:
    case GETALL_BLOG_FAILURE:
    case GETALL_BY_ID_BLOG_FAILURE:
    case UPDATE_BLOG_FAILURE:
    case DELETE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Handle errors
      };

    default:
      return state;
  }
};
