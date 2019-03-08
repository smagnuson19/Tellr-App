import React, { Component } from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  FormInput,
  Button,
} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Logo from './LoginAdditions/logo';
import Style from '../styling/Style';
import {
  colors,
  fonts,
} from '../styling/base';
import {
  loginUser,
  postForgotPassword,
  authError,
} from '../actions/index';
import deviceStorage from '../actions/deviceStorage';
import FirstLaunchOnboarding from './LoginAdditions/firstLaunchOnboarding';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDialogVisible: false,
      firstLaunch: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        deviceStorage.saveItem('alreadyLaunched', JSON.stringify(true)); // No need to wait for `setItem` to finish
        this.setState({ firstLaunch: true });
      } else {
        this.setState({ firstLaunch: false });
      }
    }); // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
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
      AsyncStorage.getItem('deviceInfo').then((deviceInfo) => {
        console.log(deviceInfo);
        const payLoad = {
          email: this.state.email,
          password: this.state.password,
          oneSignalID: deviceInfo,
        };
        this.props.loginUser(payLoad);
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
    // The two things we are checking for
    if (this.props.authenticated) {
      console.log('User is logged in');
      this.props.navigation.navigate('Loading');
    } else if (this.props.errorMessage) {
      Alert.alert(this.props.errorMessage);
      this.props.authError(null);
    }

    if (this.state.firstLaunch === null) {
      return (null);

      // turn the below to false in order to do some dev work on the firstlaunch screen
    } else if (this.state.firstLaunch === true) {
      // pass in a navigation prop to navigate back to this with this.state.firstLaunch
      // set to false OR take the below out into another component.
      // Alternatively could put FirstLaunchOnboarding on AuthLoading.js?
      return (<FirstLaunchOnboarding />);
    } else {
      return (
        <View style={Style.rootContainer}>

          <LinearGradient
            colors={[colors.linearGradientTop, colors.linearGradientBottom]}
            style={Style.gradient}
          >
            <View
              style={Style.contentWrapper}
            >
              <Logo />

              <View style={Style.inputContainer}>
                <FormInput
                  containerStyle={Style.fieldContainer}
                  inputStyle={Style.fieldText}
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.text}
                  placeholder="Email..."
                  placeholderTextColor={colors.grey}
                  spellCheck={false}
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
                  secureTextEntry
                  placeholderTextColor={colors.grey}
                  textContentType="password"
                  spellCheck={false}
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

                  onPress={() => this.submitEmail()}
                  title="LOG IN"
                  backgroundColor={colors.secondary}
                  accessibilityLabel="enter email"
                  style={Style.button}
                />
                <Button
                  large
                  raised

                  title="CREATE ACCOUNT"
                  backgroundColor={colors.secondary}
                  onPress={() => this.props.navigation.navigate('SignUpFirstDialouge')}
                  style={Style.button}
                />
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
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
}

const mapStateToProps = state => (
  {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  });


export default connect(mapStateToProps, { loginUser, postForgotPassword, authError })(Login);
