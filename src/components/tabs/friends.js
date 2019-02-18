/*
Starter code layout taken from: https://github.com/JoeRoddy/react-native-leaderboard/blob/master/examples/CustomExample.js
Avatars from: http://avatars.adorable.io/#demo
*/

import React, { Component } from 'react';
import {
  View, Text, Alert, Image,
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
        username: this.props.account.email,
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
        username: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
        iconUrl: this.props.friendInfo[key].avatarUrl,
        email: key,
      });
    });
    console.log(weeklyTaskDataList);
    this.setState({ weeklyTaskData: weeklyTaskDataList });

    const monthlyTaskDataList = [];
    Object.keys(this.props.friendInfo).forEach((key) => {
      monthlyTaskDataList.push({
        score: this.props.friendInfo[key].tasksCompletedMonth,
        username: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
        iconUrl: this.props.friendInfo[key].avatarUrl,
        email: key,
      });
    });
    console.log(monthlyTaskDataList);
    this.setState({ monthlyTaskData: monthlyTaskDataList });


    // const weeklyGoalDataList = [];
    // Object.keys(this.props.friendInfo).forEach((key) => {
    //   weeklyGoalDataList.push({
    //     score: this.props.friendInfo[key].goalsCompletedWeek,
    //     username: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
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
    //     username: `${this.props.friendInfo[key].firstName} ${this.props.friendInfo[key].lastName}`,
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
        return item.username === this.state.user.username;
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
            padding: 15, paddingTop: 45, alignItems: 'center',
          }}
        >
          <Text style={{
            fontSize: fonts.lg, color: 'white', fontFamily: fonts.secondary, textAlign: 'center',
          }}
          >
            {'Leaderboard'}
          </Text>
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
              {ordinalSuffixOf(this.state.userRank)}
            </Text>
            <AvatarImage
              flex: 0.66, height: 60, width: 60, borderRadius: 60 / 2,
            }}
              source={{ uri: 'https://api.adorable.io/avatars/165/a.png' }}
            />
            <AvatarImage
              individual={this.props.account}
            />
            <Text style={{
              color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
            }}
            >
              {this.state.user.score}
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
              {'Username'}
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
        labelBy: 'username',
        sortBy: 'score',
        data: this.state.filter > 0 ? this.state.monthlyTaskData : this.state.weeklyTaskData,
        icon: 'iconUrl',
        sort: this.sort,
        onRowPress: (item, index) => {
          this.props.navigation.navigate('SocialIndividual', {
            email: item.email,
          });
        },
      };
      console.log(this.state.filter);
      console.log(props.data);

      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={{ flex: 1 }}>
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


const mapStateToProps = state => (
  {
    account: state.user.info,
    friendInfo: state.user.friendInfo,
  });

export default connect(mapStateToProps, { postRequest, fetchKidFriends })(Friends);
