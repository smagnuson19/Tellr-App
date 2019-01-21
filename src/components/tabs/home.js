import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import AvatarImage from './avatarImage';
import GoalsCard from './goalsCard';
import Child from './child';
import { fetchNotificationInfo, fetchParentInfo, fetchUserInfo } from '../../actions/index';
import { fonts, colors, dimensions } from '../../styling/base';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };

    // Bind this instance used in navigationToAccount to this component
    this.navigationToAccount = this.navigationToAccount.bind(this);
    this.renderGoalAction = this.renderGoalAction.bind(this);
    this.renderVerifyAction = this.renderVerifyAction.bind(this);
  }

  componentDidMount() {
    // this.fetchAtLoad();
  }


  // A pull down has been initiated
  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  // Pulls in new data for the pull Down Refresh
  reloadApiData() {
    // Do we want to update children info as well?
    this.props.fetchNotificationInfo(this.props.account.email);
    this.props.fetchUserInfo(this.props.account.email);
    // No longer fetching
    this.setState({ isFetching: false });
  }


  // navigate to the correct account for child on a click
  navigationToAccount(childEmail) {
    this.props.navigation.navigate('ChildPage', {
      email: childEmail,
    });
  }


  // sEmail is the childs and cEmail is the parents or assigners
  renderGoalAction(action, taskName, sEmail, cEmail, priority, taskReward, description) {
    let num;
    console.log(action);

    // Ignore won't ever come in because you cant do that
    if (action === 'Accept') {
      num = 1;
    } else if (action === 'Deny') {
      num = -1;
    } else if (action === 'Complete') {
      let payLoad = {
        email: sEmail,
        taskName,
      };
      console.log('WORKING');
      console.log(payLoad);
      axios.post(`${ROOT_URL}/tasks/completed`, { payLoad })
        .then((response) => {
          console.log(response.data);
          payLoad = {
            email: sEmail,
            priority,
          };
          axios.post(`${ROOT_URL}/notifications`, { payLoad })
            .then((res) => {
              console.log(res.data);
              this.fetchAtLoad();
            });
        });
      return ('nothing');
    } else if (action === 'Dismiss') { // here we know that its a dismiss
      const payLoad = {
        email: sEmail,
        priority,
      };

      axios.post(`${ROOT_URL}/notifications`, { payLoad })
        .then((response) => {
          console.log(response.data);
          this.fetchAtLoad();
        });
      return ('nothing');
    }

    let payLoad = {
      goalName: taskName,
      childEmail: cEmail,
      approved: num,
      senderEmail: sEmail,
    };
    console.log('IN GOAL ACTION');
    console.log(payLoad);

    axios.post(`${ROOT_URL}/goals/approve`, { payLoad })
      .then((response) => {
        console.log(response.data);
        payLoad = {
          email: sEmail,
          priority,
        };
        console.log('Its all ending');
        console.log(payLoad);
        axios.post(`${ROOT_URL}/notifications`, { payLoad })
          .then((res) => {
            console.log(res.data);
            this.fetchAtLoad();
          });
      });
    return ('nothing');
  }

  // For goals that have not been approved yet
  renderGoalsToComplete() {
    console.log(this.props.notificaitons);
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
          Verify Goals
          </Text>
          <Divider style={pageStyle.divider} />

          <View>
            <Text> No Goals To Verify, have your child add more! </Text>
          </View>


        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
        Verify Goals
          </Text>
          <Divider style={pageStyle.divider} />

          { this.props.notifications.map(goals => (
            <View key={goals.priority}>
              <GoalsCard goals={goals}
                notificationTypePassed="newGoal"
                completed={false}
                onPress={this.renderGoalAction}
              />
            </View>
          ))}


        </View>
      );
    }

    //
  }

  renderGoalsCompleted() {
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
          Recently Completed Goals
          </Text>
          <Divider style={pageStyle.divider} />

          <View>
            <Text> No Goals To Confirm, remind your child! </Text>
          </View>


        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
      Recently Completed Goals
          </Text>
          <Divider style={pageStyle.divider} />
          { this.props.notifications.map(goal => (
            <View key={goal.id}>
              <GoalsCard goals={goal}
                notificationTypePassed="goalComplete"
                nothing
                onPress={this.renderGoalAction}
              />

            </View>
          ))}

        </View>
      );
    }
  }

  // sEmail is the childs and cEmail is the parents
  renderVerifyAction(action, goalName, sEmail, cEmail, priority, taskReward, description) {
    let num;
    if (action === 'Accept') {
      num = true;
    } else {
      num = false;
    }
    let payLoad = {
      email: cEmail,
      taskName: goalName,
      verify: num,
    };
    console.log(payLoad);
    axios.post(`${ROOT_URL}/tasks/verified`, { payLoad })
      .then((response) => {
        console.log(response.data);
        console.log('redeemGoal');
        // console.log(payLoad);
        // axios.post(`${ROOT_URL}/redeem`, { payLoad })
        //   .then((res) => {
        payLoad = {
          email: sEmail,
          priority,
        };
        axios.post(`${ROOT_URL}/notifications`, { payLoad })
          .then((result) => {
            console.log(result.data);
            this.fetchAtLoad();

            //  add the task back if it was denied by the parent
            // TODO: get taskDeadline here somehow
            payLoad = {
              taskName: `DENIED, REDO: ${goalName}`,
              reward: taskReward,
              taskDeadline: 'holder',
              taskDescription: description,
              childEmail: cEmail,
              senderEmail: sEmail,
            };
            if (num === false) {
              axios.post(`${ROOT_URL}/tasks`, { payLoad })
                .then((denyResponse) => {
                  console.log(denyResponse.data);
                  this.fetchAtLoad();
                });
            }
          });
        // });
      });

    return ('nothing');
  }

  renderChoresToVerify() {
    if (this.props.notifications === null) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
          Verify Chore Completion
          </Text>
          <Divider style={pageStyle.divider} />
          <View>
            <Text>
              {' '}
No Chores To Verify, Add some more!
            </Text>
          </View>


        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
            Verify Chore Completion
          </Text>
          <Divider style={pageStyle.divider} />
          console.log(this.props.displayInfo);
          { this.props.notifications.map(goal => (
            <View key={goal.id}>
              <GoalsCard goals={goal}
                notificationTypePassed="taskComplete"
                completed={false}
                onPress={this.renderVerifyAction}
              />

            </View>
          ))}

        </View>
      );
    }
  }

  renderAvatarRow() {
    return (
      <View style={pageStyle.avatarRow}>
        { this.props.family.map(person => (
          <View key={person.email}>
            <AvatarImage onPressNav={this.navigationToAccount} individual={person} />

          </View>
        ))}

      </View>
    );
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

          {this.renderGoalsToComplete()}

          {this.renderChoresToVerify()}

          {this.renderGoalsCompleted()}

        </ScrollView>

      </View>

    );
  }

  // render of the childs view
  renderChildView() {
    if ((this.props.family !== null)) {
      return (

        <Child firstName={this.props.account.firstName} balance={this.props.account.balance} task={this.props.notifications} onPress={this.renderGoalAction} />
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
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.renderParentView()}
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
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

    backgroundColor: '#fff',
    marginBottom: 15,
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
  topDivider: {
    backgroundColor: colors.primary,
    height: 2,

    marginBottom: 15,
  },


});

const mapStateToProps = state => (
  {
    account: state.user.info,
    notifications: state.user.notifications,
    family: state.user.family,
  });


export default connect(mapStateToProps, { fetchParentInfo, fetchNotificationInfo, fetchUserInfo })(Home);
