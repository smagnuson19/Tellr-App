/*
Starter code layout taken from: https://github.com/JoeRoddy/react-native-leaderboard/blob/master/examples/CustomExample.js
*/

import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard';
import LinearGradient from 'react-native-linear-gradient';
import Prompt from 'react-native-prompt';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';

// TODO: Add friends button - where on the screen? - maybe change
// make add friends go to a different page
// connect with backend
// change avatars

class Friends extends Component {
    state = {
      weeklyData: [
        { username: 'We Tu Lo', score: null, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
        { username: 'Adam Savage', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
        { username: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
        { username: 'Joe Roddy', score: 50, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
        { username: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { username: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
      ],
      monthlyData: [
        { username: 'Joe Roddy', score: 50, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
        { username: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { username: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
      ],
      filter: 0,
      userRank: 1,
      user: {
        username: 'Joe Roddy',
        score: 50,
      },
      promptVisible: false,
      message: '',
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

    // add friends button functionality - enter email address when clicked
    // submitFriends() {
    // move to home page after you submit a friend to AddTask
    //   const resetAction = StackActions.reset({
    //     index: 0, // <-- currect active route from actions array
    //     key: null,
    //     actions: [
    //       NavigationActions.navigate({ routeName: 'ParentTabBar' }),
    //     ],
    //   });
    //
    //   const payLoad = {
    //     taskName: this.state.taskName,
    //     reward: this.state.reward,
    //     taskDeadline: this.state.taskDeadline,
    //     taskDescription: this.state.taskDescription,
    //     childEmail: this.state.childEmail,
    //     senderEmail: this.props.account.email,
    //   };
    //
    //   // Error checking: make sure all of the fields are filled in
    //   if (this.state.taskName === '') {
    //     Alert.alert('Please enter a Task Name');
    //     console.log('ERROR: task name empty');
    //   } else if (this.state.taskDeadline === '') {
    //     Alert.alert('Please enter a Task Deadline');
    //     console.log('ERROR: task deadline empty');
    //   } else if (this.state.childEmail === '' || this.state.childEmail == null) {
    //     Alert.alert('Please select a child for this task');
    //     console.log('ERROR: select child empty');
    //   } else if (this.state.taskDescription === '') {
    //     Alert.alert('Please enter a Task Description');
    //     console.log('ERROR: task description empty');
    //   } else if (this.state.reward === '') {
    //     Alert.alert('Please enter a Reward');
    //     console.log('ERROR: reward empty');
    //   } else {
    //     console.log(payLoad);
    //     this.props.postTask(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
    //   }
    // }

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
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>
                {this.state.message}
              </Text>
            </View>
            <Prompt
              title="Say something"
              placeholder="Start typing"
              defaultValue="Hello"
              visible={this.state.promptVisible}
              onCancel={() => this.setState({ promptVisible: false, message: 'You cancelled' })}
              onSubmit={value => this.setState({ promptVisible: false, message: `You said "${value}"` })}
            />
          </View>
          <Text style={{
            color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
          }}
          >
            {this.state.user.score}
pts
          </Text>
          <ButtonGroup
            onPress={(x) => { this.setState({ filter: x }); }}
            selectedIndex={this.state.filter}
            buttons={['Weekly', 'Monthly']}
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

    // Add friends button ?
    // renderFooter() {
    //   return (
    //     <View
    //       style={{
    //         padding: 15, paddingTop: 45, alignItems: 'center',
    //       }}
    //     >
    //       <Text style={{
    //         fontSize: fonts.lg, color: 'white', fontFamily: fonts.secondary, textAlign: 'center',
    //       }}
    //       >
    //         {'Add Friends!'}
    //       </Text>
    //     </View>
    //   );
    // }

    render() {
      const props = {
        labelBy: 'username',
        sortBy: 'score',
        data: this.state.filter > 0 ? this.state.monthlyData : this.state.weeklyData,
        icon: 'iconUrl',
        sort: this.sort,
      };

      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={{ flex: 1 }}>
              {this.renderHeader()}
              <Leaderboard {...props} />
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

export default Friends;
