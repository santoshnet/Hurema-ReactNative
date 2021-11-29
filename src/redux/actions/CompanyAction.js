import {createCompany} from '../../axios/ServerRequest';
import {constants} from '../constants';

export function isLoading(bool) {
  return {
    type: constants.COMPANY_REQUEST,
    isLoading: bool,
  };
}

export function companySuccess(company) {
  return {
    type: constants.COMPANY_SUCCESS,
    company,
  };
}

export function companyFailed(error) {
  return {
    type: constants.COMPANY_FAILURE,
    error,
  };
}

export const companyCreate = (data) => dispatch => {
  dispatch(isLoading(true));
  return createCompany(data)
    .then(res => {
        dispatch(companySuccess(res.data))
    })
    .catch(error => {
        dispatch(companyFailed(error.response.data))
    });
};
