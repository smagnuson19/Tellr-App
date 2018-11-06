import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import {
  Button, FormInput,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';

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
    };
  }

  submitTask() {
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
      });

    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>New Task </Text>
          </View>
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ taskName: text })}
            value={this.state.taskName}
            placeholder="Task Name"
            style={Style.fieldInput}
          />
          <DatePicker
            style={{ width: 270 }}
            date={this.state.taskDeadline}
            mode="datetime"
            placeholder="Task Deadline"
            format="MMMM Do YYYY, h:mma"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              // dateInput: {
              //   marginLeft: 36,
              // },
            }}
            iconComponent=<Ionicons name="ios-calendar" size={30} color="white" />
            onDateChange={date => this.setState({ taskDeadline: date })}
            // value={this.state.taskDeadline}
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ child: text })}
            value={this.state.child}
            placeholder="Select Child"
          />
          <FormInput
            containerStyle={{ width: '90%' }}
            onChangeText={text => this.setState({ taskDescription: text })}
            value={this.state.taskDescription}
            placeholder="Task Description..."
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ reward: text })}
            value={this.state.reward}
            placeholder="Reward: $0.00"
          />
          <Button
            title="Publish!"
            rounded
            large
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: '50%',
            }}
            onPress={() => this.submitTask()}
          />
        </LinearGradient>
      </View>
    );
  }
}


export default AddTask;
