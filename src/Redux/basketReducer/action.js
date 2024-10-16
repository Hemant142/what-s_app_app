import axios from "axios";
import { BASKET_REQUEST, BASKET_FAILURE, GET_BASKET_SUCCESS } from "../actionTypes";

let URL =  process.env.REACT_APP_NewURL

export const getAllBaskets = (token) => (dispatch) => {

  dispatch({ type: BASKET_REQUEST });

  axios.get(`${URL}centrum-galaxc/user/v1/web-app/baskets`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
    },
  })
  .then((res) => {
  console.log(res,"getAllBaskets")
    // Dispatch success action with the data
    dispatch({ type: GET_BASKET_SUCCESS, payload: res.data.data });
  })
  .catch((error) => {
    console.log(error, "Error getAllBaskets");
    // Dispatch failure action with error information
    dispatch({ type: BASKET_FAILURE, payload: error.message });
  });
};


export const getBasketDetails=(userId,id)=>(dispatch)=>{

return axios.get( `https://centrum-app-api.vercel.app/api/centrum/STOQCLUB/my-baskets/v2?user_id=${userId}&basket_id=${id}`)



}



export const OrderPlaced=(id,lot,token)=>(dispatch)=>{
  return axios.post (`${URL}app/client/create-new-order?basketId=${id}&lotMultiplier=${lot}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
    },
  })
}