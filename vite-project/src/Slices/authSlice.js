import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: {},
    users: {},
    userList: [],
    isAuthenticatedUser: false,
    error: null,
    isStatusUploaded: null,
    isRequestSend: null,
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
    setStatusRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    setStatusSuccess(state, action) {
      if (action?.payload?.user) {
        return {
          ...state,
          loading: false,
          user: action.payload,
          isStatusUploaded: true,
        };
      } else {
        return {
          ...state,
          loading: false,

          isStatusUploaded: true,
        };
      }
    },
    setStatusFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    logoutRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    logoutSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: {},
        users: {},
        userList: [],
        isAuthenticatedUser: false,
        error: null,
        isStatusUploaded: null,
      };
    },
    logoutsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    addUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addUserSuccess(state, action) {

      if (action?.payload?.user&&action?.payload?.users) {
        console.log('entered both',action?.payload);
        return {
          ...state,
          loading: false,
          users: action?.payload?.users,
          user: action?.payload?.user,
          isRequestSend: true,
        };
      }
      
      if (action?.payload?.user) {
        console.log('entered user2',action?.payload);
        return {
          ...state,
          loading: false,
          user: action?.payload?.user,
  
          isRequestSend: true,
        };
      }
      if (action?.payload?.users) {
        console.log('entered users 3',action?.payload);
        return {
          ...state,
          loading: false,
          users: action?.payload?.users,
  
          isRequestSend: true,
        };
      }
     
    },
    addUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    acceptUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    acceptUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action?.payload?.user,
      };
    },
    acceptUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearStatusUploaded(state, action) {
      return {
        ...state,
        loading: false,
        isStatusUploaded: null,
      };
    },
    clearisRequestSend(state, action) {
    
      return {
        ...state,
        loading: false,
        isRequestSend: null,
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
  getUserListFail,
  getUserListRequest,
  getUserListSuccess,
  setStatusFail,
  setStatusRequest,
  setStatusSuccess,
  clearStatusUploaded,
  logoutRequest,
  logoutSuccess,
  logoutsFail,
  addUserFail,
  addUserRequest,
  addUserSuccess,
  clearisRequestSend,
  acceptUserFail,acceptUserRequest,acceptUserSuccess
} = actions;

export default reducer;
