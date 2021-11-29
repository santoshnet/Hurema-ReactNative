import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TextViewBold from './../components/CustomText/TextViewBold';
import Column from './../components/Column';
import AppBar from './../components/AppBar/index';
import ImageView from './../components/ImageView/index';
import {Colors, Fonts, Dimensions} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/images/logo.png';
import PreReg from '../assets/images/prereg.png';
import OfficeBuilding from '../assets/images/office-building.png';
import Employee from '../assets/images/employee.png';
import Card from '../components/Card';
import Row from '../components/Row';
import TextViewMedium from './../components/CustomText/TextViewMedium';
import TextViewLight from './../components/CustomText/TextViewLight';
import TextViewRegular from './../components/CustomText/TextViewRegular';

class PreRegisterScreen extends Component {
  render() {
    return (
      <Column>
        <AppBar/>
        <LinearGradient
          colors={['#FEFDFB', '#DBE0FF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{height: Dimensions.window.height}}>
          <ImageView src={Logo} style={{height: 50, marginTop: 70}} />
          <ImageView
            src={PreReg}
            style={{
              width: Dimensions.window.width - 70,
              alignSelf: 'center',
              marginTop: -70,
            }}
          />

          <TextViewBold style={{fontSize: 20, alignSelf: 'center'}}>
            Select Your Role
          </TextViewBold>
          <Column style={{padding: 20}}>
            <Card style={{borderWidth: 1, borderColor: '#A0B7FA'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}>
                <Row style={{alignItems: 'center'}}>
                  <ImageView
                    src={OfficeBuilding}
                    style={{width: 40, height: 40}}
                  />
                  <Column style={{marginLeft: 10}}>
                    <TextViewMedium>
                      Business Owner / Admin / HR{' '}
                    </TextViewMedium>
                    <TextViewRegular style={{fontSize: 10, marginTop: 5}}>
                      Register your company & start attendance{' '}
                    </TextViewRegular>
                  </Column>
                </Row>
              </TouchableOpacity>
            </Card>
            <Card style={{borderWidth: 1, borderColor: '#C6C5D7'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
                <Row style={{alignItems: 'center'}}>
                  <ImageView
                    src={Employee}
                    style={{width: 40, height: 40}}
                  />
                  <Column style={{marginLeft: 10}}>
                    <TextViewMedium>
                     Employee
                    </TextViewMedium>
                    <TextViewRegular style={{fontSize: 10, marginTop: 5}}>
                      Login your account & start marking attendance
                    </TextViewRegular>
                  </Column>
                </Row>
              </TouchableOpacity>
            </Card>
          </Column>
        </LinearGradient>
      </Column>
    );
  }
}

const styles = StyleSheet.create({
 
});

export default PreRegisterScreen;
