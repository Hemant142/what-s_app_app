import { USER_LOADING, USER_LOGIN_SUCCESS } from "../actionTypes";
import axios from "axios";

let URL= process.env.REACT_APP_STOQCLUB_URL
let NewURL=process.env.REACT_APP_NewURL;
console.log(NewURL,"NewURL")

// Action for OTP verification
export const otpVarificationClient = (otp, authToken) => (dispatch) => {
  dispatch({ type: USER_LOADING }); // Dispatch loading state

  // Make API call to verify the OTP
  return axios.post(
    `${NewURL}app/client/verify-otp?otp=${otp}`, 
    {}, // Pass an empty object for the body
    {
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass Bearer token for authentication
      },
    }
  );
};

export const otpSend=(token)=>(dispatch)=>{
 return axios
  .post(
    `${NewURL}/app/client/request-otp`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

}
export const clientToken = (data) => (dispatch) => {
 console.log(data,"clientToken")
    dispatch({ type: USER_LOADING });
    return axios.post(
      `${NewURL}/app/client/generate-token?userId=${data.userId}&password=${data.panCard}`
    );
  };

export const getUserInfo=(userId)=>(dispatch)=>{
  dispatch({ type: USER_LOADING });
  axios.get(`${URL}get-balance/v2?user_id=${userId}`)
  .then((res)=>{
 
    if(res.data.status==="SUCCESS"){
      dispatch({type:USER_LOGIN_SUCCESS, payload:res.data.data})
    }
    
  })
  .catch((error)=>{
    console.log(error,"Error getUserInfo")
  })
}


