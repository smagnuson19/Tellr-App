import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage, Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import KeyPad from './keypad';
import { fonts, colors } from '../../styling/base';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';

class RedeemMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
    // accountSelected: '',
      amount: '0',
      childEmail: '',
      Balance: '0',
    };
    this.aButtonPress = this.aButtonPress.bind(this);
  }

  componentDidMount() {
    console.log('Fetching info');
    AsyncStorage.multiGet(['emailID', 'balanceID'], (err, result) => {
      const API_KEY_USERS = result[0][1].slice(1, -1);
      const BALANCE = result[1][1];
      console.log(BALANCE);
      console.log(API_KEY_USERS);
      this.setState({ childEmail: API_KEY_USERS });
      this.setState({ Balance: BALANCE });
    }).catch((error) => {
      console.log('ERROR in NewGoal');
    });
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

  redeemPress() {
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
      amount: this.state.amount,
    };

    // Error checking to make sure child is selected and amount > 0
    if (this.state.childEmail === '' || this.state.childEmail == null) {
      console.log('ERROR: select child empty');
    } else if (this.state.amount === '0') {
      Alert.alert('Redemption cannot be zero. Please enter a valid payment');
      console.log('ERROR: payment amount empty');
    } else if (this.state.amount > this.state.Balance) {
      Alert.alert('You do not have enough money to request this Much');
      console.log(this.state.amount);
      console.log(this.state.Balance);
      console.log('ERROR: not enough money in redeem money');
    } else {
      //  ok to RedeemMoney
      AsyncStorage.setItem('balanceID', JSON.stringify(parseFloat(this.state.Balance) - parseFloat(this.state.amount)), () => {
      });
      axios.post(`${ROOT_URL}/redeemmoney`, { payLoad })
        .then((response) => {
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


  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>

            <View style={pageStyle.upperContainer}>
              <View style={pageStyle.amountContainer}>
                <Text style={Style.headerText}>Redeem Money! </Text>
              </View>
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
                onPress={() => this.redeemPress()}
                title="Request Money!"
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
    padding: 10,
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


export default RedeemMoney;
