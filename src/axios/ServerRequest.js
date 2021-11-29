import API, {BASE_URL} from './API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {getToken} from '../utils/LocalStorage';

export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      Toast.showWithGravity(
        'No internet connection',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  });
};

export const userLogin = async (data) => {
  
  return await API({
    method: 'POST',
    url: 'api/v1/login',
    data: data,
  }).then(res => {
    return res;
  });
};

export const userRegister = async (data) => {
  return await API({
    method: 'POST',
    url: 'api/v1/register',
    data: data,
  }).then(res => {
    return res;
  });
};

export const resendActivationCode = async () => {
  return await API({
    method: 'GET',
    url: 'api/v1/resend-verification',
  }).then(res => {
    return res;
  });
};

export const verifyOTP = async (code) => {
  return await API({
    method: 'GET',
    url: `api/v1/register/activate/${code}`,
  }).then(res => {
    return res;
  });
};

export const createCompany = async (data) => {
  return await API({
    method: 'POST',
    url: 'api/v1/company',
    data: data,
  }).then(res => {
    return res;
  });
};