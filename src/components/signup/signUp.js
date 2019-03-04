import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  FormInput,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import { postNewUser } from '../../actions';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyPassword: '',
      email: '',
      password: '',
      // avatar: '',
    };
  }

  createAccount() {
    const randomColor = require('randomcolor'); // import the script
    const color = randomColor({ luminosity: 'dark' }); // a hex code for an attractive color


    const { navigation } = this.props;
    const userType = navigation.getParam('userType');
    const firstName = navigation.getParam('firstName');
    const lastName = navigation.getParam('lastName');
    const familyName = navigation.getParam('familyName');

    const id = OneSignal.configure();
    if (id.userId === undefined) {
      id.userId = null;
    }
    // Describing what will be sent
    const payLoad = {
      firstName,
      lastName,
      email: this.state.email,
      password: this.state.password,
      familyName,
      accountType: userType,
      avatarColor: color,
      oneSignalID: id.userId,
      familyPassword: this.state.familyPassword,
      // avatar: this.state.avatar,
    };

    // checking for errors and notifying user

    if (this.state.email === '') {
      Alert.alert('Email cannot be empty');
      console.log('ERROR: email empty');
    } else if (this.state.password === '') {
      Alert.alert('Password cannot be empty');
      console.log('ERROR: password empty');
    // } else if (this.state.avatar === '') {
    //   Alert.alert('Avatar cannot be empty');
    //   console.log('ERROR: avatar empty');
    } else if (this.state.familyPassword === '') {
      Alert.alert('Family password cannot be empty');
      console.log('ERROR: family password empty');
    // } else if (this.state.avatar === '') {
    //   Alert.alert('Avatar cannot be empty');
    //   console.log('ERROR: avatar empty');
    } else {
      console.log('attempting to log in');
      // do a post if there are no errors in the fields
      this.props.postNewUser(payLoad)
        .then((response) => {
          // maybe backend returns a specific error so we can know for sure this
          // is the issue
          console.log(response);

          if (this.props.authenticated) {
            this.props.navigation.navigate('Auth', { emailParam: this.state.email }, NavigationActions.navigate({ routeName: 'Loading' }));
          } else if (this.props.errorMessage) {
            Alert.alert(this.props.errorMessage);
          }
        });
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Create Account </Text>
            <View style={pageStyle.inputContainer}>
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email Address"
                keyboardType="email-address"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ familyPassword: text })}
                value={this.state.email}
                placeholder="Family Password"
                keyboardType="email-address"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                ref={(input) => { this.fourthTextInput = input; }}
                onSubmitEditing={() => { this.fithTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="done"
                secureTextEntry="true"
                ref={(input) => { this.fithTextInput = input; }}
              />
            </View>
            <View style={pageStyle.buttonContainer}>
              <TouchableOpacity
                style={pageStyle.bottomInputContainer}
                onPress={() => this.createAccount()}
              >
                <Text style={pageStyle.buttonText}>
                Let&apos;s Start!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    borderColor: '#000000',
    color: colors.white,
  },
  inputContainer: {
    flex: 1,
    marginTop: '0%',
    marginBottom: '8%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    margin: '10%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  buttonText: {
    fontFamily: fonts.secondary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: fonts.lg,
    color: '#ffff',

  },
  bottomInputContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingTop: 25,
    paddingBottom: 25,
  },

});


const mapStateToProps = state => (
  {
    account: state.user.info,
    family: state.user.family,
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });


export default connect(mapStateToProps, {
  postNewUser,
})(SignUp);
