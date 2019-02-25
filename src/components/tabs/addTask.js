import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
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
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';
import { postTask } from '../../actions/index';


class AddTask extends Component {
  animatedValue = new Animated.Value(0);

  mopAnimation = new Animated.ValueXY({ x: -400, y: 200 })

  broomAnimation = new Animated.ValueXY({ x: -600, y: 200 })

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
  }

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
              outputRange: [0.1, 0.3],
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
              outputRange: [0.1, 0.3],
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
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'ParentTabBar' }),
      ],
    });

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
      Animated.sequence([
        Animated.parallel([
          Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false, duration: 10 }),
          Animated.timing(this.broomAnimation, { toValue: { x: -300, y: -400 }, duration: 250, useNativeDriver: false }),
          Animated.timing(this.mopAnimation, { toValue: { x: -600, y: -400 }, duration: 250, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.spring(this.mopAnimation, { toValue: { x: -600, y: -1200 }, duration: 450, useNativeDriver: false }),
          Animated.spring(this.broomAnimation, { toValue: { x: -300, y: -1200 }, duration: 450, useNativeDriver: false }),
        ]),
      ]).start(() => {
        console.log(payLoad);
        this.props.postTask(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
      });
    }
  }

  render() {
    const moment = require('moment');
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>New Task </Text>
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ taskName: text })}
                value={this.state.taskName}
                placeholder="Task Name"
                placeholderTextColor={colors.placeholderColor}
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
                    color: colors.white,
                    fontFamily: fonts.secondary,
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                    fontSize: fonts.md,
                  },
                  placeholderText: {
                    fontFamily: fonts.secondary,
                    color: colors.lightGrey,
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                    fontSize: fonts.md,
                  },
                  btnTextConfirm: {
                    fontFamily: fonts.secondary,
                    color: colors.secondary,
                  },
                  btnTextCancel: {
                    fontFamily: fonts.secondary,
                    color: colors.secondary,
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
                style={{ ...pickerSelectStyles }}
                placeholderTextColor={colors.lightGrey}
                value={this.state.childEmail}
              />
              <FormInput
                ref={(input) => { this.fourthTextInput = input; }}
                onSubmitEditing={() => { this.fithTextInput.focus(); }}
                blurOnSubmit={false}
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ taskDescription: text })}
                value={this.state.taskDescription}
                placeholder="Task Description..."
                placeholderTextColor={colors.placeholderColor}
                returnKeyType="next"
              />
              <FormInput
                ref={(input) => { this.fithTextInput = input; }}
                returnKeyType="done"
                onSubmitEditing={() => this.submitTask()}
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ reward: text })}
                value={this.state.reward}
                placeholder="Reward: $0.00"
                placeholderTextColor={colors.placeholderColor}
              />
            </View>
            {this.mopOverlay()}
            {this.broomOverlay()}
            <View style={Style.buttonContainer}>
              <Button
                title="Make them do it!"
                rounded
                large
                style={Style.button}
                backgroundColor={colors.secondary}
                onPress={() => this.submitTask()}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: fonts.md,
    margin: 40,
    paddingTop: 7,
    paddingHorizontal: 8,
    paddingBottom: 7,
    borderWidth: 0.8,
    borderColor: colors.lightGrey,
    color: 'white',
    width: 320,
    marginLeft: 40,
    marginTop: 15,
    fontFamily: fonts.secondary,
    alignSelf: 'flex-start',
  },
});

const taskDeadlineStyles = StyleSheet.create({
  style: {
    width: 345,
    margin: 40,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    marginLeft: 40,
    fontFamily: fonts.secondary,
    borderColor: colors.lightGrey,
  },
});


const mapStateToProps = state => (
  {
    family: state.user.family,
    account: state.user.info,
  });

export default connect(mapStateToProps, { postTask })(AddTask);
