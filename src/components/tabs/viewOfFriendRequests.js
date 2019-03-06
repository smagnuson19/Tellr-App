import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, dimensions } from '../../styling/base';
import RequestCard from './requestCard';
import {
  postFriendApprove, postNotificationsAlt, fetchKidFriends, fetchNotificationInfo,
} from '../../actions/index';
import { themeColors } from '../../styling/colorModes';

import Style from '../../styling/Style';

class ViewOfFriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };

    this.renderAction = this.renderAction.bind(this);
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  reloadApiData() {
    console.log('reloading api Data');
    // Do we want to update children info as well?
    this.props.fetchNotificationInfo(this.props.account.email);
    this.props.fetchKidFriends(this.props.account.email);
    // No longer fetching
    this.setState({ isFetching: false });
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Friend Requests </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Friend Requests </Text>
      );
    }
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
          <Text style={{
            fontSize: fonts.smmd,
            fontWeight: 'bold',
            color: themeColors.headerColor[this.props.mode],
            fontFamily: fonts.secondary,
            paddingHorizontal: 15,
          }}
          >
            {'No requests to show!'}
          </Text>
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
        const postData = {
          email: payLoad.email,
          priority,
        };
        this.props.postFriendApprove(payLoad, priority).then(() => { this.props.postNotificationsAlt(postData); });
      } else {
        const postDataDeny = {
          email: sEmail,
          priority,
        };
        console.log('request denied');
        this.props.postNotificationsAlt(postDataDeny);
      }
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          {this.headingDisplay()}
          <ScrollView style={pageStyle.main}
            refreshControl={(
              <RefreshControl
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                tintColor="#fff"
              />
          )}
          >
            {this.checkEmptyRequests()}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  // noRequestsText: {
  //   fontSize: fonts.smmd,
  //   fontWeight: 'bold',
  //   color: colors.white,
  //   fontFamily: fonts.secondary,
  //   paddingHorizontal: 15,
  // },
  main: {
    flex: 1,
    marginBottom: 90,
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
});


const mapStateToProps = state => (
  {
    account: state.user.info,
    notifications: state.user.notifications,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, {
  postFriendApprove, postNotificationsAlt, fetchKidFriends, fetchNotificationInfo,
})(ViewOfFriendRequests);
