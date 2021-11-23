import React, {useState, useEffect, useRef} from 'react';
import {View, Platform, StyleSheet, TextInput, Text} from 'react-native';
import { Colors, Fonts } from '../../theme';
import TextViewMedium from '../CustomText/TextViewMedium';


function UserInput(props) {
  const [hasFocus, sethasFocus] = useState(false);
  const onFocus = () => {
    sethasFocus(true);
  };
  const inputElementRef = useRef(null);
  const onBlur = () => {
    sethasFocus(false);
  };
  useEffect(() => {
    inputElementRef.current.setNativeProps({
      style: {fontFamily: Fonts.primaryRegular},
    });
  });
  return (
    <View style={[styles.textInputContainer, props.containerStyle,props.error?styles.errorContainer:hasFocus?styles.focusContainer:null]}>
      <View style={{ position:'absolute' , top:-15, left:25}}>
        <TextViewMedium style={[{ backgroundColor:Colors.white, padding: 5, color:props.error?Colors.red:hasFocus?Colors.colorPrimary:'#C6C6C6' },props.placeholderTextColor]}>{props.label}</TextViewMedium>
      </View>
     
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        editable={props.editable}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={inputElementRef}
      />
    </View>
  );
}

UserInput.propTypes = {};
UserInput.defaultProps = {};

const styles = StyleSheet.create({
  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:6,
    paddingBottom:6,
    backgroundColor: Colors.white,
    borderRadius:15,
    marginBottom:30,
    borderWidth:1,
    borderColor:'#C6C6C6',
    position:'relative'
  },
  textInput: {
    fontSize: 16,
    color: Colors.textColor,
    fontFamily: Fonts.primarySemiBold,
  },
  focusContainer: {
    borderWidth:1,
    borderColor:Colors.colorPrimary,
  },
  
  errorContainer: {
    borderWidth:1,
    borderColor:Colors.red,
  },

  focusedTextInput: {
    fontSize: 14,
    color: Colors.gray,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
  },

  errorTextInput: {
    fontSize: 14,
    color: Colors.gray,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
  },

  error: {
    fontSize: 10,
    color: Colors.red,
  },
});

export default UserInput;
