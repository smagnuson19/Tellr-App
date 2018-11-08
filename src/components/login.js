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
    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });


    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(`${ROOT_URL}`, { loginInfo })
      .then((response) => {
        console.log(response.data);
        this.props.navigation.dispatch(resetAction);
      });
  }


  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
              />
              <FormInput
                containerStyle={Style.fieldContainer}
                inputStyle={Style.fieldText}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry="true"
                placeholderTextColor="rgb(232, 232, 232)"
                spellCheck="true"
                placeholder="Password..."
                selectionColor="rgba(255,0,255,0.0)"
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                large
                raised
                rounded
                onPress={() => this.submitEmail()}
                title="LOG IN"
                backgroundColor="#3de594"
                accessibilityLabel="enter email"
                style={Style.button}
              />
              <Button
                large
                raised
                rounded
                title="CREATE ACCOUNT"
                backgroundColor="#3de594"
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

export default Login;
