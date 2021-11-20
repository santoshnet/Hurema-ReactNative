import React, {Component} from 'react';
import {View, StyleSheet,Alert} from 'react-native';
import {connect} from 'react-redux';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import UserInput from './../../components/UserInput';
import LoadingButton from './../../components/LoadingButton/index';
import { login } from "../../redux/actions/LoginAction";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
    };
  }

  userLogin = () => {
    const {email,password}=this.state;
    const data={
      email:email,
      password:password
    }
    this.props
    .login(data)
    .then(res => {
      console.log(res);
      this.setState({ loading: false });
      Alert.alert(JSON.stringify(this.props.user));
    })
    .catch(error => {
      // console.log('loginsignin error')
      console.log(error.response);
      this.setState({ loading: false });
      Alert.alert("error");
    });

  }

  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1}}>
        <AppBar />
        <View style={{flex: 0.15, padding:10}}>
        <Header title="Login" text="Login now to begin an amazing journey."/>
        </View>
        <Column style={styles.container}>
           <UserInput 
            placeholder="Enter email" 
            label="Email"
            error
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
            value={this.state.password}
            onChangeText={password => {
              this.setState({
                password,
              })}
            }/>
           <LoadingButton title="Login"  
           loading={this.props.isLoading}
           onPress={() => {
                          this.userLogin();
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
  isLoading:state.LoginReducer.isLoading,
  loggedIn:state.LoginReducer.loggedIn,
  user:state.LoginReducer.user,
  error:state.LoginReducer.error
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)

