import {userLogin, userRegister} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.REGISTER_REQUEST,
    isLoading: bool,
  };
}

export function registerSuccess(userDetails) {
  return {
    type: constants.REGISTER_SUCCESS,
    userDetails,
  };
}

export function registerFailed(error) {
  return {
    type: constants.REGISTER_FAILURE,
    error,
  };
}

export const register = (data) => dispatch => {
  dispatch(isLoading(true));
  return userRegister(data)
    .then(res => {
        dispatch(registerSuccess(res.data))
    })
    .catch(error => {
        dispatch(registerFailed(error.response.data))
    });
};
