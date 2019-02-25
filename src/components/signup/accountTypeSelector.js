import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  FormInput,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// import NavigationBar from './navigationbar';

import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';
// import { dimensions } from '../../styling/base';


class SignUpFirstDialouge extends Component {
  constructor() {
    super();
    this.state = {
      accountSelected: null,
      firstName: '',
      lastName: '',
      familyName: '',
    };
  }


  renderViewPagerPage = (data) => {
    return (
      <View style={Style.page}>
        <Text>{data}</Text>
      </View>
    );
  }

  //  onPress={() => this.props.navigation.navigate('SignUp', {
  // userType: 'Parent',
  nextPage() {
    if (this.state.firstName === '') {
      Alert.alert('First Name cannot be empty');
      console.log('ERROR: first name empty');
    } else if (this.state.lastName === '') {
      Alert.alert('Last Name cannot be empty');
      console.log('ERROR: last name empty');
    } else if (this.state.accountSelected === null) {
      Alert.alert('Please select an account type');
      console.log('ERROR: emptyAccountType');
    } else if (this.state.familyName === '') {
      Alert.alert('Family Name cannot be empty');
      console.log('ERROR: family name empty');
    } else {
      this.props.navigation.navigate('SignUp', {
        userType: this.state.accountSelected,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        familyName: this.state.familyName,
      });
    }
  }


  parentSelect() {
    this.setState({ accountSelected: 'Parent' });
    console.log(this.state);
    console.log('parent');
  }

  childSelect() {
    this.setState({ accountSelected: 'Child' });
    console.log(this.state);
    console.log('child');
  }

  renderBlur(account) {
    if (this.state.accountSelected === account) {
      return (
        <View style={{
          backgroundColor: '#6e6e6e',
          opacity: 0.5,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        >
          <Text style={PageStyle.buttonText}>
            {account}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ opacity: 1 }}>
          <Text style={PageStyle.buttonText}>
            {account}
          </Text>
        </View>
      );
    }
  }


  render() {
    return (

      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Account Info </Text>
            <View style={PageStyle.buttonContainer}>
              <TouchableOpacity
                style={PageStyle.buttonfill}
                onPress={() => this.parentSelect()}
              >
                {this.renderBlur('Parent')}


              </TouchableOpacity>


              <TouchableOpacity
                style={PageStyle.buttonfill}
                onPress={() => this.childSelect()}
              >
                {this.renderBlur('Child')}


              </TouchableOpacity>


            </View>
            <View style={PageStyle.inputContainer}>
              <FormInput
                containerStyle={PageStyle.fieldContainer}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
                placeholder="First Name"
                inputStyle={Style.fieldText}
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={PageStyle.fieldContainer}
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
                placeholder="Last Name"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                ref={(input) => { this.secondTextInput = input; }}
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
              />

              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={PageStyle.fieldContainer}
                onChangeText={text => this.setState({ familyName: text })}
                value={this.state.familyName}
                placeholder="Family Name"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="done"
                ref={(input) => { this.thirdTextInput = input; }}
              />
            </View>

            <View style={PageStyle.continueButtonContainer}>
              <TouchableOpacity
                style={PageStyle.bottomInputContainer}
                onPress={() => this.nextPage()}
              >
                <Text style={PageStyle.buttonText}>
                Continue &gt;
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </LinearGradient>
      </View>
    );
  }
}

const PageStyle = StyleSheet.create({
  continueButtonContainer: {
    flex: 1,
    margin: '10%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    paddingTop: '10%',
    marginBottom: '15%',
    borderColor: '#000000',
    color: colors.white,
  },
  buttonContainer: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonfill: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    marginHorizontal: '2%',
    width: '45%',
    height: '50%',
  },

  buttonText: {
    fontFamily: fonts.secondary,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: fonts.lg,
    color: '#ffff',


  },
  inputContainer: {
    flex: 1,
    marginBottom: '15%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomInputContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default SignUpFirstDialouge;
