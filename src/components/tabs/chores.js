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
const API_KEY_COMPLETED = 'tasks/completed';

class Chores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      // taskName: '',
      // taskDeadline: '',
      // taskDescription: '',
      // reward: '',
      // senderEmail: '',
      childEmail: '',
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    AsyncStorage.getItem('emailID', (err, result) => {
      const API_KEY_USERS = result;
      this.setState({ childEmail: API_KEY_USERS });
      return axios.get(`${ROOT_URL}/${API_KEY_TASKS}/${API_KEY_USERS}`).then((response) => {
        const taskInfo = response.data;
        // loop through each task and set the states
        const taskListTemp = [];
        Object.keys(taskInfo).forEach((key) => {
          taskListTemp.push({ label: taskInfo[key].taskName, value: taskInfo[key] });
        });
        this.setState({ taskList: taskListTemp });
        console.log(this.state.taskList, 'taskList');
      }).catch((error) => {
        console.log('ERROR in Chores');
      });
    });
  }

  submitChore(taskNameSubmitted) {
    // So that you are unable to navigate back to login page once logged in.
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   key: null,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'ParentTabBar' }),
    //   ],
    // });

    const payLoad = {
      taskName: taskNameSubmitted,
      childEmail: this.state.childEmail,
    };

    axios.post(`${ROOT_URL}/${API_KEY_COMPLETED}`, { payLoad })
      .then((response) => {
        console.log(response.data);
        // this.props.navigation.dispatch(resetAction);
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
              <Text style={choreStyle.taskNameStyle}>
                {' '}
                {'this.state.taskList[0].value.taskName'}
                {' '}
              </Text>
              <Text style={choreStyle.deadlineStyle}>
                {'Due: '}
                {'this.state.taskList[0].value.taskDeadline'}
                {' '}
              </Text>
              <Text style={Style.displayText}>
                {' '}
                {'this.state.taskList[0].value.taskDescription'}
                {' '}
              </Text>
              <Text style={choreStyle.rewardStyle}>
                {'Reward: '}
                {'this.state.taskList[0].value.reward'}
                {' '}
              </Text>
              <Button
                title="Done!"
                rounded
                // onPress={() => this.submitChore(this.state.taskList[0].value.taskName)}
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
    marginLeft: -22,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },
  deadlineStyle: {
    fontSize: fonts.smmd,
    color: 'white',
    marginLeft: -20,
    fontFamily: fonts.secondary,
    textAlign: 'left',
  },
  rewardStyle: {
    fontSize: fonts.smmd,
    color: 'white',
    marginRight: -20,
    fontFamily: fonts.secondary,
    textAlign: 'right',
  },
  doneButtonStyle: {
    width: '30%',
    marginLeft: -20,
  },

});

export default Chores;
