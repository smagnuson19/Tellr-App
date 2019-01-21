import React, { Component } from 'react';
// import {
//   View, Text, StyleSheet, AsyncStorage, Button,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Leaderboard from 'react-native-leaderboard';


// const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';

class Social extends Component {
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
      <Leaderboard
        data={this.state.data}
        sortBy="highScore"
        labelBy="userName"
      />
    );
  }
}

export default Social;
