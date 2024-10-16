import {
  USER_FAIL,
  USER_FORGOT_SUCCESS,
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_RESET_SUCCESS,
  USER_SIGNUP_SUCCESS,
  VALID_USER_LOGOUT_SUCCESS,
} from "../actionTypes";

let initialState = {
  loading: false,
  error: false,
  userdata: {}, // To store the user data
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING: {
      return {
        ...state,  // Spread the previous state
        loading: true,
        error: false,
      };
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        userdata: payload,  // Store the user data in userdata
      };
    }

    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        userdata: payload,  // Store the user data on successful signup
      };
    }

    case USER_FORGOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case USER_RESET_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case VALID_USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        userdata: {},  // Clear userdata on logout
      };
    }

    default:
      return state;
  }
};
