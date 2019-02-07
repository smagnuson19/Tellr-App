import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors, dimensions } from '../../styling/base';
import RequestCard from './requestCard';
import { postFriendApprove } from '../../actions/index';

import Style from '../../styling/Style';

// TODO: make buttons of accept and ignore work

class ViewOfFriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderAction = this.renderAction.bind(this);
  }

  checkEmptyRequests() {
    let empty = true;
    if (this.props.notifications === null) {
      empty = true;
    } else {
      for (let i = 0; i < this.props.notifications.length; i++) {
        if (this.props.notifications[i].notificationType === 'addRequest') {
          empty = false;
        }
      }
    }
    if (empty === false) {
      return (
        <View style={pageStyle.sectionContainer}>
          {this.props.notifications.map(component => (
            <View key={component.notificationName}>
              <RequestCard entry={component}
                notificationTypePassed="addRequest"
                onPress={this.renderAction}
              />
            </View>
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

  renderAction(action, taskName, sEmail, cEmail, priority, description, redeemed, notificationType) {
    // child marked task complete now Verify
    if (notificationType === 'addRequest') {
      const actionMap = {
        Accept: 1,
        Ignore: -1,
      };
      // create the payload
      if (actionMap[action] === 1) {
        const payLoad = {
          email: sEmail,
          friend: cEmail,
        };
        console.log(payLoad);
        this.props.postFriendApprove(payLoad, priority);
      } else {
        console.log('request denied');
      }
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
              {this.checkEmptyRequests()}
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
    account: state.user.info,
    notifications: state.user.notifications,
  });

export default connect(mapStateToProps, { postFriendApprove })(ViewOfFriendRequests);
