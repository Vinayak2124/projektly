import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_USER_SUBSCRIPTION_FAILURE, UPGRADE_USER_SUBSCRIPTION_REQUEST } from "./ActionType";
import { UPDATE_ISSUE_STATUS_SUCCESS } from "../Issue/ActionTypes";

const initialState = {
    userSubscription:null,
    loading: false,
    error: null,
    
};

export const subcriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUBSCRIPTION_REQUEST:
    case UPGRADE_USER_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userSubscription:action.payload,
      };
    case UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
          error: null,
        userSubscription:action.payload
      };
  
      case GET_USER_SUBSCRIPTION_FAILURE:
      case UPGRADE_USER_SUBSCRIPTION_FAILURE:
          return {
              ...state,
              loading: false,
              error:action.error
          }

    default:
      return state;
  }
};
