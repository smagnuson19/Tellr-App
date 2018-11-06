import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-elements';
import Style from '../../styling/Style';
// import { dimensions } from '../../styling/base';

class SignUpFirstDialouge extends Component {
  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Choose Account Type </Text>
            <View style={Style.buttonContainer}>
              <TouchableOpacity
                style={Style.buttonGradient}
                onPress={() => this.props.navigation.navigate('SignUp', {
                  userType: 'parent',
                })
            }
              >
                <Text style={Style.buttonText}>
                    Parent
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={Style.buttonGradient}
                onPress={() => this.props.navigation.navigate('SignUp', {
                  userType: 'child',
                })}
              >
                <Text style={Style.buttonText}>
                      Child
                </Text>

              </TouchableOpacity>


            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default SignUpFirstDialouge;
