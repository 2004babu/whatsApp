import { createSlice } from "@reduxjs/toolkit";

const messgaeSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    message: {},
    conversation:{},
    messages: [],
    error: null,
    conversation:[]
  },
  reducers: {
    getMessageRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getMessageSuccess(state, action) {
      // console.log(action.payload.messages,action.payload);

      if(action.payload?.messages&&action.payload?.conversations){
        return{
          ...state,
          loading: false,
          messages: action.payload.messages,
        conversation:action.payload.converstaions
        }
      }
      if (action.payload.messages) {
        return{
          ...state,
          loading: false,
          messages: action.payload.messages,
        }
      }
      if(action.payload?.conversations)
        // console.log('conversations',action.payload?.conversations);
      return {
        ...state,
        loading: false,
        conversation:action.payload?.conversations
      };
    },
    getMessageFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    sendMessageRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sendMessageSuccess(state, action) {

      // console.log(action.payload?.messages,action.payload?.conversations);

      if(action.payload?.messages&&action.payload?.conversations){
        return{
          ...state,
          loading: false,
          messages: action.payload.messages,
        conversation:action.payload.conversations
        }
      }
      if (action.payload?.messages) {
        return{
          ...state,
          loading: false,
          messages: action.payload.messages,
        }
      }
      if(action.payload?.conversations)
      return {
        ...state,
        loading: false,
        conversation:action.payload.conversations
      };
    },
    sendMessageFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        conversation:[]
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

const { reducer, actions } = messgaeSlice;

export const {
  getMessageFail,
  getMessageRequest,
  getMessageSuccess,
  sendMessageFail,
  sendMessageRequest,
  sendMessageSuccess,
  clearError,
} = actions;

export default reducer;
