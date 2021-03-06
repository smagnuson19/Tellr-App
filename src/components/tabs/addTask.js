import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  // Easing,
  Animated,
} from 'react-native';
import {
  Button, FormInput,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/ParentStyle';
import { colors2, fonts2 } from '../../styling/parent';
import { postTask } from '../../actions/index';
import { themeColors } from '../../styling/colorModes';

const Sound = require('react-native-sound');

let chime;

class AddTask extends Component {
  animatedValue = new Animated.Value(0);

  mopAnimation = new Animated.ValueXY({ x: -350, y: 200 });

  broomAnimation = new Animated.ValueXY({ x: 0, y: 200 });

  // rotateAnimation = new Animated.Value(0);


  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskDeadline: '',
      childEmail: '',
      taskDescription: '',
      reward: '',
      // familyName: '',
      children: [],
    };
  }

  componentWillMount() {
    this.fetchNames();
    Sound.setCategory('Playback');
    chime = new Sound(require('../../media/subT.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
    });
  }

  // componentDidMount() {
  //   this.startAnimation();
  // }

  mopOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        top: this.mopAnimation.y,
        right: this.mopAnimation.x,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.15, 0.4],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../../media/mop.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  broomOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        top: this.broomAnimation.y,
        right: this.broomAnimation.x,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../../media/broom.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  // startAnimation() {
  //   this.rotateAnimation.setValue(0);
  //   Animated.timing(
  //     this.rotateAnimation,
  //     {
  //       toValue: 1,
  //       duration: 8000,
  //       easing: Easing.linear,
  //     },
  //   ).start(() => {
  //     this.startAnimation();
  //   });
  // }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>New Task </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>New Task </Text>
      );
    }
  }

  fetchNames() {
    const childrenList = [];
    let familyList = {};
    if (this.props.family !== null) {
      familyList = this.props.family;
    }
    // loop through each kid and make an object for them with FirstName, Email
    Object.keys(familyList).forEach((key) => {
      childrenList.push({ label: familyList[key].firstName, value: familyList[key].email });
    });
    this.setState({ children: childrenList });
  }

  submitTask() {
    // move to home page after you submit a task
    let resetAction;
    if (this.props.mode === 0) {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ParentTabBarLight' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ParentTabBarDark' }),
        ],
      });
    }

    const payLoad = {
      taskName: this.state.taskName,
      reward: this.state.reward,
      taskDeadline: this.state.taskDeadline,
      taskDescription: this.state.taskDescription,
      childEmail: this.state.childEmail,
      senderEmail: this.props.account.email,
    };

    // Error checking: make sure all of the fields are filled in
    if (this.state.taskName === '') {
      Alert.alert('Please enter a Task Name');
      console.log('ERROR: task name empty');
    } else if (this.state.taskDeadline === '') {
      Alert.alert('Please enter a Task Deadline');
      console.log('ERROR: task deadline empty');
    } else if (this.state.childEmail === '' || this.state.childEmail == null) {
      Alert.alert('Please select a child for this task');
      console.log('ERROR: select child empty');
    } else if (this.state.taskDescription === '') {
      Alert.alert('Please enter a Task Description');
      console.log('ERROR: task description empty');
    } else if (this.state.reward === '') {
      Alert.alert('Please enter a Reward');
      console.log('ERROR: reward empty');
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

      Animated.sequence([
        Animated.parallel([
          Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false, duration: 10 }),
          Animated.timing(this.mopAnimation, { toValue: { x: -350, y: -400 }, duration: 250, useNativeDriver: false }),
          Animated.timing(this.broomAnimation, { toValue: { x: 0, y: -200 }, duration: 250, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.spring(this.mopAnimation, { toValue: { x: 0, y: -800 }, duration: 1450, useNativeDriver: false }),
          Animated.spring(this.broomAnimation, { toValue: { x: -400, y: -800 }, duration: 1450, useNativeDriver: false }),
        ]),
      ]).start(() => {
        console.log(payLoad);
        this.props.postTask(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
      });
    }
  }

  render() {
    const moment = require('moment');
    // <Animated.Image
    //   style={[
    //     taskDeadlineStyles.image,
    //     {
    //       transform: [
    //         {
    //           rotate: this.rotateAnimation.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [
    //               '0deg', '360deg',
    //             ],
    //           }),
    //         },
    //       ],
    //     },
    //   ]}
    //   source={require('../../media/broom.png')}
    // />
    // <Animated.Image
    //   style={[
    //     taskDeadlineStyles.image2,
    //     {
    //       transform: [
    //         {
    //           rotate: this.rotateAnimation.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [
    //               '360deg', '0deg',
    //             ],
    //           }),
    //         },
    //       ],
    //     },
    //   ]}
    //   source={require('../../media/mop.png')}
    // />
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            {this.headingDisplay()}
            <View style={Style.inputContainer}>
              <FormInput
                // inputContainerStyle={Style.fieldContainerSecondary}
                containerStyle={{
                  backgroundColor: 'rgba(150, 150, 150, 0.2)',
                  borderBottomColor: 'transparent',
                  marginTop: 10,
                  marginBottom: 40,
                }}
                inputStyle={{
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts2.secondary,
                  textAlign: 'left',
                  fontSize: fonts2.md,
                  marginLeft: 25,
                  borderBottomColor: '#0000',
                  borderColor: '#0000',
                }}
                onChangeText={text => this.setState({ taskName: text })}
                value={this.state.taskName}
                placeholder="Task Name"
                placeholderTextColor="white"
                returnKeyType="next"
              />
              <DatePicker
                style={{ ...taskDeadlineStyles.style }}
                date={this.state.taskDeadline}
                mode="datetime"
                placeholder="Task Deadline"
                minDate={moment().format('MMM Do, h:mma')}
                format="MMM Do, h:mma"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: themeColors.headerColor[this.props.mode],
                    fontFamily: fonts2.secondary,
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                    fontSize: fonts2.md,
                  },
                  placeholderText: {
                    fontFamily: fonts2.secondary,
                    color: 'white',
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                    fontSize: fonts2.md,
                  },
                  btnTextConfirm: {
                    fontFamily: fonts2.secondary,
                    color: colors2.secondary,
                  },
                  btnTextCancel: {
                    fontFamily: fonts2.secondary,
                    color: colors2.secondary,
                  },
                  dateInput: {
                    textAlign: 'left',
                  },
                }}
                iconComponent=<Ionicons name="ios-calendar" size={30} color="white" />
                onDateChange={date => this.setState({ taskDeadline: date })}
                minuteInterval={30}
              />
              <RNPickerSelect
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                blurOnSubmit={false}
                placeholder={{
                  label: 'Select Child',
                  value: null,
                }}
                items={this.state.children}
                onValueChange={(value) => {
                  this.setState({
                    childEmail: value,
                  });
                }}
                style={{
                  inputIOS: {
                    fontSize: fonts2.md,
                    margin: 40,
                    paddingTop: 7,
                    paddingHorizontal: 8,
                    paddingBottom: 7,
                    borderWidth: 0.8,
                    borderColor: colors2.lightGrey,
                    color: themeColors.headerColor[this.props.mode],
                    width: 320,
                    marginLeft: 40,
                    marginTop: 15,
                    fontFamily: fonts2.secondary,
                    alignSelf: 'flex-start',
                  },
                }}
                placeholderTextColor="white"
                value={this.state.childEmail}
              />
              <FormInput
                ref={(input) => { this.fourthTextInput = input; }}
                onSubmitEditing={() => { this.fithTextInput.focus(); }}
                blurOnSubmit={false}
                containerStyle={{
                  backgroundColor: 'rgba(150, 150, 150, 0.2)',
                  borderBottomColor: 'transparent',
                  marginTop: 40,
                  marginBottom: 40,
                }}
                inputStyle={{
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts2.secondary,
                  textAlign: 'left',
                  fontSize: fonts2.md,
                  marginLeft: 25,
                }}
                onChangeText={text => this.setState({ taskDescription: text })}
                value={this.state.taskDescription}
                placeholder="Task Description..."
                placeholderTextColor="white"
                returnKeyType="next"
              />
              <FormInput
                ref={(input) => { this.fithTextInput = input; }}
                returnKeyType="done"
                onSubmitEditing={() => this.submitTask()}
                containerStyle={{
                  backgroundColor: 'rgba(150, 150, 150, 0.2)',
                  borderBottomColor: 'transparent',
                  marginTop: 40,
                  marginBottom: 40,
                }}
                inputStyle={{
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts2.secondary,
                  textAlign: 'left',
                  fontSize: fonts2.md,
                  marginLeft: 25,
                }}
                onChangeText={text => this.setState({ reward: text })}
                value={this.state.reward}
                keyboardType="decimal-pad"
                placeholder="Reward: $0.00"
                placeholderTextColor="white"
              />
            </View>
            {this.mopOverlay()}
            {this.broomOverlay()}
            <View style={Style.buttonContainer}>
              <Button
                title="Make them do it!"
                raised
                large
                style={Style.button}
                color={themeColors.buttonTextColor}
                buttonStyle={
                    {
                      shadowColor: 'rgba(0, 0, 0, 0.2)',
                      shadowOpacity: 0.8,
                      elevation: 6,
                      shadowRadius: 15,
                      shadowOffset: { width: 1, height: 13 },
                      backgroundColor: themeColors.buttonColor[this.props.mode],
                      borderColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 5,
                    }}
                onPress={() => this.submitTask()}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const taskDeadlineStyles = StyleSheet.create({
  style: {
    width: 345,
    margin: 40,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    marginLeft: 40,
    fontFamily: fonts2.secondary,
    borderColor: colors2.lightGrey,
  },
  // image: {
  //   width: 100,
  //   height: 100,
  //   position: 'absolute',
  //   bottom: 250,
  //   borderRadius: 1,
  //   right: 40,
  //   backgroundColor: 'transparent',
  // },
  // image2: {
  //   width: 100,
  //   height: 100,
  //   position: 'absolute',
  //   bottom: 250,
  //   left: 40,
  //   borderRadius: 1,
  //   backgroundColor: 'transparent',
  // },
});


const mapStateToProps = state => (
  {
    family: state.user.family,
    account: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postTask })(AddTask);
