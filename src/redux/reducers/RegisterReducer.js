import {constants} from '../constants';

const initialState = {
    isLoading: false,
    userDetails:{},
    error:undefined
};

export function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case constants.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        userDetails: action.userDetails,
      };
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userDetails: action.userDetails,
        error:undefined
      };
    case constants.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error:action.error
      };
    default:
      return state;
  }
}
