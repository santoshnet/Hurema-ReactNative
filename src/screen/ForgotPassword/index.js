import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  sendForgotPasswordOTP,
  passwordReset,
} from '../../redux/actions/ForgotPasswordAction';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import UserInput from './../../components/UserInput/index';
import LoadingButton from './../../components/LoadingButton/index';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Validator from '../../utils/Validator/Validator';
import {
  DEFAULT_RULE,
  EMAIL_RULE,
  PASSWORD_RULE,
} from '../../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import Row from './../../components/Row';
import TextViewMedium from '../../components/CustomText/TextViewMedium';

class ForgotPassword extends Component {
  pinInput = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      otp: '',
      timer: 30,
      showTimer: false,
      emailError: false,
      hideEmail: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  sendOTP = () => {
    const {email} = this.state;
    this.setState({emailError: false});
    if (!Validator(email, DEFAULT_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    } else if (!Validator(email, EMAIL_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    } else {
      this.sendVerificationCode();
    }
  };

  resendOTP = () => {
    this.setState({showTimer: true});
    this.sendVerificationCode();

    this.interval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({timer: this.state.timer - 1});
      } else {
        this.setState({timer: 30, showTimer: false});
        clearInterval(this.interval);
      }
    }, 3000);
  };

  sendVerificationCode = () => {
    const data = {
      email: this.state.email,
    };
    this.props.sendForgotPasswordOTP(data).then(res => {
      console.log(this.props.data);
      if (this.props.data) {
        Toast.show(this.props.data.message, Toast.LONG);
        this.setState({hideEmail: true});
      } else {
        Toast.show(
          'We are facing technical error please try after sometime',
          Toast.LONG,
        );
      }
    });
  };

  resetPassword=()=>{
    const {email,otp, password} = this.state;
    if(otp.length<4){
      this.pinInput.current.shake().then(() => this.setState({code: ''}));
      Toast.show("Please enter valid OTP", Toast.LONG);
    }else if (!Validator(password, DEFAULT_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    } else if (!Validator(password, PASSWORD_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    }else{
     const data={
        email:email,
        password:password,
        otp:otp
      }
      this.props
      .passwordReset(data)
      .then(res => {
        console.log(this.props.data);
        if(this.props.data){
          Toast.show(this.props.data.message, Toast.LONG);
          this.props.navigation.navigate('Login')
        }else if(this.props.error){
          Toast.show(this.props.error.message, Toast.LONG);
        }else{
          Toast.show("We are facing technical error please try after sometime", Toast.LONG);
        }
  
      });
    }
  }

  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar />
        <View style={{flex: 0.15, padding: 10}}>
          <Header
            title="ForgotPassword"
            text="Reset your password using your register email."
          />
        </View>
        <Column style={styles.container}>
          {this.state.hideEmail ? (
            <View style={{marginTop: 50}}>
              <View style={{alignSelf: 'center', marginBottom:30}}>
                <SmoothPinCodeInput
                  ref={this.pinInput}
                  cellStyle={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: Colors.lightgray,
                    backgroundColor: Colors.white,
                  }}
                  cellSpacing={20}
                  cellStyleFocused={{
                    borderColor: Colors.colorPrimary,
                  }}
                  value={this.state.otp}
                  onTextChange={otp => this.setState({otp})}
                  onBackspace={() => console.log('No more back.')}
                />
              </View>
              <UserInput
                placeholder="Enter password"
                label="Password"
                secureTextEntry
                error={this.state.passwordError}
                value={this.state.password}
                onChangeText={password => {
                  this.setState({
                    password,
                  });
                }}
              />
              <LoadingButton
                title="Reset Password"
                loading={this.props.isLoading}
                onPress={() => {
                  this.resetPassword();
                }}
                style={{marginTop: 30}}
              />

              <Row style={{alignSelf: 'center', marginTop: 50}}>
                <TextViewMedium>Have n't received OTP?</TextViewMedium>
                {this.state.showTimer ? (
                  <TextViewMedium style={{color: Colors.colorPrimary}}>
                    {' '}
                    {this.state.timer}
                  </TextViewMedium>
                ) : (
                  <TouchableOpacity onPress={this.resendOTP}>
                    <TextViewMedium style={{color: Colors.colorPrimary}}>
                      {' '}
                      Resend OTP
                    </TextViewMedium>
                  </TouchableOpacity>
                )}
              </Row>
            </View>
          ) : (
            <View style={{marginTop: 50}}>
              <UserInput
                placeholder="Enter email"
                label="Email"
                error={this.state.emailError}
                value={this.state.email}
                onChangeText={email => {
                  this.setState({
                    email,
                  });
                }}
              />
              <LoadingButton
                title="Send OTP"
                loading={this.props.isLoading}
                onPress={() => {
                  this.sendOTP();
                }}
              />
            </View>
          )}
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

const mapStateToProps = state => ({
  isLoading: state.ForgotPasswordReducer.isLoading,
  data: state.ForgotPasswordReducer.data,
  error: state.ForgotPasswordReducer.error,
});

const mapDispatchToProps = dispatch => ({
  sendForgotPasswordOTP: data => dispatch(sendForgotPasswordOTP(data)),
  passwordReset: data => dispatch(passwordReset(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
