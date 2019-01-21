import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors, dimensions } from '../../styling/base';
import NotificationCard from './NotificationCard';

import Style from '../../styling/Style';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';

class ParentViewOfChild extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const emailItem = navigation.getParam('email');
    this.state = {
      email: emailItem,
      bioInfo: {},
      goals: [],
      tasks: [],
    };
    console.log(emailItem);
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentDidMount() {
    this.fetchAccountInfo();
    this.fetchGoalsInfo();
    this.fetchTaskInfo();
  }

  fetchAccountInfo() {
    return axios.get(`${ROOT_URL}/users/${this.state.email}`).then((response) => {
      // make a list of the parent's children
      const payload = response.data;
      console.log(payload);
      this.setState({ bioInfo: payload });
    });
  }

  fetchGoalsInfo() {
    return axios.get(`${ROOT_URL}/goals/${this.state.email}`).then((response) => {
      // make a list of the parent's children
      const payload = response.data;
      const list = [];
      Object.keys(payload).forEach((key) => {
        list.push(payload[key]);
      });
      this.setState({ goals: list });
    });
  }

  fetchTaskInfo() {
    return axios.get(`${ROOT_URL}/childtasks/${this.state.email}`).then((response) => {
      // make a list of the parent's children
      const payload = response.data;
      const list = [];
      Object.keys(payload).forEach((key) => {
        list.push({
          name: payload[key].taskName,
          value: payload[key].reward,
          description: payload[key].taskDescription,
        });
      });
      this.setState({ tasks: list });
    });
  }

  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }


  renderGoalsToComplete() {
    if (this.state.goals.length > 0) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
          Child Goals
          </Text>

          { this.state.goals.map(goal => (
            <View key={goal.name}>
              <NotificationCard entry={goal}
                completed
                nothing
              />

            </View>
          ))}

        </View>
      );
    } else {
      console.log('badd');
      return (null);
    }
  }

  renderChores() {
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionHeader}>
          Chores
        </Text>
        { this.state.tasks.map(goal => (
          <View key={goal.name}>
            <NotificationCard entry={goal}
              completed
              nothing

            />

          </View>
        ))}

      </View>
    );
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={pageStyle.homeWrapper}>
            <View style={pageStyle.topContainer}>

              <Text style={pageStyle.headerText}>
                {this.state.bioInfo.firstName}
                {'\'s Page' }
              </Text>
              <View style={pageStyle.balanceContainer}>
                <Text style={pageStyle.balanceText}>
                  {'$'}
                  {this.state.bioInfo.balance}
                </Text>
              </View>

            </View>
            <ScrollView style={pageStyle.main}>


              {this.renderGoalsToComplete()}


              {this.renderChores()}

            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  homeWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },

  topContainer: {
    width: dimensions.fullWidth,
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 0,
  },

  main: {
    flex: 1,
    marginBottom: 90,
  },

  headerText: {
    paddingTop: 80,
    marginLeft: 15,
    alignContent: 'center',
    fontSize: fonts.lg,
    color: colors.black,
  },

  balanceContainer: {
    backgroundColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  balanceText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
  },

  sectionContainer: {
    marginBottom: 15,
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },
  noGoals: {
    alignItems: 'center',
    justifyContent: 'center',


  },

  noGoalsText: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.primary,
  },
});


export default ParentViewOfChild;
