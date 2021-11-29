import {verifyOTP} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.OTP_VERIFICATION_REQUEST,
    isLoading: bool,
  };
}

export function otpVerificationSuccess(message) {
  return {
    type: constants.OTP_VERIFICATION_SUCCESS,
    message
  };
}

export function otpVerificationFailed(error) {
  return {
    type: constants.LOGIN_FAILURE,
    error,
  };
}

export const otpVerification = (code) => dispatch => {
   dispatch(isLoading(true));
  return verifyOTP(code)
    .then(res => {
        dispatch(otpVerificationSuccess(res.data))
    })
    .catch(error => {
        dispatch(otpVerificationFailed(error.response.data))
    });
};
