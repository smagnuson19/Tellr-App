import React, { Component } from 'react';
import {
  View, Image, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { FormInput, Button } from 'react-native-elements';
import { colors } from '../styling/base';
import Style from '../styling/Style';
import { loginUser } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }


  // Don't allow going back once logged in

  submitEmail() {
    // So that you are unable to navigate back to login page once logged in.


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
                enablesReturnKeyAutomatically="true"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                keyboardType="email-address"
                textContentType="username"
                returnKeyType="next"
                selectionColor={colors.grey}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}

              />
              <FormInput
                containerStyle={Style.fieldContainer}
                inputStyle={Style.fieldText}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry="true"
                placeholderTextColor={colors.grey}
                textContentType="password"
                spellCheck="false"
                placeholder="Password..."
                returnKeyType="done"
                selectionColor={colors.grey}
                ref={(input) => { this.secondTextInput = input; }}
                onSubmitEditing={() => this.submitEmail()}
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


export default connect(mapStateToProps, { loginUser })(Login);
