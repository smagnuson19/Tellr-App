import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

// const API_KEY = '';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskDeadline: '',
      child: '',
      taskDescription: '',
      reward: '',
      items: [
        {
          label: 'Child 1',
          value: 'child 1',
        },
        {
          label: 'Child 2',
          value: 'child 2',
        },
        {
          label: 'Child 3',
          value: 'child 3',
        },
      ],
    };
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
      child: this.state.child,
      taskDescription: this.state.taskDescription,
      reward: this.state.reward,
    };

    axios.post(`${ROOT_URL}`, { payLoad })
      .then((response) => {
        console.log(response.data);
        this.props.navigation.dispatch(resetAction);
      });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
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
                  dateInput: {
                    marginLeft: 36,
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
                items={this.state.items}
                onValueChange={(value) => {
                  this.setState({
                    child: value,
                  });
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.child}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ taskDescription: text })}
                value={this.state.taskDescription}
                placeholder="Task Description..."
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ reward: text })}
                value={this.state.reward}
                placeholder="Reward: $0.00"
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
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: 300,
    marginLeft: 40,
    fontFamily: fonts.secondary,
    alignSelf: 'flex-start',
  },
});

const taskDeadlineStyles = StyleSheet.create({
  style: {
    width: 340,
    alignSelf: 'flex-start',
    paddingBottom: 30,
    marginLeft: 4,
    fontFamily: fonts.secondary,
  },
});

export default AddTask;
