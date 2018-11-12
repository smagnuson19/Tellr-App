import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
// import {
//   Button, FormInput,
// } from 'react-native-elements';
import {
  Button,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
// import newGoal from '../newGoal';

const ROOT_URL = 'http://localhost:5000/api';

// const API_KEY = '';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  displayGoals() {
    AsyncStorage.getItem('emailID').then((value) => {
      this.setState({ email: value });
    }).done();
    axios.get(`${ROOT_URL}/goals/${this.state.email}`).then((response) => {
      // make a list of the parent's children
      // const goalList = response.data;
      // console.log('goalList ${goalList}');
    });
    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate('newGoal');
          console.log('Button Pressed in Goals');
        }}
        title="New Goal"
      />);
  }

  submitgoals() {
    const payLoad = {
      goalsName: this.state.goalsName,
      goalsDeadline: this.state.goalsDeadline,
      child: this.state.child,
      goalsDescription: this.state.goalsDescription,
      reward: this.state.reward,
    };

    axios.post(`${ROOT_URL}`, { payLoad })
      .then((response) => {
        console.log(response.data);
      });

    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  displayAdditionalFields(userType) {
    if (userType !== 'child') {
      console.log('Not a child');
      return (<View />);
    } else {
      return (
        <Button
          onPress={() => {
            this.props.navigation.navigate('newGoal');
            console.log('Button Pressed in Goals');
          }}
          title="New Goal"
        />
      );
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>Goals!</Text>
          </View>
          {this.displayGoals()}
          {this.displayAdditionalFields('child')}
        </LinearGradient>
      </View>
    );
  }
}


export default Goals;
