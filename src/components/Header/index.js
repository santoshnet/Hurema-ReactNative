import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme';
import Row from './../Row';
import {useNavigation} from '@react-navigation/native';
import Column from '../Column';
import TextViewMedium from '../CustomText/TextViewMedium';
import TextViewLight from '../CustomText/TextViewLight';

function Header(props) {
  const navigation = useNavigation();

  return (
    <Column>
      <Row style={{ alignItems:'center', marginTop:10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <TextViewMedium
          style={{color: Colors.white, fontSize: 18, marginLeft: 10}}>
          {props.title}
        </TextViewMedium>
      </Row>
      <TextViewLight  style={{color: Colors.white, fontSize: 16, marginTop: 20}}>{props.text}</TextViewLight>
    </Column>
  );
}

export default Header;
