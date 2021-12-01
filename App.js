import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import PreRegisterScreen from './src/screen/PreRegisterScreen';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import ForgotPassword from './src/screen/ForgotPassword';
import OTPVerification from './src/screen/OTPVerification';
import Company from './src/screen/Company';
import HomeScreen from './src/screen/Home/HomeScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';

const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

global.currentScreenIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createDrawer = () => (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      initialRouteName="Home"
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );

  MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen
        name="PreRegisterScreen"
        component={PreRegisterScreen}
      />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="OTPVerification" component={OTPVerification} />
      <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <MainStack.Screen name="Company" component={Company} />
      <MainStack.Screen name="HomeScreen" children={this.createDrawer} />
    </MainStack.Navigator>
  );

  RootStackScreen = () => (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RootStack.Screen name="Main" component={this.MainStackScreen} />
    </RootStack.Navigator>
  );

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>
      </Provider>
    );
  }
}

export default App;
