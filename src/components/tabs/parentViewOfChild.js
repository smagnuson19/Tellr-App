import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { fonts, colors, dimensions } from '../../styling/base';
import GoalsCard from './goalsCard';

// import Style from '../../styling/Style';

class ParentViewOfChild extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const emailItem = navigation.getParam('email');
    this.state = {
      email: emailItem,
    };
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentDidMount() {
    this.fetchAccountinfo();
  }

  fetchAccountinfo() {
    console.log(this.state.email);
  }

  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }

  checkEmptyTasks() {
    // const empty = this.props.task.length;
    // if (empty !== 0) {
    //   return (
    //
    //     <View>
    //
    //       { this.props.task.map(component => (
    //         <View key={component.notificationName}>
    //           <GoalsCard goals={component}
    //             notificationTypePassed="newTask"
    //             completed={false}
    //             typeChore
    //             onPress={this.buttonPress}
    //           />
    //
    //         </View>
    //       ))}
    //     </View>
    //   );
    // } else {
    //   return (
    //     <View style={pageStyle.noGoals}>
    //       <Text style={pageStyle.noGoalsText}> Chores are fun! Ask for more! :) </Text>
    //     </View>
    //   );
    // }
  }

  render() {
    return (
      <View style={pageStyle.homeWrapper}>
        <View style={pageStyle.topContainer}>

          <Text style={pageStyle.headerText}>
            {'Hey '}
            {'name'}
            {'!'}
          </Text>
          <View style={pageStyle.balanceContainer}>
            <Text style={pageStyle.balanceText}>
              {'$'}
              {'balance'}
            </Text>
          </View>

        </View>
        <View style={pageStyle.main}>

          <View style={pageStyle.sectionContainer}>
            <Text style={pageStyle.sectionHeader}>
        Complete The Tasks
            </Text>

            {this.checkEmptyTasks()}
          </View>
        </View>
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
    color: 'rgb(0, 0, 0)',
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
