import {constants} from '../constants';

const initialState = {
    isLoading: false,
    company:{},
    error:undefined
};

export function CompanyReducer(state = initialState, action) {
  switch (action.type) {
    case constants.COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        company: action.company,
      };
    case constants.COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company: action.company,
        error:undefined
      };
    case constants.COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error:action.error
      };

    default:
      return state;
  }
}
