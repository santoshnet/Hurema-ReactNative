import React, {Component} from 'react';
import {View, StyleSheet,Alert} from 'react-native';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';

class ForgotPassword extends Component {
  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar />
        <View style={{flex: 0.15, padding:10}}>
          <Header title="ForgotPassword" text="ForgotPassword now to begin an amazing journey."/>
        </View>
        <Column style={styles.container}>
          <TextViewBold>ForgotPassword</TextViewBold>
        </Column>
      </Column>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:0.85,
    backgroundColor:Colors.white,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:20
  }
});


export default ForgotPassword;
