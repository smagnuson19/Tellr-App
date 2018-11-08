import React, { Component } from 'react';
import {
  View, Button,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { FormInput } from 'react-native-elements';
import Style from '../styling/Style';

const ROOT_URL = 'http://localhost:5000/api';

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
    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(`${ROOT_URL}`, { loginInfo })
      .then((response) => {
        console.log(response.data);
      });

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

          <FormInput
            onChangeText={text => this.setState({ email: text })}
            value={this.state.text}
            placeholder="Email"
            style={Style.fieldInput}
          />
          <FormInput
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholder="Password"
          />
          <Button
            onPress={() => this.submitEmail()}
            title="Submit"
            color="#841584"
            accessibilityLabel="enter email"
          />
          <Button
            title="Create Account"
            onPress={() => this.props.navigation.navigate('SignUpFirstDialouge')}
          />
        </LinearGradient>
      </View>

    );
  }
}

export default Login;
