import { USER_BALANCE_SUCCESS, USER_LOADING, USER_LOGIN_SUCCESS } from "../actionTypes";
import axios from "axios";

let URL= process.env.REACT_APP_STOQCLUB_URL
let NewURL=process.env.REACT_APP_NewURL;


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



export const getBalance = (token) => (dispatch) => {
  return axios
    .get(`${NewURL}app/client/get-client-balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.data.balance, "getBalance");
      if(res.data.status==="success"){

        dispatch({ type: USER_BALANCE_SUCCESS, payload: res.data.data.balance }); // Assuming the balance is in res.data.balance
      }
    
    })
    .catch((error) => {
      console.log("Error during getBalance request:", error);
      throw error; // Throw the error to handle it outside if needed
    });
};

