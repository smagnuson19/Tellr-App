import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Badge, Button, Divider } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import GoalsCard from './goalsTabCard';
import { postUpdateBalance, postGoalRedeem, fetchGoals } from '../../actions';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors } from '../../styling/base';

// Import the react-native-sound module
const Sound = require('react-native-sound');

let unlock;

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.redeemAction = this.redeemAction.bind(this);
  }

  componentWillMount() {
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
    if (this.props.user.balance >= gValue && gApproved === 1 && gRedeemed === false) {
      // goal is good for redemption
      const payLoad = {
        email: this.props.user.email,
        goalName: gName,
      };

      this.props.postGoalRedeem(payLoad).then((res) => {
        console.log(`THIS IS THE EMAIL ${this.props}`);
        this.props.navigation.dispatch(resetAction);
        return this.props.fetchGoals(this.props.user.email);
      });
      // this.props.fetchGoals(this.props.user.email);


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
    } else if (this.props.user.balance < gValue) {
      Alert.alert('You don\'t have the money! Complete a task to make more');
      console.log('ERROR: reward money greater than balance money');
    }
    // this.props.navigation.navigate('Home');
  }

  renderGoals() {
    if (this.props.goals !== null && this.props.user !== null) {
      console.log(this.props.goals);
      if (this.props.goals.length > 0) {
        return (
          this.props.goals.map(goal => (
            <View key={goal.id}>
              <GoalsCard goals={goal}
                // completed
                balance={this.props.user.balance}
                onPress={this.redeemAction}
              />
            </View>
          ))
        );
      }
    }
    return (<Text style={Style.headerText}>No Goals Yet</Text>);
  }

  render() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    console.log(this.props); const balanceString0 = 'Your Balance: $';
    const balanceString = `${balanceString0} ${this.props.user.balance}`;
    if (this.props.goals !== null) {
      if (this.props.goals.length === 0) {
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
        });
        return (
          <View style={Style.rootContainer}>
            <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
              <View style={Style.contentWrapper}>
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
                  <Divider style={{ backgroundColor: colors.clear, height: 35 }} />
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('newGoal');
                      console.log('Button Pressed in Goals');
                    }}
                    buttonStyle={{
                      backgroundColor: colors.red,
                      width: 300,
                      height: 45,
                      alignSelf: 'center',
                      borderColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 5,
                    }}
                    title="New Goal"
                  />
                  <Divider style={{ backgroundColor: colors.clear, height: 35 }} />
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('redeemMoney');
                      console.log('Nativigating to RedeemMoney');
                    }}
                    buttonStyle={{
                      backgroundColor: colors.money,
                      width: 300,
                      height: 45,
                      alignSelf: 'center',
                      borderColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 5,
                    }}
                    title="Redeem Money!"
                  />
                  <Divider style={{ backgroundColor: colors.clear, height: 35 }} />
                  {this.renderGoals()}
                  <Divider style={{ backgroundColor: colors.clear, height: 105 }} />
                </ScrollView>
              </View>
            </LinearGradient>
          </View>
        );
      }
    } else {
      return (null);
    }
  }
}


const mapStateToProps = state => (
  {
    goals: state.user.goals,
    user: state.user.info,
  });

export default connect(mapStateToProps, { postUpdateBalance, fetchGoals, postGoalRedeem })(Goals);
