// Example code from: https://devhub.io/repos/markgoodyear-react-native-settings-list

import React, { Component } from 'react';
import {
  Text, StyleSheet, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import {
  logoutUser, postChangePassword, postDeleteAccount, postParentDeleteAccount,
} from '../../actions';
import Style from '../../styling/Style';
import { fonts } from '../../styling/base';
import { themeColors } from '../../styling/colorModes';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // switchValue: false,
      // colorMode: 0,
    };
    // this.onValueChange = this.onValueChange.bind(this);
  }

  // onValueChange(value) {
  //   this.setState({ switchValue: value });
  // }


  // setMode() {
  //   if (this.props.user.accountType === 'Parent') {
  //     this.setState({ colorMode: 0 });
  //   } else {
  //     this.setState({ colorMode: 1 });
  //   }
  // }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Settings </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Settings </Text>
      );
    }
  }

  parentDeleteDisplay() {
    if (this.props.user.accountType === 'Parent') {
      return (
        <SettingsList.Item
          title="Delete All Accounts"
          hasNavArrow={false}
          titleStyle={pageStyle.sectionText}
          onPress={() => this.deleteParenAccount()}
        />
      );
      // if a kid, don't have this button
    } else {
      return (null);
    }
  }

  logout() {
    console.log('logout Clicked');
    this.props.logoutUser();
    this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'Login' }));
  }

  postDelete() {
    const payLoad = {
      email: this.props.user.email,
    };
    console.log(payLoad);
    this.props.postDeleteAccount(payLoad);
    this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'Login' }));
  }

  deleteAccount() {
    // Confirmation alert
    Alert.alert(
      'Are you sure you want to delete your account?',
      'Deleting your account is permanent and will erase all data associated with your account.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => this.postDelete(),
        },
      ],
      { cancelable: false },
    );
  }

  postParentDelete() {
    const payLoad = {
      email: this.props.user.email,
    };
    console.log(payLoad);
    this.props.postParentDeleteAccount(payLoad);
    this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'Login' }));
  }

  deleteParenAccount() {
    // Confirmation alert
    Alert.alert(
      'Are you sure you want to delete your account and all children accounts?',
      'This action is permanent and will erase all data associated with your account and all child accounts.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => this.postParentDelete(),
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    console.log(this.props.mode);
    return (
      <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
        {this.headingDisplay()}
        <SettingsList borderColor="#c8c7cc">
          <SettingsList.Header
            headerStyle={{
              fontSize: fonts.md,
              fontFamily: fonts.secondary,
              marginTop: 15,
              color: themeColors.headerColor[this.props.mode],
            }}
            headerText="Styles"
          />
          <SettingsList.Item
              // hasSwitch
              // switchState={this.state.switchValue}
              // switchOnValueChange={this.onValueChange}
            // onPress={() => this.setMode()}
            hasNavArrow={false}
            title="Night Mode"
            titleStyle={pageStyle.sectionText}
          />
          <SettingsList.Header
            headerStyle={{
              fontSize: fonts.md,
              fontFamily: fonts.secondary,
              marginTop: 15,
              color: themeColors.headerColor[this.props.mode],
            }}
            headerText="Manage"
          />
          <SettingsList.Item
            title="Change Password"
            titleStyle={pageStyle.sectionText}
              // onPress={() => this.props.navigation.navigate('ChangePassword')}
            onPress={() => this.props.navigation.navigate('ChangePassword', {
              accountTypeIndicator: this.props.user.accountType,
            })
              }
          />
          <SettingsList.Item
            title="Delete Account"
            hasNavArrow={false}
            titleStyle={pageStyle.sectionText}
            onPress={() => this.deleteAccount()}
          />
          {this.parentDeleteDisplay()}
          <SettingsList.Item
            title="Logout"
            hasNavArrow={false}
            titleStyle={pageStyle.sectionText}
            onPress={() => this.logout()}
          />
        </SettingsList>
      </LinearGradient>
    );
  }
}

const pageStyle = StyleSheet.create({
  sectionText: {
    fontSize: fonts.smmd,
    fontFamily: fonts.secondary,
  },
});

const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
    // mode: state.user.colorMode,
    mode: 0,
  });


export default connect(mapStateToProps, {
  logoutUser, postChangePassword, postParentDeleteAccount, postDeleteAccount,
})(Settings);
