import React, {Component} from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import UserInput from './../../components/UserInput';
import LoadingButton from './../../components/LoadingButton/index';
import { register } from "../../redux/actions/RegisterAction";
import Validator from '../../utils/Validator/Validator';
import {DEFAULT_RULE, EMAIL_RULE, PASSWORD_RULE} from '../../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import TextViewMedium from '../../components/CustomText/TextViewMedium';
import { setUserDetails,setApiKey } from './../../utils/LocalStorage';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      email: '',
      password: '',
      nameError:false,
      emailError:false,
      passwordError:false
    };
  }

  userRegister = () => {
    const {name,email,password}=this.state;
    this.setState({nameError:false,emailError: false, passwordError:false})
    if (!Validator(name, DEFAULT_RULE)) {
      this.setState({
        nameError: true,
      });
      return;
    }
    else if (!Validator(email, DEFAULT_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    }
    else if (!Validator(email, EMAIL_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    }
    else if (!Validator(password, DEFAULT_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    }
    else if (!Validator(password, PASSWORD_RULE)) {
      this.setState({
        passwordError: true,
      });
      return;
    }

    const data={
      name:name,
      email:email,
      password:password
    }
    this.props
    .register(data)
    .then(res => {
      const {userDetails,error}=this.props;
      if(userDetails && userDetails!==null){
        Toast.show('User Register successfully.', Toast.LONG);
        setApiKey(userDetails.token_type+" "+userDetails.token);
        setUserDetails(userDetails);
       
          this.props.navigation.replace("OTPVerification");
        
      }else{
        Toast.show(this.props.error.error, Toast.LONG);
      }
    });
   

  }

  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar statusBarStyle="light-content" />
        <View style={{flex: 0.15, padding:10}}>
        <Header title="Register" text="Register now to begin an amazing journey."/>
        </View>
        <Column style={styles.container}>
           <UserInput 
            placeholder="Enter Name" 
            label="Name"
            error={this.state.nameError}
            value={this.state.name}
            onChangeText={name => {
              this.setState({
                name,
              })}
            }
          />
           <UserInput 
            placeholder="Enter email" 
            label="Email"
            error={this.state.emailError}
            value={this.state.email}
            onChangeText={email => {
              this.setState({
                email,
              })}
            }
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
              })}
            }/>
           
           <LoadingButton title="Login"  
           loading={this.props.isLoading}
           onPress={() => {
                          this.userRegister();
                        }}/>
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
    padding:20,
    paddingTop:70
  }
});


const mapStateToProps = state => ({
  isLoading:state.RegisterReducer.isLoading,
  loggedIn:state.RegisterReducer.loggedIn,
  userDetails:state.RegisterReducer.userDetails,
  error:state.RegisterReducer.error
})

const mapDispatchToProps = dispatch => ({
  register: (data) => dispatch(register(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Register)