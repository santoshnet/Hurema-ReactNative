import { combineReducers } from 'redux';
import { LoginReducer } from './LoginReducer';
import { RegisterReducer } from './RegisterReducer';
import { ResendActivationReducer } from './ResendActivationReducer';
import { OTPVerificationReducer } from './OTPVerificationReducer';
import {Comp } from './CompanyReducer';


const rootReducer = combineReducers({
  LoginReducer,RegisterReducer,ResendActivationReducer,OTPVerificationReducer
});

export default rootReducer;