//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {getUserDetails, logout} from '../utils/LocalStorage';
import Column from './../components/Column/index';
import ProfileImage from '../assets/images/profile_image.png';
import TextViewMedium from './../components/CustomText/TextViewMedium';
import TextViewRegular from './../components/CustomText/TextViewRegular';
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage = ProfileImage;

    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'user',
        navOptionName: 'My Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'grid',
        navOptionName: 'Category',
        screenToNavigate: 'Category',
      },
      {
        navOptionThumb: 'gift',
        navOptionName: 'My Offers',
        screenToNavigate: 'Offers',
      },
      {
        navOptionThumb: 'command',
        navOptionName: 'New Products',
        screenToNavigate: 'NewProducts',
      },
      {
        navOptionThumb: 'codesandbox',
        navOptionName: 'Popular Products',
        screenToNavigate: 'PopularProducts',
      },
      {
        navOptionThumb: 'heart',
        navOptionName: 'WishList',
        screenToNavigate: 'WishList',
      },
      {
        navOptionThumb: 'map-pin',
        navOptionName: 'Address',
        screenToNavigate: 'Address',
      },

      {
        navOptionThumb: 'shopping-cart',
        navOptionName: 'My Cart',
        screenToNavigate: 'MyCart',
      },
      {
        navOptionThumb: 'file-text',
        navOptionName: 'My Order',
        screenToNavigate: 'MyOrder',
      },
    ];
  }

  async componentDidMount() {
    let userDetails = await getUserDetails();
    this.setState({user: userDetails.user});
  }

  logoutUser = () => {
    logout();
    // this.props.navigation.replace('Login');

    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  getActiveRouteState = name => {
    let active = false;
    if (this.props.state !== undefined) {
      let activeIndex = this.props.state.index;
      let activeRouteName = this.props.state.routes[activeIndex].name;
      if (activeRouteName === name) {
        active = true;
      }
    }
    return active;
  };

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileContainer}>
            <Column style={styles.detailsContainer}>
              <Image source={ProfileImage} style={styles.sideMenuProfileIcon} />
              {this.state.user !== null ? (
                <Column style={{ alignItems:'center' }}>
                  <TextViewMedium>{this.state.user.name}</TextViewMedium>
                  <TextViewRegular style={{ fontSize:14 }}>{this.state.user.email}</TextViewRegular>
                </Column>
              ) : null}
            </Column>
          </View>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#e2e2e2',
            }}
          />

          <View style={{width: '100%'}}>
            {this.items.map((item, key) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: this.getActiveRouteState(
                    item.screenToNavigate,
                  )
                    ? '#F7F7F7'
                    : Colors.white,
                }}
                key={key}>
                <View style={{marginRight: 15, marginLeft: 20}}>
                  <Icon
                    name={item.navOptionThumb}
                    size={22}
                    color={
                      this.getActiveRouteState(item.screenToNavigate)
                        ? Colors.colorPrimary
                        : '#808080'
                    }
                  />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: this.getActiveRouteState(item.screenToNavigate)
                      ? Colors.colorPrimary
                      : 'black',
                  }}
                  onPress={() => {
                    global.currentScreenIndex = key;
                    this.props.navigation.navigate(item.screenToNavigate);
                  }}>
                  {item.navOptionName}
                </Text>
              </View>
            ))}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                <Icon name="log-out" size={24} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
                onPress={() => {
                  this.logoutUser();
                }}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
  },

  profileContainer: {
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.colorPrimary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.colorPrimary,
    display: 'flex',
  },
});
