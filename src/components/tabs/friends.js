/*
Starter code layout taken from: https://github.com/JoeRoddy/react-native-leaderboard/blob/master/examples/CustomExample.js
*/

import React, { Component } from 'react';
import {
  View, Image, Text,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard';
import LinearGradient from 'react-native-linear-gradient';
import Style from '../../styling/Style';
import { colors, fonts } from '../../styling/base';

class Friends extends Component {
    state = {
      weeklyData: [
        { username: 'We Tu Lo', score: null, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
        { username: 'Adam Savage', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
        { username: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
        { username: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
        { username: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { username: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
      ],
      monthlyData: [
        { username: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
        { username: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { username: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
      ],
      filter: 0,
      userRank: 1,
      user: {
        username: 'Joe Roddy',
        score: 69,
      },
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
            <Image style={{
              flex: 0.66, height: 60, width: 60, borderRadius: 60 / 2,
            }}
              source={{ uri: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' }}
            />
            <Text style={{
              color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
            }}
            >
              {this.state.user.score}
pts
            </Text>
          </View>
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
