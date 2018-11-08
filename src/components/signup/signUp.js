import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {
  Button, FormInput,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';

const ROOT_URL = 'http://localhost:5000/api';
// const API_KEY = '';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      familyName: '',
    };
  }

  createAccount() {
    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    // Describing what will be sent
    const payLoad = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      familyName: this.state.familyName,
      accountType: 'Parent',
    };

    axios.post(`${ROOT_URL}/users`, { payLoad })
      .then((response) => {
        console.log(response.data);
        this.props.navigation.dispatch(resetAction);
      });
  }

  displayAdditionalFields(userType) {
    if (userType === 'child') {
      return (<View />);
    } else {
      return (
        <FormInput
          inputStyle={Style.fieldText}
          containerStyle={Style.fieldContainer}
          onChangeText={text => this.setState({ familyName: text })}
          value={this.state.familyName}
          placeholder="Family Name"
          placeholderTextColor="rgb(232, 232, 232)"
          spellCheck="false"
          returnKeyType="next"
          keyboardType="number-pad"
        />
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const userType = navigation.getParam('userType');

    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Create Account </Text>
            <View style={pageStyle.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
                placeholder="First Name"
                inputStyle={Style.fieldText}
                placeholderTextColor="rgb(232, 232, 232)"
                spellCheck="false"
                returnKeyType="next"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
                placeholder="Last Name"
                placeholderTextColor="rgb(232, 232, 232)"
                spellCheck="false"
                returnKeyType="next"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email Address"
                keyboardType="email-address"
                placeholderTextColor="rgb(232, 232, 232)"
                spellCheck="false"
                returnKeyType="next"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Set Password"
                placeholderTextColor="rgb(232, 232, 232)"
                spellCheck="false"
                returnKeyType="next"
              />

              {this.displayAdditionalFields(userType)}

            </View>
            <View style={pageStyle.buttonContainer}>
              <Button
                large
                raised
                rounded
                title="Get Started"
                backgroundColor="#3de594"
                onPress={() => this.createAccount()}
                style={Style.button}
              />
            </View>
          </View>
        </LinearGradient>

      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    margin: 20,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',

  },

});


export default SignUp;
