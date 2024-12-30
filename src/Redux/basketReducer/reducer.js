
import {
  BASKET_FAILURE,
  BASKET_REQUEST,
  GET_BASKET_SUCCESS,
  GET_BASKETDATA_SUCCESS,
  GET_NEW_INSTRUMENT_LIST_SUCCESS,
  GET_BASKETS_INFO_SUCCESS,
  GET_SINGLE_BASKET_INFO_SUCCESS,
  GET_ORDER_HOLDINGS_SUCCESS
} from "../actionTypes";

const initalState = {
  baskets: [],
  basketInfos:[],
  singleBasketInfo:{},
  basketData:{},
  newInstrumentsData:[],
  orderHoldings:[],
  isLoading: false,
  isError: false,
  error: "",
};
export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case BASKET_REQUEST:
      return { ...state, isLoading: true };
    case BASKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case GET_BASKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        baskets: action.payload,
        isError: false,
      };

      case GET_BASKETS_INFO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          basketInfos: action.payload,
          isError: false,
        };
      case GET_BASKETDATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          basketData: action.payload,
          isError: false,
        };


        case GET_SINGLE_BASKET_INFO_SUCCESS:
          return {
            ...state,
            isLoading: false,
            singleBasketInfo: action.payload,
            isError: false,
          };

        case GET_NEW_INSTRUMENT_LIST_SUCCESS:
          return {
            ...state,
            isLoading: false,
            newInstrumentsData: action.payload,
            isError: false,
          };

          case GET_ORDER_HOLDINGS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            orderHoldings: action.payload,
            isError: false,
          };

    default:
      return state;
  }
};
