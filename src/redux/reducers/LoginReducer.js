import { act } from 'react-test-renderer';
import {constants} from '../constants';

const initialState = {
    isLoading: false,
    loggedIn: false,
    user:{},
    error:undefined
};

export function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loggedIn: false,
        user: action.user,
      };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        user: action.user,
        error:undefined
      };
    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        error:action.error
      };
    case constants.LOGOUT:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
      };
    default:
      return state;
  }
}
