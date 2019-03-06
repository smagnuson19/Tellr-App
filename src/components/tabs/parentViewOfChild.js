import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fonts2, colors2, dimensions2 } from '../../styling/parent';
import NotificationCard from './notificationCard';
import { themeColors } from '../../styling/colorModes';
import { fonts } from '../../styling/base';
import Style from '../../styling/Style';


class ParentViewOfChild extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const childAccount = navigation.getParam('childInfo');
    this.state = {
      childAccount,
    };
    console.log(childAccount);
    this.buttonPress = this.buttonPress.bind(this);
  }

  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }


  renderCompletedGoals() {
    const cg = [];
    let empty = true;
    for (let i = 0; i < this.state.childAccount.goals.length; i++) {
      if (this.state.childAccount.goals[i].redeemed === true) {
        cg.push(this.state.childAccount.goals[i]);
        empty = false;
      }
    }

    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.subSectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
        Completed:
          </Text>

          { cg.map(goal => (
            <View key={goal.name}>
              <NotificationCard
                entry={goal}
                displayButtons={false}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (null);
    }
  }

  renderProgressGoals() {
    const pg = [];
    let empty = true;
    for (let i = 0; i < this.state.childAccount.goals.length; i++) {
      if (this.state.childAccount.goals[i].redeemed === false) {
        pg.push(this.state.childAccount.goals[i]);
        empty = false;
      }
    }

    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.subSectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
        In Progress:
          </Text>

          { pg.map(goal => (
            <View key={goal.name}>
              <NotificationCard
                entry={goal}
                displayButtons={false}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (null);
    }
  }

  renderGoalsToComplete() {
    if (this.state.childAccount.goals.length > 0) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Goals
          </Text>
          {this.renderCompletedGoals()}
          {this.renderProgressGoals()}

        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Goals
          </Text>
          <Text style={{ color: themeColors.headerColor[this.props.mode], paddingHorizontal: 15 }}>
          No goals to show!
          </Text>
        </View>
      );
    }
  }

  renderCompletedTasks() {
    const ct = [];
    let empty = true;
    for (let i = 0; i < this.state.childAccount.tasks.length; i++) {
      if (this.state.childAccount.tasks[i].verified === true) {
        ct.push(this.state.childAccount.tasks[i]);
        empty = false;
      }
    }

    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.subSectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
        Completed:
          </Text>

          { ct.map(goal => (
            <View key={goal.name}>
              <NotificationCard
                entry={goal}
                displayButtons={false}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (null);
    }
  }

  renderNewTasks() {
    const nt = [];
    let empty = true;
    for (let i = 0; i < this.state.childAccount.tasks.length; i++) {
      if (this.state.childAccount.tasks[i].verified === false) {
        nt.push(this.state.childAccount.tasks[i]);
        empty = false;
      }
    }

    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.subSectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
        In Progress:
          </Text>

          { nt.map(goal => (
            <View key={goal.name}>
              <NotificationCard
                entry={goal}
                displayButtons={false}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return (null);
    }
  }

  renderChores() {
    if (this.state.childAccount.tasks.length > 0) {
      return (

        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
            Chores
          </Text>
          {this.renderCompletedTasks()}
          {this.renderNewTasks()}
        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Chores
          </Text>
          <Text style={{ color: themeColors.headerColor[this.props.mode], paddingHorizontal: 15 }}>
          No chores to show!
          </Text>
        </View>
      );
    }
  }

  render() {
    console.log(this.state.childAccount);
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={pageStyle.homeWrapper}>
            <View style={pageStyle.topContainer}>

              <Text style={{
                paddingTop: 80,
                marginLeft: 15,
                alignContent: 'center',
                fontSize: fonts2.lg,
                color: themeColors.headerColor[this.props.mode],
              }}
              >
                {this.state.childAccount.firstName}
                {'\'s Page' }
              </Text>
              <View style={{
                backgroundColor: this.state.childAccount.avatarColor,
                width: 100,
                height: 100,
                borderRadius: 100,
                marginTop: 40,
                marginBottom: 8,
                marginRight: 8,
                justifyContent: 'center',
              }}
              >
                <Text style={pageStyle.balanceText}>
                  {'$'}
                  {this.state.childAccount.balance}
                </Text>
              </View>

            </View>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
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
    width: dimensions2.fullWidth,
    height: dimensions2.fullHeight,
  },

  topContainer: {
    width: dimensions2.fullWidth,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 0,
  },

  main: {
    flex: 1,
    marginBottom: 90,
  },

  // headerText: {
  //   paddingTop: 80,
  //   marginLeft: 15,
  //   alignContent: 'center',
  //   fontSize: fonts2.lg,
  //   color: colors2.black,
  // },

  balanceContainer: {
    backgroundColor: colors2.primary,
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
    color: themeColors.white,
    fontSize: fonts2.md,
    fontFamily: fonts2.secondary,
  },

  sectionContainer: {
    marginBottom: 15,
    paddingHorizontal: 4,
    width: dimensions2.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.lg,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  subSectionHeader: {
    fontSize: fonts.smmd,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 13,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    marginTop: 3,
    marginBottom: 3,
  },
  noGoals: {
    alignItems: 'center',
    justifyContent: 'center',


  },

  noGoalsText: {
    fontSize: fonts2.md,
    color: '#fff',
    fontFamily: fonts2.primary,
  },
});


const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
    mode: state.user.colorMode.color,
  });


export default connect(mapStateToProps, {

})(ParentViewOfChild);
