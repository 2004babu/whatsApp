import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: {},
    users: {},
    isAuthenticatedUser: false,
    error: null,
  },
  reducers: {
    getAllusersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getAllusersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        isAuthenticatedUser: true,
        
        
      };
    },
    getAllusersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getSingleUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getSingleUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticatedUser: true,
      };
    },
    getSingleUerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  getAllusersFail,
  getAllusersRequest,
  getAllusersSuccess,
  getSingleUerFail,
  getSingleUserRequest,
  getSingleUserSuccess,
  clearError,
} = actions;

export default reducer;
