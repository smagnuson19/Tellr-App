import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Style from '../styling/Style';

class SignUp extends Component {
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>Hello World! </Text>
        </View>
        <View style={Style.inputContainer}>
          <Text style={styles.welcome}>This will be the beginning of the Tellr scaffold</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default SignUp;
