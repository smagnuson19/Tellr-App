import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, AsyncStorage, ScrollView, Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import {
  Card, Button, Divider, Icon,
} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
// import { NavigationActions } from 'react-navigation';

import Style from '../../styling/Style';
import GoalsCard from './goalsTabCard';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors } from '../../styling/base';

// const API_KEY = '';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// Import the react-native-sound module
const Sound = require('react-native-sound');

let unlock;


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
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    unlock = new Sound('unlock-achievement.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
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
        if (gList[key].approved === 1) {
          goalList.unshift({
            key,
            goalName: gList[key].name,
            goalValue: gList[key].value,
            goalDescription: gList[key].description,
            goalImage: gList[key].image,
            App: gList[key].approved,
            redeemed: gList[key].redeemed,
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
          goalValue: 0,
          App: 1,
          redeemed: true,
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

  redeemAction(action, gValue, gApproved, gName, gRedeemed) {
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
    if (this.state.Balance >= gValue && gApproved === 1 && gRedeemed === false) {
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
      //  play redepton sound
      // Play the sound with an onEnd callback
      unlock.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          unlock.reset();
        }
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
    const balanceString0 = 'Your Balance is:\n$';
    const balanceString = `${balanceString0} ${this.state.Balance}`;
    if (this.state.Goals.length === 0) {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              <Text style={Style.headerText}>Loading Goals</Text>
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
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              <Text style={Style.headerText}>Goals!</Text>
              <ScrollView>
                <Card title={balanceString}>
                  <Text style={{ marginBottom: 10 }}>
                 Either spend your balance on the goals below or redeem it instantly by pressing the button
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      color="purple"
                      buttonStyle={{
                        backgroundColor: colors.red,
                        width: 120,
                        height: 45,
                        alignSelf: 'center',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                      icon={(
                        <Icon
                          name="arrow-right"
                          color="white"
                        />
                        )}
                      title="New Goal"
                    // icon={<Icon name="money-bill-wave" color={colors.logoGreen} />}
                      onPress={() => {
                        this.props.navigation.navigate('newGoal');
                        console.log('Button Pressed in Goals');
                      }}
                    />
                    <Button
                      color="purple"
                      buttonStyle={{
                        backgroundColor: colors.logoGreen,
                        width: 120,
                        height: 45,
                        alignSelf: 'center',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                      icon={(
                        <Icon
                          name="arrow-right"
                          color="white"
                        />
                        )}
                      title="Redeem!"
                      // icon={<Icon name="money-bill-wave" color={colors.logoGreen} />}
                      onPress={() => {
                        this.props.navigation.navigate('redeemMoney');
                        console.log('Nativigating to RedeemMoney');
                      }}
                    />
                  </View>
                </Card>
                <Divider style={{ backgroundColor: colors.clear, height: 35 }} />
                {this.renderGoals()}
                <Divider style={{ backgroundColor: colors.clear, height: 105 }} />
              </ScrollView>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}


export default Goals;
