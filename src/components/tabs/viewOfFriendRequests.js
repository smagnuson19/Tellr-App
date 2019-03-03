import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors, dimensions } from '../../styling/base';
import RequestCard from './requestCard';
import { postFriendApprove, postNotificationsAlt } from '../../actions/index';

import Style from '../../styling/Style';

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
          <Text style={pageStyle.noRequestsText}>
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
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <Text style={Style.headerText}>
            {'Friend Requests'}
          </Text>
          <ScrollView style={pageStyle.main}>
            {this.checkEmptyRequests()}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  noRequestsText: {
    fontSize: fonts.smmd,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.secondary,
    paddingHorizontal: 15,
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

export default connect(mapStateToProps, { postFriendApprove, postNotificationsAlt })(ViewOfFriendRequests);
