import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import KeyPad from './keypad';
import { fonts, colors } from '../../styling/base';
import { postRedeemMoney } from '../../actions';
import { themeColors } from '../../styling/colorModes';
// Import the react-native-sound module
const Sound = require('react-native-sound');

let chime;

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

  componentWillMount() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    chime = new Sound(require('../../media/cha-ching.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
    });
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Redeem Money! </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Redeem Money! </Text>
      );
    }
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
    } else if (updatedAmount.length >= 5) {
      return { amount: updatedAmount };
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
    if (Math.round(Math.random()) === 0) {
      return (
        <View>
          <Animated.Image
            source={require('../../media/bill.png')}
            style={imageStyles}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Animated.Image
            source={require('../../media/coin.png')}
            style={imageStyles}
          />
        </View>
      );
    }
  }

  redeemPress() {
    // move to home page after you send a payment
    let resetAction;
    if (this.props.mode === 0) {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarLight' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarDark' }),
        ],
      });
    }

    // Describing what should be sent
    const payLoad = {
      email: this.props.user.email,
      amount: parseFloat(this.state.amount),
      // amount: this.state.amount,
    };

    // Error checking to make sure child is selected and amount > 0
    if (this.props.user.email === '' || this.props.user.email == null) {
      console.log('ERROR: select child empty');
    } else if (this.state.amount === '0') {
      Alert.alert('Redemption cannot be zero. Please enter a valid payment');
      console.log('ERROR: payment amount empty');
    } else if (this.state.amount > this.props.user.balance) {
      Alert.alert('You do not have enough money to request this much');
      console.log(this.state.amount);
      console.log(this.props.user.balance);
      console.log('ERROR: not enough money in redeem money');
    } else {
      chime.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          chime.reset();
        }
      });
      //  ok to RedeemMoney
      console.log(payLoad);
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
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={pageStyle.upperContainer}>
              <View style={pageStyle.buttonContainer}>
                {this.headingDisplay()}
              </View>
              <View style={pageStyle.amountContainer}>
                <Text style={{
                  color: themeColors.headerColor[this.props.mode],
                  marginRight: -30,
                  fontFamily: fonts.secondary,
                  fontSize: 30,
                }}
                >
                  {' '}
$
                </Text>
                <Text style={{
                  color: themeColors.headerColor[this.props.mode],
                  textAlign: 'center',
                  fontFamily: fonts.secondary,
                  fontSize: 90,
                }}
                >
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
                onPress={() => this.redeemPress()}
                large
                raised
                title="Request Money!"
                accessibilityLabel="enter email"
                color={themeColors.buttonTextColor}
                fontFamily={fonts.secondary}
                style={Style.button}
                buttonStyle={{
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowOpacity: 0.8,
                  elevation: 6,
                  shadowRadius: 15,
                  shadowOffset: { width: 1, height: 13 },
                  backgroundColor: themeColors.buttonColor[this.props.mode],
                  alignSelf: 'center',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 5,
                }}
              />
            </View>
            <Divider style={{ backgroundColor: colors.clear, height: 25 }} />
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
    paddingTop: 22,
  },
  selectorsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',

  },
  amountContainer: {
    flex: 1,
    marginBottom: -40,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // dollarSign: {
  //   color: 'black',
  //   marginRight: -30,
  //   fontFamily: fonts.secondary,
  //   fontSize: 30,
  // },

  // amountStyle: {
  //   color: 'black',
  //   textAlign: 'center',
  //   fontFamily: fonts.secondary,
  //   fontSize: 90,
  //
  // },

  buttonBorder: {
    paddingHorizontal: 10,
    marginBottom: -30,
    width: '100%',
  },

});

const mapStateToProps = state => (
  {
    user: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postRedeemMoney })(RedeemMoney);
