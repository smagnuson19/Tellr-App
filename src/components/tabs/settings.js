// Example code from: https://devhub.io/repos/markgoodyear-react-native-settings-list

import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Image,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import { logoutUser, postChangePassword } from '../../actions';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }

  logout() {
    console.log('logout Clicked');
    this.props.logoutUser();
    this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'Login' }));
  }

  // deleteAccount() {
  //   // TODO: Are you sure you want to delete account (like with payments)
  //   // move to login page after you delete the account
  //   const resetAction = StackActions.reset({
  //     index: 0, // <-- currect active route from actions array
  //     key: null,
  //     actions: [
  //       NavigationActions.navigate({ routeName: 'Login' }),
  //     ],
  //   });
  //
  //   const payLoad = {
  //     email: this.state.myEmail,
  //   };
  //   axios.post(`${ROOT_URL}/delete`, { payLoad })
  //     .then((response) => {
  //       console.log('deleting 222');
  //       console.log(response.data);
  //     });
  // }


  render() {
    return (
      <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
        <Text style={Style.headerText}>Settings </Text>
        <SettingsList borderColor="#c8c7cc">
          <SettingsList.Header headerStyle={{ marginTop: 15 }} headerText="Notifications" />
          <SettingsList.Item
            hasSwitch
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title="Allow Push Notifications"
            titleStyle={{ fontSize: 16 }}
          />
          <SettingsList.Header headerStyle={{ marginTop: 15 }} headerText="Manage" />
          <SettingsList.Item
            title="Change Password"
            titleStyle={{ fontSize: 16 }}
            onPress={() => this.props.navigation.navigate('ChangePassword')}
          />
          <SettingsList.Item
            title="Delete Account"
            hasNavArrow={false}
            titleStyle={{ fontSize: 16 }}
            onPress={() => Alert.alert('Are you sure you want to delete account?')}
          />
          <SettingsList.Item
            title="Logout"
            hasNavArrow={false}
            titleStyle={{ fontSize: 16 }}
            onPress={() => this.logout()}
          />
        </SettingsList>
      </LinearGradient>
    );
  }
}
const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
  });


export default connect(mapStateToProps, {
  logoutUser, postChangePassword,
})(Settings);
