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
import Style2 from '../../styling/ParentStyle';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';
import { colors2 } from '../../styling/parent';

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

  parentDeleteDisplay() {
    if (this.props.user.accountType === 'Parent') {
      return (
        <SettingsList.Item
          title="Delete All Accounts"
          hasNavArrow={false}
          titleStyle={{ fontSize: 16 }}
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
    if (this.props.user.accountType === 'Parent') {
      return (
        <LinearGradient colors={[colors2.linearGradientTop, colors2.linearGradientBottom]} style={Style.gradient}>
          <Text style={Style2.headerText}>Settings </Text>
          <SettingsList borderColor="#c8c7cc">
            <SettingsList.Header headerStyle={pageStyle.sectionHeader2} headerText="Notifications" />
            <SettingsList.Item
              hasSwitch
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title="Allow Push Notifications"
              titleStyle={pageStyle.sectionText}
            />
            <SettingsList.Header headerStyle={pageStyle.sectionHeader2} headerText="Manage" />
            <SettingsList.Item
              title="Change Password"
              titleStyle={pageStyle.sectionText}
              // onPress={() => this.props.navigation.navigate('ChangePassword')}
              onPress={() => this.props.navigation.navigate('ChangePassword', {
                accountTypeIndicator: 'Parent',
              })
              }
            />
            <SettingsList.Item
              title="Delete Account"
              hasNavArrow={false}
              titleStyle={{ fontSize: 16 }}
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
    } else if (this.props.user.accountType === 'Child') {
      return (
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <Text style={Style.headerText}>Settings </Text>
          <SettingsList borderColor="#c8c7cc">
            <SettingsList.Header headerStyle={pageStyle.sectionHeader} headerText="Notifications" />
            <SettingsList.Item
              hasSwitch
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title="Allow Push Notifications"
              titleStyle={pageStyle.sectionText}
            />
            <SettingsList.Header headerStyle={pageStyle.sectionHeader} headerText="Manage" />
            <SettingsList.Item
              title="Change Password"
              titleStyle={pageStyle.sectionText}
              onPress={() => this.props.navigation.navigate('ChangePassword', {
                accountTypeIndicator: 'Child',
              })
              }
            />
            <SettingsList.Item
              title="Delete Account"
              hasNavArrow={false}
              titleStyle={{ fontSize: 16 }}
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
    } else {
      console.log('ERROR: accountType not loaded or selected proprely');
      return null;
    }
  }
}

const pageStyle = StyleSheet.create({
  sectionHeader: {
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
    marginTop: 15,
  },
  sectionHeader2: {
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
    marginTop: 15,
    color: 'white',
  },
  sectionText: {
    fontSize: fonts.smmd,
    fontFamily: fonts.secondary,
  },
});

const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
  });


export default connect(mapStateToProps, {
  logoutUser, postChangePassword, postParentDeleteAccount, postDeleteAccount,
})(Settings);
