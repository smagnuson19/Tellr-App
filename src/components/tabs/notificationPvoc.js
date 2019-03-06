import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { fonts, colors } from '../../styling/base';


class NotificationPvoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // action is boolean deny or accept
  buttonPress(action) {
    this.props.onPress(
      action,
      this.props.entry.notificationName,
      this.props.entry.email,
      this.props.entry.senderEmail,
      this.props.entry.priority,
      this.props.entry.value,
      this.props.entry.description,
      this.props.entry.redeemed,
      this.props.entry.notificationType,
      this.props.entry.deadline,
    );
  }

  // Need to implement
  // return null if its a goal other wise return date for task
  displayDueDate() {
    if (this.props.entry.verified === true) {
      return (
        <View style={pageStyle.descriptionContainer}>
          <Text style={pageStyle.deadlineText}>
            {'Completed on: '}
            {this.props.entry.timeCompleted}
          </Text>
        </View>
      );
    } else if (this.props.entry.verified === false) {
      return (
        <View style={pageStyle.descriptionContainer}>
          <Text style={pageStyle.deadlineText}>
            {'Due: '}
            {this.props.entry.deadline}
          </Text>
        </View>
      );
    } else if (this.props.entry.redeemed === true) {
      return (
        <View style={pageStyle.descriptionContainer}>
          <Text style={pageStyle.deadlineText}>
            {'Redeemed on: '}
            {this.props.entry.dateRedeemed}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    // // grabbing only the notifcations we want

    return (
      <Card
        containerStyle={pageStyle.cardContainer}
        wrapperStyle={pageStyle.wrapperStyle}
      >
        <View style={pageStyle.headerView}>
          <View style={pageStyle.titleFiller}>
            <Text style={pageStyle.titleStyle}>
              {this.props.entry.notificationName}
              {this.props.entry.name}
            </Text>
          </View>
          <View style={pageStyle.priceFiller}>
            <Text style={pageStyle.price}>
          $
              {this.props.entry.value}
            </Text>
          </View>
        </View>
        <Divider style={pageStyle.divider} />
        <View style={pageStyle.descriptionContainer}>
          <Text style={pageStyle.descriptionText}>
            {this.props.entry.description}
          </Text>
        </View>
        {this.displayDueDate()}
      </Card>
    );
  }
}

const pageStyle = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },

  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pageFiller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 6,
  },

  divider: {
    backgroundColor: colors.black,
    height: 2,
    marginTop: 6,
    marginBottom: 6,

  },

  titleFiller: {
    width: '80%',
    justifyContent: 'flex-start',
  },
  priceFiller: {
    flex: 1,
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },

  titleStyle: {

    color: colors.primary,
    // padding: 1,
    textAlign: 'left',
    fontSize: fonts.md,
    // textAlign: 'center',

  },
  priceStyle: {
    textAlign: 'right',
  },

  wrapperStyle: {
    padding: 0,
    margin: 0,
    width: '100%',
  },

  descriptionContainer: {
    // backgroundColor: 'rgb(216, 217, 216)',
    padding: 3,
    marginLeft: 3,
    marginRight: 3,
  },

  descriptionText: {
    textAlign: 'center',
    fontSize: fonts.smmd,
  },

  deadlineContainerRed: {
    backgroundColor: colors.red,
    padding: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  deadlineText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  deadlineTextRed: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.red,
  },

  actionBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 6,
  },

  checkButton: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },

  text: {
    width: 70,
    margin: 10,
    textAlign: 'center',
  },

  noGoals: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  noGoalsText: {
    fontSize: fonts.md,
    color: '#fff',
  },

  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  senderName: {
    textAlign: 'center',
    flex: 1,
    paddingLeft: 3,
    paddingTop: 3,
  },

});

export default NotificationPvoc;
