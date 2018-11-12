import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage, Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import Style from '../../styling/Style';
import KeyPad from './keypad';
import { fonts, colors } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY_CHILD = 'children';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // accountSelected: '',
      amount: '0',
      familyMembers: [],
      senderEmail: '',
      childEmail: '',
    };
    this.aButtonPress = this.aButtonPress.bind(this);
  }

  componentDidMount() {
    // want to get the names for family member selector
    this.fetchNames();
  }

  updateAmount(item, prevState, props) {
    let updatedAmount = prevState.amount;
    // If there is a zero there, perform computations as if
    // nothing is there
    if (updatedAmount === '0') {
      updatedAmount = '';
    }
    if (updatedAmount.length === '5') {
      return { amount: updatedAmount };
    }
    if (item === '<') {
      if (updatedAmount !== '') {
        updatedAmount = updatedAmount.slice(0, updatedAmount.length - 1);
      } else {
        updatedAmount = '';
      }
    } else if (item === '.') {
      if (updatedAmount === '') {
        updatedAmount = '0.';
      } else if (updatedAmount !== '' && updatedAmount.indexOf('.') === -1) {
        updatedAmount += '.';
      }
    } else if ((updatedAmount.length - updatedAmount.indexOf('.') === 3) && updatedAmount.indexOf('.') !== -1) {
      updatedAmount += '';
    } else {
      updatedAmount += item;
    }
    // displays 0 if nothing is there
    if (updatedAmount === '') {
      updatedAmount = '0';
    }
    return { amount: updatedAmount };
  }

  sendMoney() {
    // move to home page after you send a payment
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'ParentTabBar' }),
      ],
    });

    // Describing what should be sent
    const payLoad = {
      email: this.state.childEmail,
      increment: this.state.amount,
      senderEmail: this.state.senderEmail,
    };

    // Error checking to make sure child is selected and amount > 0
    if (this.state.childEmail === '' || this.state.childEmail == null) {
      Alert.alert('Please select a child for this payment');
      console.log('ERROR: select child empty');
    } else if (this.state.amount === '0') {
      Alert.alert('Payments cannot be zero. Please enter a valid payment');
      console.log('ERROR: payment amount empty');
    } else {
      axios.post(`${ROOT_URL}/balance`, { payLoad })
        .then((response) => {
          console.log(response.data);
          this.props.navigation.dispatch(resetAction);
        });
    }
  }

  aButtonPress(item) {
    console.log(item);
    this.setState((prevState, props) => {
      return (this.updateAmount(item, prevState, props));
    });
  }

  fetchNames() {
    AsyncStorage.getItem('emailID', (err, result) => {
      // get rid of the quotes
      const API_KEY_USERS = result.slice(1, -1);
      console.log(API_KEY_USERS);
      this.setState({ senderEmail: API_KEY_USERS });

      return axios.get(`${ROOT_URL}/${API_KEY_CHILD}/${API_KEY_USERS}`).then((response) => {
        // make a list of the parent's children
        const childList = response.data;
        const childrenList = [];
        // loop through each kid and make an object for them with FirstName, Email
        Object.keys(childList).forEach((key) => {
          childrenList.push({ label: childList[key].firstName, value: childList[key].email });
        });
        this.setState({ familyMembers: childrenList });
      }).catch((error) => {
        console.log('ERROR in Payments');
      });
    });
  }

  selectorsContainer() {
    return (

      <View style={pageStyle.selectorsContainer}>
        <RNPickerSelect
          placeholder={{
            label: 'Select Child',
            value: null,
          }}
          items={this.state.familyMembers}
          onValueChange={(value) => {
            this.setState({
              childEmail: value,
            });
          }}
          style={{ ...pickerSelectStyles }}
          value={this.state.childEmail}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>

            <View style={pageStyle.upperContainer}>
              {this.selectorsContainer()}

              <View style={pageStyle.amountContainer}>
                <Text style={pageStyle.dollarSign}> $ </Text>
                <Text style={pageStyle.amountStyle}>
                  {' '}
                  {this.state.amount}
                  {' '}
                </Text>
              </View>
            </View>
            <KeyPad onPress={this.aButtonPress} />
            <View style={pageStyle.buttonBorder}>
              <Button
                large
                raised
                onPress={() => this.sendMoney()}
                title="Send"
                backgroundColor="#424242"
                accessibilityLabel="enter email"
                color="white"
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
  upperContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  selectorsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',

  },
  amountContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dollarSign: {
    color: 'white',
    marginRight: -30,
    fontFamily: fonts.secondary,
    fontSize: 30,
  },

  amountStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.secondary,
    fontSize: 90,

  },

  buttonBorder: {
    paddingHorizontal: 10,
    marginBottom: 30,
    width: '100%',
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: fonts.md,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    width: 300,
    fontFamily: fonts.secondary,
    textAlign: 'center',
  },
});


export default Payments;
