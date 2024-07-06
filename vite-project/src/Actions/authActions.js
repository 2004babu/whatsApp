import {
  getAllusersSuccess,
  getAllusersFail,
  getAllusersRequest,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUerFail,
  getUserListRequest,
  getUserListSuccess,
  getUserListFail,
  setStatusRequest,
  setStatusSuccess,
  setStatusFail,
} from "../Slices/authSlice";
import axios from "axios";

export const register = (userData) => async (dispatch) => {
  try {
    const config = {
      Headers: {
        "Content-Type": "maltipart/from-data",
      },
      withCredentials:true
    };
    dispatch(getSingleUserRequest());
    const { data } = await axios.post(
      `/api/auth/signup`,
      userData,
      config
    );
    console.log(data);
    dispatch(getSingleUserSuccess(data));
  } catch (error) {
    console.log("register ", error?.response?.data?.message);
    dispatch(getSingleUerFail(error?.response?.data?.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    // console.log(userData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    };

    dispatch(getSingleUserRequest());

    const { data } = await axios.post(
      `/api/auth/login`,
      userData,
      config
    );

    console.log(data);
    dispatch(getSingleUserSuccess(data));
  } catch (error) {
    console.log("register ", error?.response?.data?.message);
    dispatch(getSingleUserFail(error?.response?.data?.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    };

    dispatch(getSingleUserRequest());
    const { data } = await axios.get(`/api/auth/loaduser`,config);
    console.log(data);
    dispatch(getSingleUserSuccess(data));
  } catch (error) {
    console.log("register ", error?.response?.data?.message);
    dispatch(getSingleUerFail(error?.response?.data?.message));
  }
};

export const getUsers = async (dispatch) => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      };
  
    dispatch(getAllusersRequest());
    const { data } = await axios.get("/api/users/",config);
    // console.log(data);
    dispatch(getAllusersSuccess(data));
  } catch (error) {
    console.log("get users actions ", error?.response?.data?.message);
    dispatch(getAllusersFail(error?.response?.data?.message));
  }
};
// export const getUserList=async(dispatch)=>{
//     try {
//         dispatch(getUserListRequest())
//         const {data}=await axios.get('/api/auth/Receiverlist')
//         console.log(data);
//         dispatch(getUserListSuccess(data.lineUpList))
//     } catch (error) {
//         console.log('get users actions ',error?.response?.data?.message);
//         dispatch(getUserListFail(error?.response?.data?.message))
//     }
// }




export const setStatus = (userData) => async (dispatch) => {
  try {
    // console.log(userData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, 
    };

    dispatch(setStatusRequest());

    const { data } = await axios.post(
      `/api/auth/status`,
      userData,
      config
    );

    console.log(data);
    dispatch(setStatusSuccess(data));
  } catch (error) {
    console.log("setStatus  ", error?.response?.data?.message);
    dispatch(setStatusFail(error?.response?.data?.message));
  }
};