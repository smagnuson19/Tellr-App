import React, { Component } from 'react';
// import ImageBrowser from 'react-native-interactive-image-gallery';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  Image,
  Animated,
  Alert,
  // StyleSheet,

} from 'react-native';
import {
  Button, FormInput, Divider,
} from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale, scale } from 'react-native-size-matters';
import { StackActions, NavigationActions } from 'react-navigation';
import { postGoal } from '../actions';
import Style from '../styling/Style';
// import { colors, fonts } from '../styling/base';
import { colors, fonts } from '../styling/base';
import { themeColors } from '../styling/colorModes';

const Sound = require('react-native-sound');


let laser;


const options = {
  title: 'What Do You Want?',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class NewGoal extends Component {
  animatedValue = new Animated.Value(0);

  girlAnimation = new Animated.ValueXY({ x: -400, y: 200 })

  boyAnimation = new Animated.ValueXY({ x: -600, y: 200 })

  constructor(props) {
    super(props);
    this.state = {
      goalName: '',
      goalDescription: '',
      value: '',
      image: '',
      submitted: false,
    };
  }

  componentWillMount() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    // this.setState({ submitted: false });
    laser = new Sound(require('../media/laser.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
    });
  }

  girlOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        top: this.girlAnimation.y,
        right: this.girlAnimation.x,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../media/superGirl.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  boyOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        top: this.boyAnimation.y,
        right: this.boyAnimation.x,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../media/superBoy.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>New Goal! </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>New Goal! </Text>
      );
    }
  }


  choosePhoto() {
    console.log('Choosing Photo');
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source.uri,
        });
        console.log(`source is: ${source.uri}`);
      }
    });
  }

  submitGoal() {
    console.log('Trying to submit goal');
    // So that you are unable to navigate back to login page once logged in.
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

    const payLoad = {
      name: this.state.goalName,
      email: this.props.user.email,
      description: this.state.goalDescription,
      value: this.state.value,
      image: this.state.image,
      // familyName: this.state.familyName,
    };

    if (Number.isNaN(parseFloat(this.state.value)) || parseFloat(this.state.value) <= 0) {
      // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
      Alert.alert('Please Enter A Valid Number');
    } else if (this.state.submitted === false) {
      this.setState({ submitted: true });
      laser.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          laser.reset();
        }
      });

      console.log(parseFloat(this.state.value));
      Animated.sequence([
        Animated.parallel([
          Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false, duration: 10 }),
          Animated.timing(this.boyAnimation, { toValue: { x: -300, y: -400 }, duration: 250, useNativeDriver: false }),
          Animated.timing(this.girlAnimation, { toValue: { x: -600, y: -400 }, duration: 250, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.spring(this.girlAnimation, { toValue: { x: -600, y: -1200 }, duration: 450, useNativeDriver: false }),
          Animated.spring(this.boyAnimation, { toValue: { x: -300, y: -1200 }, duration: 450, useNativeDriver: false }),
        ]),
      ]).start(() => {
        console.log('Animated');
        this.props.postGoal(payLoad).then((response) => {
          console.log('trying to navigate');
          this.props.navigation.dispatch(resetAction);
        }).catch(() => { console.log('JNFKNJHLS'); });
      });
    } else {
      console.log('Submitted');
    }

    console.log(payLoad);


    // this.props.postGoal(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
  }


  render() {
    if (this.state.image === '') {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.headingDisplay()}
              <Image
                source={require('../media/kids.png')}
                style={{
                  width: 400, height: 350, alignSelf: 'center',
                }}
              />
              <Divider style={{ backgroundColor: colors.clear, height: 70 }} />
              <Button
                large
                raised
                color={themeColors.headerColor[this.props.mode]}
                title="Take A Photo!"
                style={Style.button2}
                fontFamily={fonts.secondary}
                buttonStyle={{
                  backgroundColor: themeColors.buttonColor[this.props.mode],
                  alignSelf: 'center',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                onPress={() => this.choosePhoto()}
              />
              <Divider style={{ backgroundColor: colors.clear, height: 70 }} />
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.headingDisplay()}
              {this.girlOverlay()}
              {this.boyOverlay()}
              <View style={Style.inputContainer}>
                <FormInput
                  containerStyle={Style.fieldContainerThird}
                  inputStyle={Style.fieldTextSecondary}
                  onChangeText={text => this.setState({ goalName: text })}
                  value={this.state.goalName}
                  placeholder="Goal"
                  placeholderTextColor={colors.placeholderColor}
                  returnKeyType="next"
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  blurOnSubmit={false}
                />
                <FormInput
                  containerStyle={Style.fieldContainerThird}
                  inputStyle={Style.fieldTextSecondary}
                  onChangeText={text => this.setState({ goalDescription: text })}
                  value={this.state.goalDescription}
                  placeholder="Goal Description..."
                  placeholderTextColor={colors.placeholderColor}
                  returnKeyType="next"
                  ref={(input) => { this.secondTextInput = input; }}
                  onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                  blurOnSubmit={false}
                />
                <FormInput
                  containerStyle={Style.fieldContainerThird}
                  inputStyle={Style.fieldTextSecondary}
                  onChangeText={text => this.setState({ value: text })}
                  value={this.state.value}
                  placeholder="Value: $0.00"
                  ref={(input) => { this.thirdTextInput = input; }}
                  keyboardType="decimal-pad"
                  blurOnSubmit={false}
                  placeholderTextColor={colors.placeholderColor}
                />
              </View>
              <View style={Style.button2}>
                <Button
                  title="Set Goal!"
                  raised
                  large
                  style={Style.button}
                  color={themeColors.headerColor[this.props.mode]}
                  buttonStyle={{
                    backgroundColor: themeColors.buttonColor[this.props.mode],
                    alignSelf: 'center',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 5,
                  }}
                  onPress={() => this.submitGoal()}
                />
                <Image
                  style={{
                    width: verticalScale(150), height: scale(200), alignSelf: 'center',
                  }}
                  source={{ uri: this.state.image }}
                />
              </View>
              <Divider style={{ backgroundColor: colors.clear, height: verticalScale(15) }} />
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: fonts.md,
//     margin: 40,
//     paddingTop: 7,
//     paddingHorizontal: 8,
//     paddingBottom: 7,
//     borderWidth: 0.8,
//     borderColor: 'rgb(176, 176, 176)',
//     width: 320,
//     marginLeft: 40,
//     marginTop: 15,
//     fontFamily: fonts.secondary,
//     alignSelf: 'flex-start',
//   },
// });


const mapStateToProps = state => (
  {
    user: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postGoal })(NewGoal);
