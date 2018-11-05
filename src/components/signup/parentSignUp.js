import React, { Component } from 'react';
import {
  View,
  Text,
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

class ParentSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      familySize: '',
    };
  }

  createAccount() {
    const payLoad = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      familySize: this.state.familySize,
      accountType: 'Parent',
    };

    axios.post(`${ROOT_URL}`, { payLoad })
      .then((response) => {
        console.log(response.data);
      });

    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.headerText}>Create Account </Text>
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
                placeholder="First Name"
                inputStyle={Style.fieldText}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
                placeholder="Last Name"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email Address"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Family Size"
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={Style.fieldContainer}
                onChangeText={text => this.setState({ familySize: text })}
                value={this.state.familySize}
                placeholder="Reward: $0.00"
              />
              <View style={Style.buttonContainer}>
                <Button
                  large
                  raised
                  rounded
                  title="Get Started"
                  onPress={() => this.createAccount()}
                  backgroundColor="#3de594"
                  accessibilityLabel="enter email"
                  style={Style.button}
                />
              </View>
            </View>
          </View>
        </LinearGradient>

      </View>
    );
  }
}


export default ParentSignUp;
