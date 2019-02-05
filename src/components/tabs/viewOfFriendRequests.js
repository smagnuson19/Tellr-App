import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors, dimensions } from '../../styling/base';
import NotificationCard from './notificationCard';

import Style from '../../styling/Style';


// const API_KEY = '';

class ViewOfFriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // TODO: put requests into child account
  renderRequests() {
    // if (this.props.requests.length > 0) {
    if (false) {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
            Chores
          </Text>
          { this.state.childAccount.tasks.map(goal => (

            <NotificationCard
              key={goal.name}
              entry={goal}
              displayButtons={false}
            />
          ))}
        </View>
      );
    } else {
      return (
        <View style={pageStyle.sectionContainer}>
          <Text> No requests to show! </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={pageStyle.homeWrapper}>
            <View style={pageStyle.topContainer}>
              <Text style={pageStyle.headerText}>
                {'Friend Requests'}
              </Text>
            </View>
            <ScrollView style={pageStyle.main}>
              {this.renderRequests()}
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  homeWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },
  topContainer: {
    width: dimensions.fullWidth,
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 0,
  },
  main: {
    flex: 1,
    marginBottom: 90,
  },
  headerText: {
    paddingTop: 80,
    marginLeft: 15,
    alignContent: 'center',
    fontSize: fonts.lg,
    color: colors.black,
  },
  sectionContainer: {
    marginBottom: 15,
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },
});


const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
  });


export default connect(mapStateToProps, {

})(ViewOfFriendRequests);
