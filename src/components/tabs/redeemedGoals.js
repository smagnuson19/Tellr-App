import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
// import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import RedeemedGoalsCard from './redeemedGoalsTabCard';
import { fetchGoals } from '../../actions';
import { themeColors } from '../../styling/colorModes';
import { colors } from '../../styling/base';

class redeemedGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }


  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Redeemed Goals! </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Redeemed Goals! </Text>
      );
    }
  }

  reloadApiData() {
    console.log('reloading api Data');
    // Do we want to update children info as well?
    this.props.fetchGoals(this.props.user.email);
    // No longer fetching
    this.setState({ isFetching: false });
  }

  renderGoals() {
    if (this.props.goals !== null && this.props.user !== null && this.props.goals.length > 0) {
      let empty = true;
      for (let i = 0; i < this.props.goals.length; i++) {
        if (this.props.goals[i].redeemed === true) {
          empty = false;
        }
      }

      if (empty) {
        const temp = [{
          goalName: 'No Redeemed Goals', goalDescription: 'Earn Money to Redeem Goals!', dateRedeemed: null, redeemed: true, goalImage: 'https://i.imgur.com/x1QZReP.png', goalValue: 0, App: 1,
        }];
        return (
          temp.map(goal => (
            <View key={goal.id}>
              <RedeemedGoalsCard goals={goal} />
            </View>
          ))
        );
      } else {
        return (
          this.props.goals.map(goal => (
            <View key={goal.id}>
              <RedeemedGoalsCard goals={goal} />
            </View>
          ))
        );
      }
    } else {
      return (<Text style={Style.headerText}>No Goals Yet</Text>);
    }
  }

  render() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    if (this.props.goals !== null) {
      if (this.props.goals.length === 0) {
        return (
          <View style={Style.rootContainer}>
            <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
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
            <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
              <View style={Style.contentWrapper}>
                {this.headingDisplay()}
                <ScrollView refreshControl={(
                  <RefreshControl
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    tintColor="#fff"
                  />
                )}
                >
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
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { fetchGoals })(redeemedGoals);
