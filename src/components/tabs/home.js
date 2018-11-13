import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import AvatarImage from './avatarImage';
import GoalsCard from './goalsCard';
import Child from './child';
import { fonts, colors, dimensions } from '../../styling/base';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: '',
      children: [],
      displayInfo: [],
    };

    // Bind this instance used in navigationToAccount to this component
    this.navigationToAccount = this.navigationToAccount.bind(this);
    this.renderGoalAction = this.renderGoalAction.bind(this);
  }

  componentDidMount() {
    this.fetchAtLoad();
  }

  fetchUserInfo(childEmail) {
    return axios.get(`${ROOT_URL}/users/${childEmail}`).then((response) => {
      const payload = response.data;

      return (payload);
    }).catch((error) => {
      console.log('ERROR in fetching user info');
    });
  }

  fetchChildInfo(childEmail) {
  // fetch notification info for the child
    this.fetchNotificationInfo(childEmail).then((displayChildInfo) => {
      this.setState({ displayInfo: displayChildInfo });

      // go and fetch the actual user info for the child
      this.fetchUserInfo(childEmail).then((childContact) => {
        // update the state children which now holds infor pertaining to child user
        this.setState({ children: childContact });
      });
    });
  }

  fetchParentInfo(familyInfo) {
    return axios.get(`${ROOT_URL}/children/${familyInfo.emailID}`).then((response) => {
      // make a list of the parent's children
      const payload = response.data;
      const childList = [];
      Object.keys(payload).forEach((key) => {
        childList.push(payload[key]);
      });

      this.setState({ children: childList });

      this.fetchNotificationInfo(familyInfo.emailID).then((notificationInfo) => {
        // make a list of the parent's children
        console.log('Parent Notifcations grab below');
        console.log(notificationInfo);
        this.setState({ displayInfo: notificationInfo });
      });
    }).catch((error) => {
      console.log('ERROR in fetchParentInfo');
    });
  }

  fetchNotificationInfo(email) {
    return axios.get(`${ROOT_URL}/notifications/${email}`).then((response) => {
      const payload = response.data;
      const itemList = [];
      Object.keys(payload).forEach((key) => {
        itemList.push(payload[key]);
      });
      return (itemList);
    }).catch((error) => {
      console.log('ERROR in fetching Notifications');
    });
  }

  fetchAtLoad() {
    const familyInfo = {};
    AsyncStorage.multiGet(['emailID', 'familyID', 'accountTypeID'], (err, result) => {
      for (let i = 0; i < result.length; i++) {
        const nameExtract = result[i][0];

        const valExtract = result[i][1].slice(1, -1);
        familyInfo[nameExtract] = valExtract;
      }

      this.setState({ accountType: familyInfo.accountTypeID });
      // different avenues to retrive data
      if (familyInfo.accountTypeID === 'Child') {
        this.fetchChildInfo(familyInfo.emailID);
      } else if (familyInfo.accountTypeID === 'Parent') {
        this.fetchParentInfo(familyInfo);
      } else {
        console.log('missing accountTypeID');
      }
      // this.setState({ senderEmail: API_KEY_USERS });
    });
  }

  // navigate to the correct account for child on a click
  navigationToAccount(childEmail) {
    this.props.navigation.navigate('ChildPage');
  }


  renderGoalAction(action, goalName, sEmail, cEmail, priority) {
    let num;
    if (action === 'true') {
      num = 1;
    } else if (action === 'false') {
      num = 0;
    } else { // here we know that its a dismiss
      const payLoad = {
        email: sEmail,
        priority,
      };

      axios.post(`${ROOT_URL}/api/notifications`, { payLoad })
        .then((response) => {
          console.log(response.data);
        });
      return ('nothing');
    }
    const payLoad = {
      goalName,
      childEmail: cEmail,
      approved: num,
      senderEmail: sEmail,
    };
    console.log('IN GOAL ACTION');
    console.log(payLoad);

    axios.post(`${ROOT_URL}/goals/approve`, { payLoad })
      .then((response) => {
        console.log(response.data);
        // payLoad = {
        //   email: sEmail,
        //   priority,
        // };
        // axios.post(`${ROOT_URL}/api/notifications`, { payLoad })
        //   .then((res) => {
        //     console.log(res.data);
        //     this.fetchAtLoad();
        //   });
      });
    return ('nothing');
  }

  // For goals that have not been approved yet
  renderGoalsToComplete() {
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionHeader}>
      Family Goals
        </Text>
        <Divider style={pageStyle.divider} />
        { this.state.displayInfo.map(goal => (
          <View key={goal.priority}>
            <GoalsCard goals={goal}
              notificationTypePassed="newGoal"
              completed={false}
              onPress={this.renderGoalAction}
            />

          </View>
        ))}

      </View>
    );
  }

  renderGoalsCompleted() {
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionHeader}>
      Recently Completed Goals
        </Text>
        <Divider style={pageStyle.divider} />
        { this.state.displayInfo.map(goal => (
          <View key={goal.id}>
            <GoalsCard goals={goal}
              notificationTypePassed="goalComplete"
              completed={false}
              onPress={this.renderGoalAction}
            />

          </View>
        ))}

      </View>
    );
  }

  // not instantiated yet
  renderChoresCompleted() {
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionHeader}>
      Recently Completed Chores
        </Text>
        <Divider style={pageStyle.divider} />
        { this.state.displayInfo.map(goal => (
          <View key={goal.id}>
            <GoalsCard goals={goal}
              notificationTypePassed="taskComplete"
              completed={false}
              onPress={this.renderGoalAction}
            />

          </View>
        ))}

      </View>
    );
  }

  renderAvatarRow() {
    return (
      <View style={pageStyle.avatarRow}>
        { this.state.children.map(person => (
          <View key={person.email}>
            <AvatarImage onPress={this.navigationToAccount} individual={person} />

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

        <ScrollView tyle={pageStyle.main}>
          {this.renderGoalsToComplete()}


          {this.renderGoalsCompleted()}
        </ScrollView>

      </View>
    );
  }

  // render of the childs view
  renderChildView() {
    console.log('info to render for CHILLD');
    console.log(this.state.children);
    console.log(this.state.displayInfo);

    if ((this.state.children.length !== 0) && (this.state.children.length !== 0)) {
      return (
        <Child firstName={this.state.children.firstName} balance={this.state.children.balance} task={this.state.displayInfo} />
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
    // if (this.props.type === 'parent') {
    if (this.state.accountType === 'Parent') {
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


export default Home;
