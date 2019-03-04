import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView, Alert, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';

import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import {
  Card, Button, Divider, ButtonGroup,
} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import GoalsCard from './goalsTabCard';
import { postUpdateBalance, postGoalRedeem, fetchGoals } from '../../actions';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors, dimensions, fonts } from '../../styling/base';

// Import the react-native-sound module
const Sound = require('react-native-sound');

let unlock;
// let unlock = {
//   title: 'unlock',
//   isRequire: true,
//   url: require('../../media/unlock-achievement.wav'),
// };

class Goals extends Component {
  animatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {

    };
    this.redeemAction = this.redeemAction.bind(this);
  }

  componentWillMount() {
    // Enable playback in silence mode
    Sound.setCategory('Playback');
    unlock = new Sound(require('../../media/unlock-achievement.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('Loaded sound');
      // loaded successfully
    });
  }

  renderOverlay = () => {
    const imageStyles = [
      {
        position: 'absolute',
        zIndex: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        left: Math.random() * 500 - 250,
        right: Math.random() * 500 - 250,
        top: Math.random() * 1000 - 500,
        bottom: Math.random() * 1000 - 500,
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.7],
            }),
          },
        ],
      },
    ];
    return (
      <View>
        <Animated.Image
          source={require('../../media/bill.png')}
          style={imageStyles}
        />
      </View>
    );
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

      Animated.sequence([
        Animated.spring(this.animatedValue, { toValue: 1, useNativeDriver: false }),
        Animated.spring(this.animatedValue, { toValue: 0, userNativeDriver: false }),
      ]).start(() => {
        this.props.postGoalRedeem(payLoad).then((res) => {
          console.log(`THIS IS THE EMAIL ${this.props}`);
          this.props.navigation.dispatch(resetAction);
          return this.props.fetchGoals(this.props.user.email);
        });
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

  renderFooter() {
    return (
      <View>
        <ButtonGroup
          onPress={() => this.props.navigation.navigate('redeemedGoals')}
          buttons={['View Redeemed Goals']}
          containerStyle={{ width: dimensions.fullWidth, backgroundColor: colors.secondary, borderColor: 'black' }}
          textStyle={{ fontFamily: fonts.secondary, color: colors.black }}
          underlayColor={colors.secondary}
        />
      </View>
    );
  }

  render() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    console.log(this.props); const balanceString0 = 'Your Balance: $';
    const balanceString = `${balanceString0}${this.props.user.balance}`;
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
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              {this.renderOverlay()}
              <View style={Style.contentWrapper}>
                <Text style={Style.headerText}>Goals!</Text>
                <ScrollView>
                  <Card title={balanceString}>
                    <Text style={{ marginBottom: 10 }}>
               Either spend your balance on the goals below or redeem it instantly by pressing the button
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Button
                        color="black"
                        buttonStyle={{
                          backgroundColor: colors.linearGradientTop,
                          width: 120,
                          height: 45,
                          alignSelf: 'center',
                          borderColor: 'transparent',
                          borderWidth: 0,
                          borderRadius: 5,
                        }}
                      //   icon={(
                      //     <Icon
                      //       name="arrow-right"
                      //       color="white"
                      //     />
                      // )}
                        title="New Goal"
                  // icon={<Icon name="money-bill-wave" color={colors.logoGreen} />}
                        onPress={() => {
                          this.props.navigation.navigate('newGoal');
                          console.log('Button Pressed in Goals');
                        }}
                      />
                      <Button
                        color="black"
                        buttonStyle={{
                          backgroundColor: colors.linearGradientBottom,
                          width: 125,
                          height: 45,
                          alignSelf: 'center',
                          borderColor: 'transparent',
                          borderWidth: 0,
                          borderRadius: 5,
                        }}
                      //   icon={(
                      //     <Icon
                      //       name="arrow-right"
                      //       color="white"
                      //     />
                      // )}
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
                  <Divider style={{ backgroundColor: colors.clear, height: 50 }} />
                </ScrollView>
                {this.renderFooter()}
                <Divider style={{ backgroundColor: colors.clear, height: verticalScale(60) }} />
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
