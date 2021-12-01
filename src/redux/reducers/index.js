import { combineReducers } from 'redux';
import { LoginReducer } from './LoginReducer';
import { RegisterReducer } from './RegisterReducer';
import { ResendActivationReducer } from './ResendActivationReducer';
import { OTPVerificationReducer } from './OTPVerificationReducer';
import { CompanyReducer } from './CompanyReducer';
import { ForgotPasswordReducer } from './ForgotPasswordReducer';


const rootReducer = combineReducers({
  LoginReducer,RegisterReducer,ResendActivationReducer,OTPVerificationReducer,CompanyReducer,ForgotPasswordReducer
});

export default rootReducer;