import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import AvatarImage from './avatarImage';
import NotificationCard from './notificationCard';
import Child from './child';
import {
  fetchNotificationInfo, fetchParentInfo, fetchUserInfo, postTaskCompleted, postTask,
  postNotifications, postGoalApprove, postTaskVerified, fetchAllSocial, fetchKidFriends, fetchColorMode,
  fetchTasksWeek, fetchTasksMonth, fetchGoals, fetchEarningsHistory, fetchAllStats, fetchTasksYear, fetchOtherParents,
} from '../../actions/index';
import { fonts, colors, dimensions } from '../../styling/base';
import { themeColors } from '../../styling/colorModes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };

    // Bind this instance used in navigationToAccount to this component
    this.navigationToAccount = this.navigationToAccount.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.onRefreshForChild = this.onRefreshForChild.bind(this);
    this.navigationToCompletedTasks = this.navigationToCompletedTasks.bind(this);
  }

  // A pull down has been initiated
  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  // Needed becasuse there is no seperate parent component but there is a seperate
  // child component and this function needs to be bound to the home component
  onRefreshForChild() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  // Pulls in new data for the pull Down Refresh
  reloadApiData() {
    console.log('reloading api Data');
    // Do we want to update children info as well?
    this.props.fetchNotificationInfo(this.props.account.email);
    this.props.fetchUserInfo(this.props.account.email);
    this.props.fetchColorMode(this.props.account.email);

    if (this.props.account.accountType === 'Parent') {
      console.log('refreshing parents');
      this.props.fetchParentInfo(this.props.account.email);
      this.props.fetchOtherParents(this.props.account.email);
    } else {
      console.log('refreshing kids');
      this.props.fetchAllSocial(this.props.account.email);
      this.props.fetchKidFriends(this.props.account.email);
      this.props.fetchGoals(this.props.account.email);
      this.props.fetchTasksWeek(this.props.account.email);
      this.props.fetchTasksMonth(this.props.account.email);
      this.props.fetchTasksYear(this.props.account.email);
      this.props.fetchAllStats(this.props.account.email);
      this.props.fetchEarningsHistory(this.props.account.email);
    }
    // No longer fetching
    this.setState({ isFetching: false });
  }


  // navigate to the correct account for child on a click
  navigationToAccount(child) {
    this.props.navigation.navigate('ChildPage', {
      childInfo: child,
    });
  }

  navigationToCompletedTasks() {
    this.props.navigation.navigate('CompletedTasks');
  }


  renderAction(action, taskName, sEmail, cEmail, priority, taskReward, description, redeemed, notificationType) {
    // child marked task complete now Verify
    console.log(action);
    if (notificationType === 'newGoal') {
      const actionMap = {
        Accept: 1,
        Deny: -1,
      };
      // create the payload to send to goals
      const payLoad = {
        goalName: taskName,
        childEmail: cEmail,
        approved: actionMap[action],
        senderEmail: sEmail,

      };
      console.log(payLoad);

      this.props.postGoalApprove(payLoad, priority);
    }


    // New Task for the Child to see

    if (notificationType === 'newTask') {
      // We do not give them the option to ignore right now.
      // Could easily add in notifcaitonCard
      if (action === 'Complete') {
        const payLoad = {
          email: sEmail,
          taskName,
        };
        this.props.postTaskCompleted(payLoad, priority);
      }
    } else if (notificationType === 'taskUnverified') {
      if (action === 'Complete') {
        const payLoad = {
          email: sEmail,
          taskName,
        };
        this.props.postTaskCompleted(payLoad, priority);
      }
      // Parent dismissed the goal child has completed
    } else if (notificationType === 'Redemption') {
      if (action === 'Complete') {
        const payLoad = {
          email: sEmail,
          priority,
        };
        this.props.postNotifications(payLoad);
        this.reloadApiData();
      }
      // Parent dismissed the goal child has completed
    } else if (notificationType === 'goalComplete') {
      if (action === 'Dismiss') {
        const payLoad = {
          email: sEmail,
          priority,
        };
        this.props.postNotifications(payLoad);
      } else {
        console.log('Error: something incorrectly selected');
      }


      // Parent Verify Task Completed
    } else if (notificationType === 'taskComplete') {
      let bool;
      if (action === 'Accept') { bool = true; } else { bool = false; }
      const payLoad = {
        email: cEmail,
        taskName,
        verify: bool,
      };
      this.props.postTaskVerified(payLoad, sEmail, priority);
    } else {
      console.log(`Error in renderActions: ${notificationType}`);
    }
    return ('nothing');
  }

  renderRedeemMoney() {
    if (this.props.notifications === null) {
      return (null);
    } else {
      let shouldDisplay = false;
      this.props.notifications.forEach((item) => {
        if (item.notificationType === 'Redemption') { shouldDisplay = true; }
      });
      if (shouldDisplay) {
        return (
          <View style={pageStyle.sectionContainer}>
            <Text style={[pageStyle.sectionHeader,
              { color: themeColors.headerColor[this.props.mode] }]}
            >
          Money Requested
            </Text>
            <View style={pageStyle.borderContainer}>
              <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
            </View>
            { this.props.notifications.map(goals => (

              <NotificationCard
                key={goals.priority}
                entry={goals}
                notificationTypePassed="Redemption"
                onPress={this.renderAction}
              />

            ))}


          </View>
        );
      } else {
        return (null);
      }
    }
  }


  // For goals that have not been approved yet
  renderGoalsToComplete() {
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Verify Goals
          </Text>
          <View
            style={pageStyle.borderContainer}
          >
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>
          <View>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.lightGrey }}> No Goals To Verify, have your child add more! </Text>
          </View>


        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
        Verify Goals
          </Text>
          <View style={pageStyle.borderContainer}>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>
          { this.props.notifications.map(goals => (

            <NotificationCard
              key={goals.priority}
              entry={goals}
              notificationTypePassed="newGoal"
              onPress={this.renderAction}
            />

          ))}


        </View>
      );
    }
  }

  renderGoalsCompleted() {
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Recently Completed Goals
          </Text>
          <View style={pageStyle.borderContainer}>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>
          <View>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.lightGrey }}> No Goals To Confirm, remind your child! </Text>
          </View>


        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
      Recently Completed Goals
          </Text>
          <View style={pageStyle.borderContainer}>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>
          { this.props.notifications.map(goal => (

            <NotificationCard
              key={goal.id}
              entry={goal}
              notificationTypePassed="goalComplete"
              onPress={this.renderAction}
            />


          ))}

        </View>
      );
    }
  }


  renderChoresToVerify() {
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
          Verify Chore Completion
          </Text>
          <View style={pageStyle.borderContainer}>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>
          <View>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.lightGrey }}>
              {' '}
No Chores To Verify, Add some more!
            </Text>
          </View>


        </View>
      );
    } else {
      console.log(this.props.notifications);
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={[pageStyle.sectionHeader,
            { color: themeColors.headerColor[this.props.mode] }]}
          >
            Verify Chore Completion
          </Text>
          <View style={pageStyle.borderContainer}>
            <Divider style={[pageStyle.divider, { backgroundColor: themeColors.divider[this.props.mode] }]} />
          </View>

          { this.props.notifications.map(goal => (

            <NotificationCard
              key={goal.priority}
              entry={goal}
              notificationTypePassed="taskComplete"
              onPress={this.renderAction}
            />


          ))}

        </View>
      );
    }
  }

  renderAvatarRow() {
    if (this.props.family === null) {
      return (

        <View style={pageStyle.avatarRowNOICONS}>
          <Text style={pageStyle.avatarRowNOICONSTEXT}> Please ask family members to sign up! </Text>
        </View>
      );
    } else {
      console.log('rendering avatars');
      console.log(this.props.family);
      return (
        <View style={pageStyle.avatarRow}>
          { this.props.family.map(person => (
            <View key={person.email}>
              <AvatarImage
                onPressNav={this.navigationToAccount}
                individual={person}
              />
            </View>
          ))}
        </View>
      );
    }
  }


  // Render of the parentsView
  renderParentView() {
    return (
      <View style={pageStyle.homeWrapper}>
        <View style={pageStyle.topContainer}>
          {this.renderAvatarRow()}


        </View>

        <ScrollView style={pageStyle.main}
          refreshControl={(
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              tintColor="#fff"
            />
)}
        >
          {this.renderRedeemMoney()}
          {this.renderGoalsCompleted()}
          {this.renderGoalsToComplete()}
          {this.renderChoresToVerify()}

        </ScrollView>
        <View style={pageStyle.bottomContainer}>
          <Text>
            {' '}
          </Text>
        </View>
      </View>

    );
  }

  // render of the childs view
  renderChildView() {
    if ((this.props.account !== null)) {
      // Checking incase notifcations is null
      let notifications;
      if (this.props.notifications === null) {
        notifications = [];
      } else {
        notifications = this.props.notifications;
        console.log(notifications);
      }

      return (

        <Child
          firstName={this.props.account.firstName}
          balance={this.props.account.balance}
          task={notifications}
          isFetching={this.state.isFetching}
          onPress={this.renderAction}
          refreshAPI={this.onRefreshForChild}
          navigationToCompletedTasks={this.navigationToCompletedTasks}
        />
      );
    } else {
      return (
        <Text>
        Loading...
        </Text>
      );
    }
  }

  render() {
    if (this.props.account.accountType === 'Parent') {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.renderParentView()}
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.renderChildView()}
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}

const pageStyle = StyleSheet.create({
  homeWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },
  main: {
    flex: 1,
  },
  topContainer: {
    marginTop: 0,
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,

    marginBottom: 15,
  },
  bottomContainer: {
    marginTop: 0,
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    marginBottom: 50,
  },

  avatarRow: {
    flexDirection: 'row',
    // width: dimensions.fullWidth,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 15,
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.md,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  divider: {
    flex: 1,
    height: 2,
    marginTop: 1,
    marginBottom: 6,
    width: '97%',
  },
  borderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topDivider: {
    backgroundColor: colors.secondary,
    height: 2,

    marginBottom: 15,
  },
  avatarRowNOICONS: {
  },

  avatarRowNOICONSTEXT: {
    fontSize: fonts.md,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: '12%',
    paddingBottom: '5%',

  },


});

const mapStateToProps = state => (
  {
    account: state.user.info,
    family: state.user.family,
    notifications: state.user.notifications,
    mode: state.user.colorMode.color,
  });


export default connect(mapStateToProps, {
  fetchParentInfo,
  fetchNotificationInfo,
  fetchAllSocial,
  fetchKidFriends,
  fetchUserInfo,
  postTaskCompleted,
  postTask,
  postNotifications,
  postGoalApprove,
  postTaskVerified,
  fetchColorMode,
  fetchTasksWeek,
  fetchTasksMonth,
  fetchGoals,
  fetchEarningsHistory,
  fetchAllStats,
  fetchTasksYear,
  fetchOtherParents,
})(Home);
