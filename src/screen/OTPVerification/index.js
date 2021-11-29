import React, {Component} from 'react';
import {connect} from 'react-redux';
import { sendActivationCode } from "../../redux/actions/ResendActivationAction";
import { otpVerification } from "../../redux/actions/OTPVerificationAction";
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AppBar from '../../components/AppBar';
import Column from '../../components/Column';
import Header from '../../components/Header';
import {Colors, Dimensions} from '../../theme';
import TextViewBold from './../../components/CustomText/TextViewBold';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { getUserDetails } from '../../utils/LocalStorage';
import LoadingButton from './../../components/LoadingButton/index';
import Toast from 'react-native-simple-toast';
import Row from './../../components/Row/index';
import TextViewMedium from './../../components/CustomText/TextViewMedium';
class OTPVerification extends Component {
  pinInput = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      user:'',
      timer:30,
      showTimer:false
    };
  }

  async componentDidMount(){
    let userDetails = await getUserDetails();
    this.setState({
      user: userDetails,
    });
  }

  _checkCode = code => {
    if (code != '1234') {
      this.pinInput.current.shake().then(() => this.setState({code: ''}));
    }
  };

  OTPVerification=()=>{
    const {code}=this.state;
    if(code.length!==4){
      this.pinInput.current.shake().then(() => this.setState({code: ''}));
      Toast.show("Please enter valid OTP", Toast.LONG);
    }else{
      this.props
      .verifyOTP(code)
      .then(res => {
        console.log(this.props.data);
        if(this.props.data){
          if(this.state.userDetails.role!==null && this.state.userDetails.role===1 && this.state.userDetails.user.company_id===null){
            this.props.navigation.replace("Company");
          }else{
            this.props.navigation.replace("HomeScreen");
          }

        }else if(this.props.error){
          Toast.show(this.props.error.message, Toast.LONG);
        }else{
          Toast.show("We are facing technical error please try after sometime", Toast.LONG);
        }
  
      });
    }
  }

 
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }

  resendOTP=()=>{
    this.setState({showTimer:true})
    this.props
    .sendActivationCode()
    .then(res => {
      console.log(this.props.message);
      if(this.props.message){
        Toast.show(this.props.message.message, Toast.LONG);

      }else{
        Toast.show("We are facing technical error please try after sometime", Toast.LONG);
      }

    });
    this.interval = setInterval(() => {
       if(this.state.timer>0){
             this.setState({timer:this.state.timer-1});
       }else{
         this.setState({timer:30, showTimer:false})
         clearInterval(this.interval);
       }
    }, 3000);
  }

  render() {
    return (
      <Column style={{backgroundColor: Colors.colorPrimaryDark, flex: 1, }}>
        <AppBar />
        <View style={{flex: 0.15, padding: 10}}>
          <Header
            title="OTPVerification"
            text="Enter 4 digit code sent to your register email "
          />
        </View>
        <Column style={styles.container}>
          <View style={{alignSelf: 'center'}}>
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
              value={this.state.code}
              onTextChange={code => this.setState({code})}
              onBackspace={() => console.log('No more back.')}
            />

            <LoadingButton
              title="Verify OTP"
              loading={this.props.isLoading}
              onPress={() => {
                this.OTPVerification();
              }}
              style={{ marginTop:30 }}
            />

            <Row style={{ alignSelf:'center', marginTop:50}}>
            <TextViewMedium>Have n't received OTP?</TextViewMedium>
            {this.state.showTimer?  <TextViewMedium style={{ color:Colors.colorPrimary }}> {this.state.timer}</TextViewMedium>:
              <TouchableOpacity onPress={this.resendOTP}>
                 <TextViewMedium style={{ color:Colors.colorPrimary }}> Resend OTP</TextViewMedium>
              </TouchableOpacity>}
             
              
            </Row>
          </View>
        </Column>
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    width:Dimensions.window.width,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 70,
  },
});

const mapStateToProps = state => ({
  isLoading:state.ResendActivationReducer.isLoading,
  message:state.ResendActivationReducer.message,
  data:state.OTPVerificationReducer.data,
  otpError:state.OTPVerificationReducer.error,
  error:state.ResendActivationReducer.error
})

const mapDispatchToProps = dispatch => ({
  sendActivationCode: () => dispatch(sendActivationCode()),
  verifyOTP:(code) => dispatch(otpVerification(code))
})

export default connect(mapStateToProps,mapDispatchToProps)(OTPVerification)

