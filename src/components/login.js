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
      email: 'test@test.com',
    };

    axios.post(`${ROOT_URL}`, { loginInfo })
      .then((response) => {
        console.log(this.state.email);
        console.log(response.data);
      });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <TextInput
          onChangeText={text => this.setState({ email: text })}
          value={this.state.text}
          defaultValue="Email"
        />
        <Button
          onPress={this.submitEmail}
          title="Submit"
          color="#841584"
          accessibilityLabel="enter email"
        />
      </View>
    );
  }
}

export default Login;
