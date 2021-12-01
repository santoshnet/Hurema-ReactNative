import {constants} from '../constants';

const initialState = {
    isLoading: false,
    data:{},
    error:undefined
};

export function ForgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: action.data,
      };
    case constants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error:undefined
      };
    case constants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error:undefined
      };
    case constants.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error:action.error
      };

    default:
      return state;
  }
}
