import React, { Component } from 'react';
import {
  View, Image, Alert, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { FormInput, Button } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Style from '../styling/Style';
import { colors, fonts } from '../styling/base';
import { loginUser, postForgotPassword } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDialogVisible: false,
    };
  }

  // Don't allow going back once logged in
  submitEmail() {
    if (this.state.email === '') {
      Alert.alert('Please enter an email address');
      console.log('ERROR: no email login');
    } else if (this.state.password === '') {
      Alert.alert('Please enter a password');
      console.log('ERROR: empty password login');
    } else {
      const payLoad = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(payLoad).then(() => {
        if (this.props.authenticated) {
          console.log('User is logged in');
          this.props.navigation.navigate('Loading');
        } else if (this.props.errorMessage) {
          Alert.alert(this.props.errorMessage);
        }
      });
    }
  }

  forgotPassword(inputText) {
    console.log('forgot password clicked');
    const payLoad = {
      email: inputText,
    };
    // Error checking: make sure all of the fields are filled in
    if (inputText === '') {
      Alert.alert('Please enter a valid email address');
      console.log('ERROR: Forgot Password email empty');
    } else {
      console.log(payLoad);
      this.props.postForgotPassword(payLoad);
    }
  }

  render() {
    const img = require('../media/Tellr-Logo.gif');
    return (
      <View style={Style.rootContainer}>

        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Image
              style={Style.headerImage}
              source={img}
            />
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainer}
                inputStyle={Style.fieldText}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.text}
                placeholder="Email..."
                placeholderTextColor={colors.grey}
                spellCheck="false"
                keyboardType="email-address"
                returnKeyType="next"
                selectionColor={colors.grey}

              />
              <FormInput
                containerStyle={Style.fieldContainer}
                inputStyle={Style.fieldText}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry="true"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                placeholder="Password..."
                selectionColor={colors.grey}
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                large
                raised
                rounded
                onPress={() => this.submitEmail()}
                title="LOG IN"
                backgroundColor={colors.logoGreen}
                accessibilityLabel="enter email"
                style={Style.button}
              />
              <Button
                large
                raised
                rounded
                title="CREATE ACCOUNT"
                backgroundColor={colors.logoGreen}
                onPress={() => this.props.navigation.navigate('SignUpFirstDialouge')}
                style={Style.button}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ isDialogVisible: true })}
                >
                  <Text style={{
                    color: 'white', fontFamily: fonts.secondary, fontSize: fonts.smmd, fontWeight: 'bold',
                  }}
                  >
Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <DialogInput
                isDialogVisible={this.state.isDialogVisible}
                title="Forgot Password?"
                message="Please enter the email address associated with the account, then check your inbox for a password reset email. "
                hintInput="example@email.com"
                submitInput={(inputText) => { this.forgotPassword(inputText); }}
                closeDialog={() => this.setState({ isDialogVisible: false })}
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
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  });


export default connect(mapStateToProps, { loginUser, postForgotPassword })(Login);
