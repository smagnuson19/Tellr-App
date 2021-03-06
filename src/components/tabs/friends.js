/*
Starter code layout taken from: https://github.com/JoeRoddy/react-native-leaderboard/blob/master/examples/CustomExample.js
Avatars from: http://avatars.adorable.io/#demo
*/

import React, { Component } from 'react';
import {
  View, Text, Alert, ScrollView, RefreshControl,
} from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard';
import LinearGradient from 'react-native-linear-gradient';
import DialogInput from 'react-native-dialog-input';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Style from '../../styling/Style';
import { fonts, dimensions } from '../../styling/base';
import { postRequest, fetchKidFriends, fetchAllSocial } from '../../actions/index';
import AvatarImageFriend from './avatarImageFriend';
import { themeColors } from '../../styling/colorModes';

// TODO:
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
      userScore: 0,
      isFetching: false,
      user: {
        name: this.props.account.email,
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

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

    sort = (data) => {
      const sorted = data && data.sort((item1, item2) => {
        return item2.score - item1.score;
      });

      // set userRank and userScore var
      let userRank = sorted.findIndex((item) => {
        return item.email === this.state.user.name;
      });
      const uScore = sorted[userRank].score;
      this.setState({ userRank: ++userRank });
      this.setState({ userScore: uScore });

      return sorted;
    }

    reloadApiData() {
      console.log('reloading api Data');
      // Do we want to update children info as well?
      this.props.fetchKidFriends(this.props.account.email);
      this.props.fetchAllSocial(this.props.account.email);
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
      this.setState({ isFetching: false });
    }

    sendFriendInvite(inputText) {
      // move to home page after you submit a friend
      let resetAction;
      if (this.props.mode === 0) {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ChildTabBarLight' }),
          ],
        });
      } else {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ChildTabBarDark' }),
          ],
        });
      }
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
              color: themeColors.headerColor[this.props.mode], fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, textAlign: 'right', marginRight: 40,
            }}
            >
              {`${numTasks(this.state.userScore)} Done`}
            </Text>
            <AvatarImageFriend
              individualName={`${this.props.account.firstName} ${this.props.account.lastName}`}
              avatarColor={this.props.account.avatarColor}
            />
            <Text style={{
              color: themeColors.headerColor[this.props.mode], fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
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
        </View>
      );
    }

    renderFooter() {
      return (
        <View
          style={{
            paddingTop: 5, paddingBottom: 45, alignItems: 'center',
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
              raised
              onPress={() => this.setState({ isDialogVisible: true })}
              title="Invite Friends!"
              buttonStyle={{
                backgroundColor: themeColors.buttonColor[this.props.mode],
                borderColor: 'transparent',
                borderWidth: 1,
                width: dimensions.fullWidth / 2 - 21,
                borderRadius: 5,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 0.8,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: { width: 1, height: 13 },
              }}
              style={Style.button}
              color={themeColors.buttonTextColor}
              fontFamily={fonts.secondary}
            />
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title="Enter Friend's Email!"
              hintInput="example@email.com"
              submitInput={(inputText) => { this.sendFriendInvite(inputText); }}
              closeDialog={() => this.setState({ isDialogVisible: false })}
              dialogStyle={{
                position: 'absolute',
                top: 240,
              }}
            />
            <Button
              raised
              onPress={() => this.props.navigation.navigate('FriendRequests')}
              title="See Invites"
              buttonStyle={{
                backgroundColor: themeColors.buttonColor[this.props.mode],
                borderColor: 'transparent',
                borderWidth: 1,
                width: dimensions.fullWidth / 2 - 21,
                borderRadius: 5,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 0.8,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: { width: 1, height: 13 },
              }}
              style={Style.button}
              color={themeColors.buttonTextColor}
              fontFamily={fonts.secondary}
            />
          </View>
        </View>
      );
    }

    render() {
      const props = {
        labelBy: 'name',
        sortBy: 'score',
        data: this.state.filter > 0 ? this.state.monthlyTaskData : this.state.weeklyTaskData,
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
            friendInfo: this.props.friendInfo,
          });
        },
      };

      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
            <View style={{ flex: 1 }}>
              <Text style={{
                flex: 0,
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: fonts.secondary,
                fontSize: fonts.xlg,
                color: themeColors.headerColor[this.props.mode],
                // color: colors.headerText,
                marginTop: '20%',
                marginBottom: '0%',
              }}
              >
Leaderboard
              </Text>
              {this.renderHeader()}
              <ScrollView refreshControl={(
                <RefreshControl
                  onRefresh={() => this.onRefresh()}
                  refreshing={this.state.isFetching}
                  tintColor="#fff"
                />
              )}
              >
                <Leaderboard {...props} />
              </ScrollView>
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
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postRequest, fetchKidFriends, fetchAllSocial })(Friends);
