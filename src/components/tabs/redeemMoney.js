import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import KeyPad from './keypad';
import { fonts, colors } from '../../styling/base';
import { postRedeemMoney } from '../../actions';

class RedeemMoney extends Component {
  animatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
    // accountSelected: '',
      amount: '0',

    };
    this.aButtonPress = this.aButtonPress.bind(this);
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

  renderOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        left: Math.random() * 500 - 250,
        right: Math.random() * 500 - 250,
        top: Math.random() * 1000 - 500,
        bottom: Math.random() * 1000 - 500,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.7],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../../media/bill.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  redeemPress() {
    // move to home page after you send a payment
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'ChildTabBar' }),
      ],
    });

    // Describing what should be sent
    const payLoad = {
      email: this.props.user.email,
      amount: this.state.amount,
    };

    // Error checking to make sure child is selected and amount > 0
    if (this.props.user.email === '' || this.props.user.email == null) {
      console.log('ERROR: select child empty');
    } else if (this.state.amount === '0') {
      Alert.alert('Redemption cannot be zero. Please enter a valid payment');
      console.log('ERROR: payment amount empty');
    } else if (this.state.amount > this.props.user.balance) {
      Alert.alert('You do not have enough money to request this Much');
      console.log(this.state.amount);
      console.log(this.props.user.balance);
      console.log('ERROR: not enough money in redeem money');
    } else {
      //  ok to RedeemMoney
      Animated.sequence([
        Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false }),
        Animated.spring(this.animatedValue, { toValue: 0, userNativeDriver: false }),
      ]).start(() => {
        this.props.postRedeemMoney(payLoad).then((response) => {
          this.props.navigation.dispatch(resetAction);
        });
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
              <View style={pageStyle.buttonContainer}>
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
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
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

const mapStateToProps = state => (
  {
    user: state.user.info,
  });

export default connect(mapStateToProps, { postRedeemMoney })(RedeemMoney);
