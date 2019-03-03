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
import Style2 from '../../styling/ParentStyle';
import { colors, fonts } from '../../styling/base';
import { colors2 } from '../../styling/parent';
import { postChangePassword } from '../../actions/index';

import Style from '../../styling/Style';

let type;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    type = navigation.getParam('accountTypeIndicator');
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  changePassword() {
    // move to home page after you change password
    let resetAction;
    if (this.props.account.accountType === 'Parent') {
      console.log('Parent');
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ParentTabBar' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBar' }),
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
    // if (this.props.account.accountType === 'Parent') {
    if (type === 'Parent') {
    // if (true) {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors2.linearGradientTop, colors2.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              <Text style={Style2.headerText}>Change Password </Text>
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
                  style={Style.button}
                  backgroundColor={colors.logoGreen}
                  onPress={() => this.changePassword()}
                />
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    } else if (type === 'Child') {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              <Text style={Style.headerText}>Change Password </Text>
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
                  fontFamily={fonts.secondary}
                  style={Style.button}
                  color={colors.black}
                  buttonStyle={{
                    backgroundColor: colors.secondary,
                    alignSelf: 'center',
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
    } else {
      console.log('ERROR: accountType not loaded or selected proprely');
      console.log(type);
      return null;
    }
  }
}


const mapStateToProps = state => (
  {
    account: state.user.info,
  });

export default connect(mapStateToProps, { postChangePassword })(ChangePassword);
