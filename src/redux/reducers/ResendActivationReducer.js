import {constants} from '../constants';

const initialState = {
    isLoading: false,
    message:{},
    error:undefined
};

export function ResendActivationReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    case constants.SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        error:undefined
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error:action.error
      };
    
    default:
      return state;
  }
}
