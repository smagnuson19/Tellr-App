import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Badge, Button } from 'react-native-elements';
import Style from '../../styling/Style';
// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
// import { fonts, colors, dimensions } from '../../styling/base';

// const API_KEY = '';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';

// const API_KEY = '';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Goals: '',
      Balance: '',
      senderEmail: '',
    };
  }

  // fetchGoals() {
  //   AsyncStorage.getItem('emailID', (err, result) => {
  //     const API_KEY_USERS = result;
  //     return axios.get(`${ROOT_URL}/goals/${API_KEY_USERS}`).then((response) => {
  //       // make a list of the childs goals
  //       const gList = response.data;
  //       const goalList = [];
  //       // loop through each kid and make an object for them with FirstName, Email
  //       Object.keys(gList).forEach((key) => {
  //         if (gList[key].approved === true && gList[key].redeemed !== false) {
  //           goalList.push({
  //             goalName: gList[key].goalName, goalDescription: gList[key].goalDescription, goalValue: gList[key].value, goalImage: gList[key].image,
  //           });
  //         }
  //       });
  //     }).catch((error) => {
  //       console.log('ERROR in AddTask');
  //     });
  //   });
  // }


  componentWillMount() {
    console.log('Getting balance');
    AsyncStorage.getItem('emailID', (err, result) => {
      const API_KEY_USERS = result.slice(1, -1);
      this.setState({ senderEmail: API_KEY_USERS });
    }).catch((error) => {
      console.log('ERROR in Goals');
    });
    return axios.get(`${ROOT_URL}/users/${this.state.senderEmail}`).then((response) => {
      // make a list of the parent's children
      const balance = response.data.balance;
      console.log('Got balance');
      console.log(this.state.Balance);
      this.setState({ Balance: balance });
    }).catch((error) => {
      console.log('ERROR in Goals');
    });
  }


  // submitgoals() {
  //   const payLoad = {
  //     goalsName: this.state.goalsName,
  //     goalsDeadline: this.state.goalsDeadline,
  //     child: this.state.child,
  //     goalsDescription: this.state.goalsDescription,
  //     reward: this.state.reward,
  //   };
  //
  //   axios.post(`${ROOT_URL}`, { payLoad })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  //
  //   // So that you are unable to navigate back to login page once logged in.
  //   const resetAction = StackActions.reset({
  //     index: 0, // <-- currect active route from actions array
  //     key: null,
  //     actions: [
  //       NavigationActions.navigate({ routeName: 'MainTabBar' }),
  //     ],
  //   });
  //
  //   this.props.navigation.dispatch(resetAction);
  // }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.headerText}>Goals!</Text>
            <Badge containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
            >
              <Text>Current Balance:</Text>
              <Text>{this.state.Balance}</Text>
            </Badge>
            <Button
              onPress={() => {
                this.props.navigation.navigate('newGoal');
                console.log('Button Pressed in Goals');
              }}
              buttonStyle={{
                backgroundColor: 'rgba(92, 99,216, 1)',
                width: 300,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
              }}
              title="New Goal"
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default Goals;
