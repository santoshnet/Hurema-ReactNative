import {forgotPassword,resetPassword} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.FORGOT_PASSWORD_REQUEST,
    isLoading: bool,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    type: constants.FORGOT_PASSWORD_SUCCESS,
    data,
  };
}

export function resetPasswordSuccess(data) {
  return {
    type: constants.RESET_PASSWORD_SUCCESS,
    data,
  };
}

export function forgotPasswordFailed(error) {
  return {
    type: constants.FORGOT_PASSWORD_FAILURE,
    error,
  };
}

export const sendForgotPasswordOTP = (data) => dispatch => {
  dispatch(isLoading(true));
  return forgotPassword(data)
    .then(res => {
        dispatch(forgotPasswordSuccess(res.data))
    })
    .catch(error => {
        dispatch(forgotPasswordFailed(error.response.data))
    });
};

export const passwordReset = (data) => dispatch => {
  dispatch(isLoading(true));
  return resetPassword(data)
    .then(res => {
        dispatch(resetPasswordSuccess(res.data))
    })
    .catch(error => {
        dispatch(forgotPasswordFailed(error.response.data))
    });
};
