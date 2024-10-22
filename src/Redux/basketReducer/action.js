import axios from "axios";
import {
  BASKET_REQUEST,
  BASKET_FAILURE,
  GET_BASKET_SUCCESS,
} from "../actionTypes";

let URL = process.env.REACT_APP_NewURL;

export const getAllBaskets = (token) => (dispatch) => {
  dispatch({ type: BASKET_REQUEST });

  axios
    .get(`${URL}web-app/baskets`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    })
    .then((res) => {
      console.log(res, "getAllBaskets");
      // Dispatch success action with the data
      dispatch({ type: GET_BASKET_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      console.log(error, "Error getAllBaskets");
      // Dispatch failure action with error information
      dispatch({ type: BASKET_FAILURE, payload: error.message });
    });
};

export const getBasketDetails = (id,token) => (dispatch) => {
  return axios.get(
    `${URL}web-app/single-baskets?basketId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
};

export const OrderPlaced = (id, lot, token) => (dispatch) => {

  return axios.post(
    `${URL}app/client/create-new-order?basketId=${id}&lotMultiplier=${lot}`,
    {}, // Add an empty object as the body payload
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass Bearer token for authentication
      },
    }
  );
};
