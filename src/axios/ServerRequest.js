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
