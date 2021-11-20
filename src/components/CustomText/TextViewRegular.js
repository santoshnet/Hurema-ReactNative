import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, Dimensions, Fonts} from '../../theme';


const TextViewRegular=(props)=>{
    return(
        <Text style={[styles.text,props.style]}>
            {props.children}
        </Text>
    );

}

const styles = StyleSheet.create({
    text:{
        display:'flex',
        fontSize:Dimensions.defaultTextSize,
        fontFamily: Fonts.primaryRegular,
        color:Colors.black

    }
});

export default TextViewRegular;
