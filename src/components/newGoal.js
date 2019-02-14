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
import { StackActions, NavigationActions } from 'react-navigation';
import { postGoal } from '../actions';
import Style from '../styling/Style';
// import { colors, fonts } from '../styling/base';
import { colors } from '../styling/base';

const Sound = require('react-native-sound');

let laser;
let submitted = false;


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

  constructor(props) {
    super(props);
    this.state = {
      goalName: '',
      goalDescription: '',
      value: '',
      image: '',
    };
  }

  componentWillMount() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    laser = new Sound(require('../media/laser.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
    });
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
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'ChildTabBar' }),
      ],
    });

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
    } else if (submitted === false) {
      submitted = true;
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
        Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false }),
        Animated.spring(this.animatedValue, { toValue: 0, userNativeDriver: false }),
      ]).start(() => {
        this.props.postGoal(payLoad).then((response) => {
          this.props.navigation.dispatch(resetAction);
        });
      });
    }

    console.log(payLoad);


    // this.props.postGoal(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
  }

  renderOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // left: Math.random() * 500 - 250,
        // right: Math.random() * 500 - 250,
        // top: Math.random() * 1000 - 500,
        // bottom: Math.random() * 1000 - 500,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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
          source={this.state.image}
          style={imageStyles}
        />
      </View>
    );
  }

  // loadButton() {
  //   // display children for parents, balance for kids
  //   if (submitted === false) {
  //     return (
  //       <Button
  //         title="Set Goal!"
  //         rounded
  //         large
  //         style={Style.button}
  //         backgroundColor={colors.secondary}
  //         onPress={() => this.submitGoal()}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.altHeaderText}>New Goal </Text>
            <Button
              title="Take A Photo!"
              rounded
              large
              style={Style.button2}
              backgroundColor={colors.secondary}
              onPress={() => this.choosePhoto()}
            />
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainerThird}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ goalName: text })}
                value={this.state.goalName}
                placeholder="Goal"
                placeholderTextColor={colors.placeholderColor}
              />
              <FormInput
                containerStyle={Style.fieldContainerThird}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ goalDescription: text })}
                value={this.state.goalDescription}
                placeholder="Goal Description..."
                placeholderTextColor={colors.placeholderColor}
              />
              <FormInput
                containerStyle={Style.fieldContainerThird}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                placeholder="Value: $0.00"
                placeholderTextColor={colors.placeholderColor}
              />
            </View>
            <View style={Style.button}>
              <Button
                title="Set Goal!"
                rounded
                large
                style={Style.button}
                backgroundColor={colors.secondary}
                onPress={() => this.submitGoal()}
              />
              <Image
                style={{
                  width: 150 * 1.2, height: 200 * 1.2, alignSelf: 'center',
                }}
                source={{ uri: this.state.image }}
              />
            </View>
            <Divider style={{ backgroundColor: colors.clear, height: 100 }} />
          </View>
        </LinearGradient>
      </View>
    );
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
  });

export default connect(mapStateToProps, { postGoal })(NewGoal);
