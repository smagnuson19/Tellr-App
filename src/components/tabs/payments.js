import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import { postUpdateBalance } from '../../actions';
import Style from '../../styling/ParentStyle';
import { colors2, fonts2, dimensions2 } from '../../styling/parent';
import KeyPad from './keypad';


const Sound = require('react-native-sound');

let chime;

class Payments extends Component {
  animatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      // accountSelected: '',
      amount: '0',
      childEmail: '',
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

  updateAmount(item, prevState, props) {
    let updatedAmount = prevState.amount;
    // If there is a zero there, perform computations as if
    // nothing is there
    if (updatedAmount === '0') {
      updatedAmount = '';
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
    return (
      <View>
        <Animated.Image
          source={require('../../media/bill.png')}
          style={imageStyles}
        />
      </View>
    );
  }


  sendMoney() {
    // Error checking to make sure child is selected and amount > 0
    if (this.state.childEmail === '' || this.state.childEmail == null) {
      Alert.alert('Please select a child for this payment');
      console.log('ERROR: select child empty');
    } else if (this.state.amount === '0') {
      Alert.alert('Payments cannot be zero. Please enter a valid payment');
      console.log('ERROR: payment amount empty');
    } else {
      // Confirmation alert
      // TODO: Add child's name
      Alert.alert(
        `Transfer $${this.state.amount} to Child Account`,
        'Are you sure you want to complete this action?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => this.postBalance(),
          },
        ],
        { cancelable: false },
      );
    }
  }

  postBalance() {
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
      senderEmail: this.props.user.email,
    };

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

    Animated.sequence([
      Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false }),
      Animated.spring(this.animatedValue, { toValue: 0, userNativeDriver: false }),
    ]).start(() => {
      this.props.postUpdateBalance(payLoad)
        .then((response) => {
          console.log('this');

          this.props.navigation.dispatch(resetAction);
        });
    });
  }

  aButtonPress(item) {
    console.log(item);
    this.setState((prevState, props) => {
      return (this.updateAmount(item, prevState, props));
    });
  }


  selectorsContainer() {
    // gotta put family into an array and label the dict values and stuff
    let itemList = [];
    if (this.props.family != null) {
      console.log(this.props.family);
      itemList = [];
      Object.keys(this.props.family).forEach((key) => {
        itemList.push({ label: this.props.family[key].firstName, value: this.props.family[key].email });
      });
    }

    return (

      <View style={pageStyle.selectorsContainer}>
        <RNPickerSelect
          placeholder={{
            label: 'Select Child',
            value: null,
          }}
          items={itemList}
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
        <LinearGradient colors={[colors2.linearGradientTop, colors2.linearGradientBottom]} style={Style.gradient}>
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
                onPress={() => this.sendMoney()}
                title="Transfer Funds!"
                backgroundColor={colors2.logoGreen}
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
    padding: '3%',
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
    fontFamily: fonts2.secondary,
    fontSize: 30,
  },

  amountStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts2.secondary,
    fontSize: 90,

  },

  buttonBorder: {
    paddingHorizontal: '5%',
    paddingBottom: '15%',
    width: '100%',
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: fonts2.md,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: colors2.secondary,
    width: dimensions2.fullWidth - 30,
    fontFamily: fonts2.secondary,
    textAlign: 'center',
  },
});


const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
  });


export default connect(mapStateToProps, {
  postUpdateBalance,
})(Payments);
