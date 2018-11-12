import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
} from 'react-native-elements';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY_TASKS = 'childtasks';

class Chores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      taskName: '',
      taskDeadline: '',
      taskDescription: '',
      reward: '',
      senderEmail: '',
      childEmail: '',
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    AsyncStorage.getItem('emailID', (err, result) => {
      const API_KEY_USERS = result;
      console.log(API_KEY_USERS, 'result here');
      // this.setState({ childEmail: API_KEY_USERS });
      return axios.get(`${ROOT_URL}/${API_KEY_TASKS}/${API_KEY_USERS}`).then((response) => {
        const taskInfo = response.data;
        console.log(taskInfo, 'task info here');
        // loop through each task and set the states
        const taskListTemp = [];
        Object.keys(taskInfo).forEach((key) => {
          taskListTemp.push({ label: taskInfo[key].taskName, value: taskInfo[key] });
        });
        this.setState({ taskList: taskListTemp });
      }).catch((error) => {
        console.log('ERROR in Chores');
      });
    });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerText}>
              <Text style={Style.headerText}>Chores </Text>
            </View>
            <View style={Style.listContainer}>
              <Text style={choreStyle.taskNameStyle}> Take out Trash </Text>
              <Text style={choreStyle.deadlineStyle}>
                {' '}
                {'Due 11/26 at 4pm'}
                {' '}
              </Text>
              <Text style={Style.displayText}> Please take out the trash from the Kitchen </Text>
              <Text style={choreStyle.rewardStyle}> Reward money </Text>
              <Button
                title="Done!"
                rounded
                // onPress={() => this.submitChore()}
                style={choreStyle.doneButtonStyle}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const choreStyle = StyleSheet.create({
  taskNameStyle: {
    fontSize: fonts.md,
    color: 'white',
    marginLeft: -20,
    fontFamily: fonts.secondary,
    // fontWeight: 'bold',
    textAlign: 'left',
  },
  deadlineStyle: {
    fontSize: fonts.smmd,
    color: 'white',
    marginRight: -20,
    fontFamily: fonts.secondary,
    // fontWeight: 'bold',
    textAlign: 'right',
  },
  rewardStyle: {
    fontSize: fonts.smmd,
    color: 'white',
    marginRight: -20,
    fontFamily: fonts.secondary,
    // fontWeight: 'bold',
    textAlign: 'right',
  },
  doneButtonStyle: {
    width: '30%',
    marginLeft: -20,
  },

});

export default Chores;
