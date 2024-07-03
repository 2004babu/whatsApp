import {
  getAllusersSuccess,
  getAllusersFail,
  getAllusersRequest,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUerFail,
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
      "http://13.210.245.134:4001/api/auth/signup",
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
      "http://13.210.245.134:4001/api/auth/login",
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
    const { data } = await axios.get("http://13.210.245.134:4001/api/auth/loaduser",config);
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
    const { data } = await axios.get("http://13.210.245.134:4001/api/users/",config);
    // console.log(data);
    dispatch(getAllusersSuccess(data));
  } catch (error) {
    console.log("get users actions ", error?.response?.data?.message);
    dispatch(getAllusersFail(error?.response?.data?.message));
  }
};
// export const getSIngleUser=async(dispatch)=>{
//     try {
//         dispatch(getSingleUserRequest())
//         const {data}=await axios.get('http://13.210.245.134:4001/api/user/')
//         console.log(data);
//         dispatch(getSingleUserSuccess(data))
//     } catch (error) {
//         console.log('get users actions ',error?.response?.data?.message);
//         dispatch(getSingleUerFail(error?.response?.data?.message))
//     }
// }
