import React, { Component } from 'react';
import {
  View, Button, TextInput,
} from 'react-native';
import axios from 'axios';
import Style from '../styling/Style';


const ROOT_URL = 'http://localhost:5000/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  submitEmail() {
    const loginInfo = {
      email: '',
      password: '',
    };

    axios.post(`${ROOT_URL}`, { loginInfo })
      .then((response) => {
        console.log(this.state.email);
        console.log(response.data);
      });

    this.props.navigation.navigate('MainTabBar');
  }


  render() {
    return (
      <View style={Style.rootContainer}>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.text}
          placeholder="Email"
        />
        <TextInput
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
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

export default Login;
