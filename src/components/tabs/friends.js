/*
Starter code layout taken from: https://github.com/JoeRoddy/react-native-leaderboard/blob/master/examples/CustomExample.js
Avatars from: http://avatars.adorable.io/#demo
*/

import React, { Component } from 'react';
import {
  View, Text, Alert,
} from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard';
import LinearGradient from 'react-native-linear-gradient';
import DialogInput from 'react-native-dialog-input';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';
import { postRequest, fetchKidFriends } from '../../actions/index';
import AvatarImageFriend from './avatarImageFriend';

// TODO:
// change avatars:
//       need to add avatars to backened as part of friendInfo, need to make landing page for avatar selection when create an account
//       currently have as initials but this can change
// leaderboard user score switch for weeks / months
// add goals completed / tasks completed
// make the requests go away when pressed
// Dislay "friend request accepted" or something

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyTaskData: [],
      monthlyTaskData: [],
      // weeklyGoalData: [],
      // monthlyGoalData: [],
      filter: 0,
      userRank: 1,
      user: {
        name: this.props.account.email,
        score: this.props.friendInfo[this.props.account.email].tasksCompletedWeek,
      },
      isDialogVisible: false,
    };
  }

  componentWillMount() {
    const weeklyTaskDataList = [];
    Object.keys(this.props.friendInfo).forEach((key) => {
      weeklyTaskDataList.push({
        score: this.props.friendInfo[key].tasksCompletedWeek,
        name: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
        // iconUrl: this.props.friendInfo[key].avatarUrl,
        iconUrl: this.props.friendInfo[key].avatarColor,
        email: key,
      });
    });
    console.log(weeklyTaskDataList);
    this.setState({ weeklyTaskData: weeklyTaskDataList });

    const monthlyTaskDataList = [];
    Object.keys(this.props.friendInfo).forEach((key) => {
      monthlyTaskDataList.push({
        score: this.props.friendInfo[key].tasksCompletedMonth,
        name: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
        // iconUrl: this.props.friendInfo[key].avatarUrl,
        iconUrl: this.props.friendInfo[key].avatarColor,
        email: key,
      });
    });
    console.log(monthlyTaskDataList);
    this.setState({ monthlyTaskData: monthlyTaskDataList });


    // const weeklyGoalDataList = [];
    // Object.keys(this.props.friendInfo).forEach((key) => {
    //   weeklyGoalDataList.push({
    //     score: this.props.friendInfo[key].goalsCompletedWeek,
    //     name: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
    //     iconUrl: this.props.friendInfo[key].avatarUrl,
    //   });
    // });
    // console.log(weeklyGoalDataList);
    // this.setState({ weeklyGoalData: weeklyGoalDataList });
    //
    // const monthlyGoalDataList = [];
    // Object.keys(this.props.friendInfo).forEach((key) => {
    //   monthlyGoalDataList.push({
    //     score: this.props.friendInfo[key].goalsCompletedMonth,
    //     name: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
    //     iconUrl: this.props.friendInfo[key].avatarUrl,
    //   });
    // });
    // console.log(monthlyGoalDataList);
    // this.setState({ monthlyGoalData: monthlyGoalDataList });
  }

    sort = (data) => {
      const sorted = data && data.sort((item1, item2) => {
        return item2.score - item1.score;
      });
      let userRank = sorted.findIndex((item) => {
        return item.email === this.state.user.name;
      });
      this.setState({ userRank: ++userRank });
      return sorted;
    }

    sendFriendInvite(inputText) {
      // move to home page after you submit a friend
      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBar' }),
        ],
      });
      const payLoad = {
        email: this.props.account.email,
        friend: inputText,
      };
      // Error checking: make sure all of the fields are filled in
      if (inputText === '') {
        Alert.alert('Please enter a valid email address');
        console.log('ERROR: friend email empty');
      } else {
        console.log(payLoad);
        this.props.postRequest(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
      }
    }

    renderHeader() {
      return (
        <View
          style={{
            padding: 15, paddingTop: 25, alignItems: 'center',
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            marginTop: 20,
          }}
          >
            <Text style={{
              color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, textAlign: 'right', marginRight: 40,
            }}
            >
              {`${numTasks(this.state.user.score)} Done`}
            </Text>
            <AvatarImageFriend
              individualName={`${this.props.account.firstName} ${this.props.account.lastName}`}
              avatarColor={this.props.account.avatarColor}
            />
            <Text style={{
              color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
            }}
            >
              {`${ordinalSuffixOf(this.state.userRank)} Place`}
            </Text>
          </View>
          <ButtonGroup
            onPress={(x) => { this.setState({ filter: x }); }}
            selectedIndex={this.state.filter}
            buttons={['Weekly Tasks', 'Monthly Tasks']}
            containerStyle={{ height: 30 }}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 10,
          }}
          >
            <Text style={{
              color: 'white', fontSize: fonts.sm, textDecorationLine: 'underline', fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'left',
            }}
            >
              {'Name'}
            </Text>
            <Text style={{
              color: 'white', fontSize: fonts.sm, textDecorationLine: 'underline', fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'right',
            }}
            >
              {'# Tasks Completed'}
            </Text>
          </View>
        </View>
      );
    }

    renderFooter() {
      return (
        <View
          style={{
            padding: 15, paddingTop: 5, paddingBottom: 45, alignItems: 'center',
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 25,
            marginTop: 5,
          }}
          >
            <Button
              onPress={() => this.setState({ isDialogVisible: true })}
              title="Invite Friends!"
              rounded
              style={Style.button}
              backgroundColor={colors.logoGreen}
            />
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title="Add Friends!"
              message="Please enter your friend's email address"
              hintInput="example@email.com"
              submitInput={(inputText) => { this.sendFriendInvite(inputText); }}
              closeDialog={() => this.setState({ isDialogVisible: false })}
            />
            <Button
              onPress={() => this.props.navigation.navigate('FriendRequests')}
              title="Friend Requests"
              rounded
              style={Style.button}
              backgroundColor={colors.logoGreen}
            />
          </View>
        </View>
      );
    }

    render() {
      const props = {
        labelBy: 'name',
        sortBy: 'score',
        data: this.state.filter > 0 ? this.state.weeklyTaskData : this.state.monthlyTaskData,
        // icon: 'iconUrl',
        sort: this.sort,
        onRowPress: (item, index) => {
          console.log(item);
          this.props.navigation.navigate('SocialIndividual', {
            email: item.email,
            rank: index,
            score: item.score,
            name: item.name,
            avatarColor: item.iconUrl,
          });
        },
      };

      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={{ flex: 1 }}>
              <Text style={Style.headerTextLeaderboard}>Leaderboard </Text>
              {this.renderHeader()}
              <Leaderboard {...props} />
              {this.renderFooter()}
            </View>
          </LinearGradient>
        </View>
      );
    }
}

// suffix for position of the user on the leaderboard
const ordinalSuffixOf = (i) => {
  const j = i % 10;

  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const numTasks = (i) => {
  if (i === 1) {
    return `${i} Task`;
  } else {
    return `${i} Tasks`;
  }
};


const mapStateToProps = state => (
  {
    account: state.user.info,
    friendInfo: state.user.friendInfo,
  });

export default connect(mapStateToProps, { postRequest, fetchKidFriends })(Friends);
