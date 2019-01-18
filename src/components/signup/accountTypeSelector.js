import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-elements';
import Style from '../../styling/Style';
import { colors } from '../../styling/base';
// import { dimensions } from '../../styling/base';

class SignUpFirstDialouge extends Component {
  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Choose Account Type </Text>
            <View style={Style.buttonContainer}>
              <TouchableOpacity
                style={Style.buttonGradient}
                onPress={() => this.props.navigation.navigate('SignUp', {
                  userType: 'Parent',
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
                  userType: 'Child',
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
