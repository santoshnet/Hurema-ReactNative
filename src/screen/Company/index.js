import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import {getUserDetails} from '../../utils/LocalStorage';
import UserInput from './../../components/UserInput';
import {ScrollView} from 'react-native-gesture-handler';
import Validator from '../../utils/Validator/Validator';
import {DEFAULT_RULE, EMAIL_RULE, PHONE_RULE} from '../../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import LoadingButton from './../../components/LoadingButton/index';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
    };
  }

  async componentDidMount() {
    let userDetails = await getUserDetails();
    this.setState({
      userDetails: userDetails,
      name: '',
      email: '',
      phone: '',
      address: '',
      map_url: '',
      nameError: '',
      emailError: '',
      phoneError: '',
    });
  }

  saveCompany=()=>{
   const {name,email,phone,address,map_url}=this.state;
   this.setState({nameError:false,emailError: false, phoneError:false});
   if (!Validator(name, DEFAULT_RULE)) {
    this.setState({
      nameError: true,
    });
    return;
  }else if (!Validator(email, DEFAULT_RULE)) {
    this.setState({
      emailError: true,
    });
    return;
  }else if (!Validator(email, EMAIL_RULE)) {
    this.setState({
      emailError: true,
    });
    return;
  }else if (!Validator(phone, DEFAULT_RULE)) {
    this.setState({
      phoneError: true,
    });
    return;
  } else if (!Validator(phone, PHONE_RULE)) {
    this.setState({
      phoneError: true,
    });
    return;
  }
 
    
  }

  render() {
    const {userDetails} = this.state;
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar />
        <View style={{flex: 0.15, padding: 10}}>
          <Header
            title={`Hello ${
              userDetails !== null ? userDetails.user.name : null
            }`}
            text="Create Your Company and start onboarding employees"
          />
        </View>

        <Column style={styles.container}>
          <ScrollView>
            <Column style={{ paddingTop:30 }}>
              <UserInput
                placeholder="Enter Company Name"
                label="Name"
                error={this.state.nameError}
                value={this.state.name}
                onChangeText={name => {
                  this.setState({
                    name,
                  });
                }}
              />
              <UserInput
                placeholder="Enter Company email"
                label="Email"
                error={this.state.emailError}
                value={this.state.email}
                keyboardType={"email-address"}
                onChangeText={email => {
                  this.setState({
                    email,
                  });
                }}
              />
              <UserInput
                placeholder="Enter Company phone"
                label="Phone"
                error={this.state.phoneError}
                value={this.state.phone}
                keyboardType={"phone-pad"}
                onChangeText={phone => {
                  this.setState({
                    phone,
                  });
                }}
              />
              <UserInput
                placeholder="Enter Company Address (Optional)"
                label="Address"
                value={this.state.address}
                multiline
                numberOfLines={3}
                onChangeText={address => {
                  this.setState({
                    address,
                  });
                }}
              />
              <UserInput
                placeholder="Enter Map URL (Optional)"
                label="Google Map"
                value={this.state.map_url}
                onChangeText={map_url => {
                  this.setState({
                    map_url,
                  });
                }}
              />
              <LoadingButton
              title="Save Company"
              loading={this.props.isLoading}
              onPress={() => {
                this.saveCompany();
              }}
              style={{ marginTop:30 }}
            />
            </Column>
          </ScrollView>
        </Column>
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
});

export default Company;
