import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
// import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import RedeemedGoalsCard from './redeemedGoalsTabCard';
import { fetchGoals } from '../../actions';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors } from '../../styling/base';

class redeemedGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderGoals() {
    if (this.props.goals !== null && this.props.user !== null) {
      console.log(this.props.goals);
      if (this.props.goals.length > 0) {
        return (
          this.props.goals.map(goal => (
            <View key={goal.id}>
              <RedeemedGoalsCard goals={goal} />
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
                <Text style={Style.headerText}>Redeemed Goals!</Text>
                <ScrollView>
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

export default connect(mapStateToProps, { fetchGoals })(redeemedGoals);
