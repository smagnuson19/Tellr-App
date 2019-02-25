import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { fonts, colors, dimensions } from '../../styling/base';
import NotificationCard from './notificationCard';

// import Style from '../../styling/Style';

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // buttonSelected: '',
    };
    this.buttonPress = this.buttonPress.bind(this);
    this.refreshAction = this.refreshAction.bind(this);
  }

  buttonPress(action, goalName, sEmail, cEmail, priority, taskReward, description, redeemed, notificationType) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority, taskReward, description, redeemed, notificationType);
  }

  refreshAction() {
    this.props.refreshAPI();
  }

  checkEmptyTasks() {
    let empty = true;
    for (let i = 0; i < this.props.task.length; i++) {
      if (this.props.task[i].notificationType === 'newTask') {
        empty = false;
      }
    }
    if (empty === false) {
      return (
        <View>
          { this.props.task.map(component => (
            <View key={component.notificationName}>
              <NotificationCard entry={component}
                notificationTypePassed="newTask"
                onPress={this.buttonPress}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={pageStyle.noGoals}>
          <Text style={pageStyle.noGoalsText}> Chores are fun! Ask for more! :) </Text>
        </View>
      );
    }
  }


  checkDeniedTasks() {
    let empty = true;
    for (let i = 0; i < this.props.task.length; i++) {
      if (this.props.task[i].notificationType === 'taskUnverified') {
        empty = false;
      }
    }
    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
      Your task was denied!
          </Text>
          <View>
            { this.props.task.map(component => (
              <View key={component.notificationName}>
                <NotificationCard entry={component}
                  notificationTypePassed="taskUnverified"
                  onPress={this.buttonPress}
                />
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      return (null);
    }
  }


  render() {
    return (
      <View style={pageStyle.homeWrapper}>
        <View style={pageStyle.topContainer}>
          <Text style={pageStyle.headerText}>
            {'Hey '}
            {this.props.firstName}
            {'!'}
          </Text>
          <View style={pageStyle.balanceContainer}>
            <Text style={pageStyle.balanceText}>
              {'$'}
              {this.props.balance}
            </Text>
          </View>
        </View>
        <ScrollView style={pageStyle.main}
          refreshControl={(
            <RefreshControl
              onRefresh={this.refreshAction}
              refreshing={this.props.isFetching}
              tintColor="#fff"
            />
)}
        >
          <View style={pageStyle.sectionContainer}>
            <Text style={pageStyle.sectionHeader}>
        Complete The New Tasks
            </Text>
            {this.checkEmptyTasks()}
          </View>
          {this.checkDeniedTasks()}
        </ScrollView>
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
  },
  headerText: {
    paddingTop: 80,
    marginLeft: 15,
    alignContent: 'center',
    fontSize: fonts.lg,
    color: colors.black,
  },
  balanceContainer: {
    backgroundColor: colors.linearGradientBottom,
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
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
    fontSize: 21,
    fontWeight: '400',
    color: colors.black,
    fontFamily: fonts.primary,
  },
});


export default Child;
