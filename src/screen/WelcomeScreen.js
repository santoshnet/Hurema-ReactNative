import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../theme/Colors';
import Fonts from "../theme/Fonts";
import AnimatedProgressWheel from 'react-native-progress-wheel';
import AppBar from '../components/AppBar';

const slides = [
  {
    key: 1,
    title: 'Keep Healthy Work-Life Balance',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../assets/images/slide1.png'),
  },
  {
    key: 2,
    title: 'Track Your Work & Get Result',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' ,
    image: require('../assets/images/slide2.png'),
  },
  {
    key: 3,
    title: 'Stay Organized With Team',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: require('../assets/images/slide3.png'),
  },
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image}/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>

      </View>
    );
  };
  _onDone = () => {
    this.props.navigation.replace('PreRegisterScreen');
  };
  _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Icon name="chevron-right" size={30} color={Colors.white} />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.button}>
       <Icon name="chevron-right" size={30} color={Colors.white} />
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <AppBar/>
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          bottomButton
          onDone={this._onDone}
          dotStyle={styles.dots}
          activeDotStyle={styles.activeDots}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    marginBottom:50
  },
  image: {
    height:'60%',
    width:'100%',
    resizeMode:'contain',
    marginTop: 30,
  },
  logo: {
    height:100,
    width:100
  },

  text: {
    color: Colors.gray,
    textAlign: 'center',
    fontFamily: Fonts.primaryRegular,
    fontSize:14,
    margin:10,
    paddingLeft: 20,
    paddingRight: 20

  },
  title: {
    fontSize: 30,
    color: Colors.black,
    textAlign: 'center',
    fontFamily:Fonts.primaryBold,
    margin:20
  },
  dots: {
    backgroundColor: Colors.gray,
    width:15
  },
  activeDots: {
    backgroundColor: Colors.colorPrimary,
    width:35
  },
  next: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  done: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  button:{
    backgroundColor:Colors.colorPrimary,
    height: 60,
    width: 60,
    borderRadius:40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'center'
  }
});

export default WelcomeScreen;
