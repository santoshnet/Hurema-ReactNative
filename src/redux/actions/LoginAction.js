import {userLogin} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.LOGIN_REQUEST,
    isLoading: bool,
  };
}

export function loginSuccess(userDetails) {
  return {
    type: constants.LOGIN_SUCCESS,
    userDetails,
  };
}

export function loginFailed(error) {
  return {
    type: constants.LOGIN_FAILURE,
    error,
  };
}

export const login = (data) => dispatch => {
  dispatch(isLoading(true));
  return userLogin(data)
    .then(res => {
        dispatch(loginSuccess(res.data))
    })
    .catch(error => {
        dispatch(loginFailed(error.response.data))
    });
};
