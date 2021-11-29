import {resendActivationCode} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.SEND_OTP_REQUEST,
    isLoading: bool,
  };
}

export function sendOTPSuccess(message) {
  return {
    type: constants.SEND_OTP_SUCCESS,
    message
  };
}

export function sendOTPFailed(error) {
  return {
    type: constants.LOGIN_FAILURE,
    error,
  };
}

export const sendActivationCode = () => dispatch => {
  //dispatch(isLoading(true));
  return resendActivationCode()
    .then(res => {
        dispatch(sendOTPSuccess(res.data))
    })
    .catch(error => {
        dispatch(sendOTPFailed(error.response.data))
    });
};
