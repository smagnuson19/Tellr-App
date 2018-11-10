import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import {
  Button, FormInput,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';

const API_KEY_TASKS = '';
const API_KEY_CHILD = 'children';

class AddTask extends Component {
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

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    AsyncStorage.getItem('emailID', (err, result) => {
      const API_KEY_USERS = result;
      return axios.get(`${ROOT_URL}/${API_KEY_CHILD}/${API_KEY_USERS}`).then((response) => {
        const childList = response.data;
        console.log(childList);
        const childrenList = [];
        Object.keys(childList).forEach((key) => {
          childrenList.push(childList[key].firstName);
          this.setState({ children: childrenList });
          console.log(key, childList[key]);
        });
      // this.setState({ children: childList });
      }).catch((error) => {
        console.log('ERROR in AddTask');
      });
    });
  }

  submitTask() {
    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    const payLoad = {
      taskName: this.state.taskName,
      taskDeadline: this.state.taskDeadline,
      childEmail: this.state.childEmail,
      taskDescription: this.state.taskDescription,
      reward: this.state.reward,
      // familyName: this.state.familyName,
    };

    axios.post(`${ROOT_URL}/${API_KEY_TASKS}`, { payLoad })
      .then((response) => {
        console.log(response.data);
        this.props.navigation.dispatch(resetAction);
      });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerText}>
              <Text style={Style.headerText}>New Task </Text>
            </View>
            <View style={Style.inputContainer}>
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ taskName: text })}
                value={this.state.taskName}
                placeholder="Task Name"
                placeholderTextColor={colors.placeholderColor}
              />
              <DatePicker
                style={{ ...taskDeadlineStyles.style }}
                date={this.state.taskDeadline}
                mode="datetime"
                placeholder="Task Deadline"
                format="MMMM Do YYYY, h:mma"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: 'white',
                    fontFamily: fonts.secondary,
                    alignSelf: 'flex-start',
                    marginLeft: 8,
                    fontSize: fonts.md,
                  },
                  placeholderText: {
                    fontFamily: fonts.secondary,
                    color: colors.placeholderColor,
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
              />
              <RNPickerSelect
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
                value={this.state.childEmail}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ taskDescription: text })}
                value={this.state.taskDescription}
                placeholder="Task Description..."
                placeholderTextColor={colors.placeholderColor}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ reward: text })}
                value={this.state.reward}
                placeholder="Reward: $0.00"
                placeholderTextColor={colors.placeholderColor}
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                title="Publish!"
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
    borderColor: 'rgb(176, 176, 176)',
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
    borderColor: 'rgb(176, 176, 176)',
  },
});

export default AddTask;
