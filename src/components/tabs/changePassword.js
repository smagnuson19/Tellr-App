import React, { Component } from 'react';
import {
  View, Text, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button, FormInput,
} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts } from '../../styling/base';
import { themeColors } from '../../styling/colorModes';
import { postChangePassword } from '../../actions/index';

import Style from '../../styling/Style';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Change Password </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Change Password </Text>
      );
    }
  }

  changePassword() {
    // move to home page after you change password
    let resetAction;
    if (this.props.account.accountType === 'Parent') {
      if (this.props.mode === 0) {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ParentTabBarLight' }),
          ],
        });
      } else {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ParentTabBarDark' }),
          ],
        });
      }
    } else if (this.props.mode === 0) {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarLight' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarDark' }),
        ],
      });
    }
    const payLoad = {
      email: this.props.account.email,
      password: this.state.oldPassword,
      newPassword: this.state.newPassword,
    };
    // Error checking: make sure all of the fields are filled in
    if (this.state.oldPassword === '') {
      Alert.alert('Please enter your old password');
      console.log('ERROR: old password empty');
    } else if (this.state.newPassword === '') {
      Alert.alert('Please enter your new password');
      console.log('ERROR: new password empty');
    } else {
      console.log(payLoad);
      this.props.postChangePassword(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            {this.headingDisplay()}
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ oldPassword: text })}
                value={this.state.oldPassword}
                placeholder="Enter old password..."
                placeholderTextColor={colors.placeholderColor}
                returnKeyType="next"
                secureTextEntry="true"
                textContentType="password"
              />
              <FormInput
                ref={(input) => { this.fithTextInput = input; }}
                returnKeyType="done"
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ newPassword: text })}
                value={this.state.newPassword}
                placeholder="Enter new password..."
                placeholderTextColor={colors.placeholderColor}
                secureTextEntry="true"
                textContentType="password"
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                title="Change Password"
                large
                raised
                color={themeColors.buttonTextColor}
                fontFamily={fonts.secondary}
                style={Style.button}
                buttonStyle={
                      {
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowOpacity: 0.8,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 1, height: 13 },
                        backgroundColor: themeColors.buttonColor[this.props.mode],
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                onPress={() => this.changePassword()}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


const mapStateToProps = state => (
  {
    account: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postChangePassword })(ChangePassword);
