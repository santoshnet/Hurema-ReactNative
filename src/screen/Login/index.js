import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import UserInput from './../../components/UserInput';
import LoadingButton from './../../components/LoadingButton/index';
import {login} from '../../redux/actions/LoginAction';
import Validator from '../../utils/Validator/Validator';
import {
  DEFAULT_RULE,
  EMAIL_RULE,
  PASSWORD_RULE,
} from '../../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import TextViewMedium from '../../components/CustomText/TextViewMedium';
import {setUserDetails, setApiKey} from './../../utils/LocalStorage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
    };
  }

  userLogin = () => {
    const {email, password} = this.state;
    this.setState({emailError: false, passwordError: false});
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
    } else if (!Validator(password, DEFAULT_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    } else if (!Validator(password, PASSWORD_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    this.props.login(data).then(res => {
      const {userDetails, error} = this.props;
      if (userDetails && userDetails !== null) {
        Toast.show('User logged in successfully.', Toast.LONG);
        setApiKey(userDetails.token_type + ' ' + userDetails.token);
        setUserDetails(userDetails);
        if (userDetails.user.active) {
          if (
            userDetails.user.company_id === null &&
            userDetails.role.id === 1
          ) {
            this.props.navigation.replace('Company');
          } else if (userDetails.user.company_id === null) {
            Toast.show(
              'Please contact your administrator to add his/her company',
              Toast.LONG,
            );
          } else {
            this.props.navigation.replace("HomeScreen");
          }
        } else {
          this.props.navigation.replace('OTPVerification');
        }
      } else {
        Toast.show(this.props.error.error, Toast.LONG);
      }
    });
  };

  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar statusBarStyle="light-content" />
        <View style={{flex: 0.15, padding: 10}}>
          <Header title="Login" text="Login now to begin an amazing journey." />
        </View>
        <Column style={styles.container}>
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <TextViewMedium
              style={{
                alignSelf: 'flex-end',
                marginBottom: 20,
                marginTop: -10,
                color: Colors.grey,
              }}>
              ForgotPassword?
            </TextViewMedium>
          </TouchableOpacity>
          <LoadingButton
            title="Login"
            loading={this.props.isLoading}
            onPress={() => {
              this.userLogin();
            }}
          />
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
    paddingTop: 70,
  },
});

const mapStateToProps = state => ({
  isLoading: state.LoginReducer.isLoading,
  loggedIn: state.LoginReducer.loggedIn,
  userDetails: state.LoginReducer.userDetails,
  error: state.LoginReducer.error,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
