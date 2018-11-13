import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, AsyncStorage, ScrollView,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Badge, Button, Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import GoalsCard from './goalsTabCard';
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
      // loading: true,
      Goals: '',
      Balance: '',
      senderEmail: '',
    };
    this.redeemAction = this.redeemAction.bind(this);
  }

  componentWillMount() {
    console.log('Fetching info');
    AsyncStorage.multiGet(['emailID', 'balanceID'], (err, result) => {
      const API_KEY_USERS = result[0][1].slice(1, -1);
      const BALANCE = result[1][1];
      this.setState({ senderEmail: API_KEY_USERS });
      this.setState({ Balance: BALANCE });
    }).catch((error) => {
      console.log('ERROR in NewGoal');
    });
    // function sleep(time) {
    //   return new Promise(resolve => setTimeout(resolve, time));
    // }
    // sleep(800).then(() => {
    // // Do something after the sleep!
    //   console.log('Getting Goals after sleep');
    // });
  }

  fetchGoals() {
    console.log(this.state.senderEmail);
    return axios.get(`${ROOT_URL}/goals/${this.state.senderEmail}`).then((response) => {
      // make a list of the parent's children
      console.log('Dealing With Response');
      const gList = response.data;
      const goalList = [];
      // loop through each kid and make an object for them with FirstName, Email
      Object.keys(gList).forEach((key) => {
        if (gList[key].approved !== 30 && gList[key].redeemed === false) {
          goalList.push({
            key,
            goalName: gList[key].name,
            goalValue: gList[key].value,
            goalDescription: gList[key].description,
            goalImage: gList[key].image,
            // goalProgress: (parseFloat(this.state.balance)/parseFloat(gList[key].value));
          });
        } else {
          console.log('Not Approved Goal');
        }// end if
      });// end for each
      this.setState({ Goals: goalList });
      console.log('Got Goals');
    }).catch((error) => {
      console.log('ERROR in getGoals');
    });
  }

  redeemAction(action) {
    console.log('Button Pressed to redeem');
  }

  render() {
    const balanceString0 = 'Your Balance: $';
    const balanceString = `${balanceString0} ${this.state.Balance}`;
    if (typeof this.state.Goals === 'undefined' || this.state.Goals.length === 0) {
      console.log('No');
      this.fetchGoals();
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
            <View style={Style.displayContainer}>
              <Text style={Style.headerText}>Loading, Please wait for goals</Text>
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      console.log('Yes');
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
            <View style={Style.displayContainer}>
              <Text style={Style.headerText}>Goals!</Text>
              <ScrollView>
                <Badge containerStyle={{
                  backgroundColor: 'white',
                  width: 375,
                }}
                >
                  <Text style={Style.headerText}>{balanceString}</Text>
                </Badge>
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 35 }} />
                { this.state.Goals.map(goal => (
                  <View key={goal.id}>
                    <GoalsCard goals={goal}
                      // completed
                      balance={this.state.Balance}
                      onPress={this.redeemAction}
                    />

                  </View>
                ))}
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 35 }} />
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('newGoal');
                    console.log('Button Pressed in Goals');
                  }}
                  buttonStyle={{
                    backgroundColor: 'rgba(92, 99,216, 1)',
                    width: 300,
                    height: 45,
                    alignSelf: 'center',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 5,
                  }}
                  title="New Goal"
                />
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 105 }} />
              </ScrollView>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}


export default Goals;
