import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import PreRegisterScreen from './src/screen/PreRegisterScreen';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import store from './src/redux/store';
import { Provider } from 'react-redux';


const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

global.currentScreenIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    return <Provider store={store}><NavigationContainer>{this.RootStackScreen()}</NavigationContainer></Provider>;
  }
}

export default App;
