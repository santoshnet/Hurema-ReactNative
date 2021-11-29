import {constants} from '../constants';

const initialState = {
    isLoading: false,
    data:{},
    error:undefined
};

export function OTPVerificationReducer(state = initialState, action) {
  switch (action.type) {
    case constants.OTP_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: action.message,
      };
    case constants.OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.message,
        error:undefined
      };
    case constants.OTP_VERIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error:action.error
      };
    
    default:
      return state;
  }
}
