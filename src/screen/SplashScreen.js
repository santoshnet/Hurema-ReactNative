import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {getUserDetails} from '../utils/LocalStorage';
import AppBar from '../components/AppBar';
import { Colors } from '../theme';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    const user = await getUserDetails();
    if (data !== null) {
      if (user !== null) {
        if (user.phone_verified) {
          this.props.navigation.replace('Home');
        } else {
          this.props.navigation.replace('Login');
        }
      } else {
        this.props.navigation.replace('WelcomeScreen');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppBar/>
        <Animated.Image
          onLoad={this.onLoad}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            styles.logo,
          ]}
          source={require('../assets/images/logo-white.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colorPrimary,
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode:'contain'
  },

  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },
});

export default SplashScreen;
