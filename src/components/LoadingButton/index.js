import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, ActivityIndicator,TouchableOpacity} from 'react-native';
import Colors from '../../theme/Colors';
import Font from '../../theme/Fonts';

function LoadingButton(props) {
  return (
    <View>
      {props.loading ? (
        <View
          style={[
            styles.buttonStyle,
            {
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 7,
              paddingBottom: 7,
            },
            props.style,
          ]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.buttonStyle, props.style]}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    color: Colors.white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: Colors.colorPrimary,
    height:55,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Font.primarySemiBold,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoadingButton;
