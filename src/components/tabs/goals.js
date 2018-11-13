import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, AsyncStorage, ScrollView, Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Badge, Button, Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
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
      Goals: [],
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
      this.fetchGoals();
    }).catch((error) => {
      console.log('ERROR in NewGoal');
    });
    this.fetchAtLoad();
  }

  fetchAtLoad() {
    this.fetchGoals();
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
        console.log('Checking');
        if (gList[key].approved === 1 && gList[key].redeemed === false) {
          goalList.push({
            key,
            goalName: gList[key].name,
            goalValue: gList[key].value,
            goalDescription: gList[key].description,
            goalImage: gList[key].image,
            App: gList[key].approved,
            // goalProgress: (parseFloat(this.state.balance)/parseFloat(gList[key].value));
          });
        } else {
          console.log('Not Approved Goal');
        }// end else
      });// end for each
      if (this.state.Goals.length === 0) {
        goalList.push({
          goalName: 'This Is the Goal Tab',
          goalDescription: 'Add Goals Below or Redeem Completed Goals',
          goalImage: 'http://chittagongit.com//images/goal-icon/goal-icon-4.jpg',
          goalValue: 1,
        });
        console.log('Default Goal');
      }
      // if (typeof this.state.Goals !== 'undefined' && this.state.Goals.length === 0) {
      //   goalList.push({
      //     goalName: 'This Is the Goal Tab',
      //     goalDescription: 'Add Goals Below or Redeem Completed Goals',
      //     goalImage: '../media/Tellr-Logo.gif',
      //     goalValue: 1,
      //   });
      //   console.log('Default Goal');
      // }
      this.setState({ Goals: goalList });
    }).catch((error) => {
      console.log('ERROR in getGoals');
    });
  }

  redeemAction(action, gValue, gApproved, gName) {
    console.log(gValue);
    console.log(gApproved);
    console.log(gName);

    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'ChildTabBar' }),
      ],
    });
    if (this.state.Balance >= gValue && gApproved === 1) {
      // goal is good for redemption
      const payLoad = {
        email: this.state.senderEmail,
        goalName: gName,
      };
      console.log(payLoad);
      axios.post(`${ROOT_URL}/redeem`, { payLoad })
        .then((response) => {
          this.props.navigation.dispatch(resetAction);
        });
      AsyncStorage.setItem('balanceID', JSON.stringify(parseFloat(this.state.Balance) - parseFloat(gValue)), () => {
      });
    } else if (this.state.Balance < gValue) {
      Alert.alert('You don\'t have the money! Complete a task to make more');
      console.log('ERROR: reward money greater than balance money');
    }
    console.log('Handled redemption');
    // this.props.navigation.navigate('Home');
  }

  renderGoals() {
    console.log('Rendering Goals');
    if (typeof this.state.Goals !== 'undefined' && this.state.Goals.length > 0) {
      console.log('Rendering these Goals');
      return (
        this.state.Goals.map(goal => (
          <View key={goal.id}>
            <GoalsCard goals={goal}
              // completed
              balance={this.state.Balance}
              onPress={this.redeemAction}
            />
          </View>
        ))
      );
    }
    return (<Text style={Style.headerText}>No Goals Yet</Text>);
  }

  render() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    const balanceString0 = 'Your Balance: $';
    const balanceString = `${balanceString0} ${this.state.Balance}`;
    if (this.state.Goals.length === 0) {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
            <View style={Style.displayContainer}>
              <Text style={Style.headerText}>No Goals to Show</Text>
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      console.log('Yes');
      sleep(500).then(() => {
      // Do something after the sleep!
        console.log('Getting Goals after sleep');
      });
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
            <View style={Style.displayContainer}>
              <Text style={Style.headerText}>Goals!</Text>
              <ScrollView>
                <Badge containerStyle={{
                  backgroundColor: 'white',
                  width: 375,
                  flex: 2,
                }}
                >
                  <Text style={Style.headerText}>{balanceString}</Text>
                </Badge>
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 35 }} />
                {this.renderGoals()}
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
