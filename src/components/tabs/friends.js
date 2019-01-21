import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage, Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Leaderboard from 'react-native-leaderboard';
import { colors } from '../../styling/base';
import Style from '../../styling/Style';

// const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { userName: 'Joe', highScore: 52 },
        { userName: 'Jenny', highScore: 120 },
      ],
    };
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Leaderboard
              data={this.state.data}
              sortBy="highScore"
              labelBy="userName"
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Friends;
