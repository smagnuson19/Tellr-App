import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

// import Style from '../../styling/Style';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors } from '../../styling/base';


// can take entry(listOfNotificaitons)
// notificationTypePassed - what type of notificaiton you want to display
// based on what is given in entry
// displayButton (optional) your dont want to displayanython
// complete= (optional) whether you want to display a task has been completed

class NotificationCard extends Component {
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

  displaySenderName() {
    if (this.props.entry.senderName !== '' || this.props.entry.senderName !== null) {
      // PARENT: money requested Style: Requested by:
      // recently completed goals & verify goals: Set by:
      // verify chore completion: Completed by:
      // not completed goals: To be completed by:
      // CHILD: chores: Created by:
      if (this.props.entry.notificationType === 'Redemption') {
        return (
          <View>
            <Text style={pageStyle.senderName}>
              Requested by:
              {' '}
              {this.props.entry.senderName}
            </Text>
          </View>
        );
      } else if (this.props.entry.notificationType === 'goalComplete' || this.props.entry.notificationType === 'newGoal') {
        return (
          <View>
            <Text style={pageStyle.senderName}>
              Set by:
              {' '}
              {this.props.entry.senderName}
            </Text>
          </View>
        );
      } else if (this.props.entry.notificationType === 'taskComplete') {
        return (
          <View>
            <Text style={pageStyle.senderName}>
              Completed by:
              {' '}
              {this.props.entry.senderName}
            </Text>
          </View>
        );
      } else if (this.props.entry.notificationType === 'newTask' || this.props.entry.notificationType === 'taskUnverified') {
        return (
          <View>
            <Text style={pageStyle.senderName}>
              Created by:
              {' '}
              {this.props.entry.senderName}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={pageStyle.senderName}>
              {this.props.entry.senderName}
            </Text>
          </View>
        );
      }
    } else {
      return (null);
    }
  }

  displaySecond(item) {
    if (item === 'Deny') {
      return (
        <TouchableOpacity style={pageStyle.checkButton}
          onPress={() => this.buttonPress(item)}
        >
          <View style={pageStyle.buttonView}>
            <Ionicons name="close"
              size={20}
              color="rgb(240, 64, 64)"
            />
            <Text style={pageStyle.text}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (null);// we dont want to display anything
    }
  }

  displayCorrectItems() {
    // maps to notificationTypePassed
    const buttonMap = {
      newGoal: ['Accept', 'Deny'], // A child created a new goal
      goalComplete: 'Dismiss', // shows that Child has completed goal on parent
      taskComplete: ['Accept', 'Deny'], // Parent verify task complete
      newTask: ['Complete', 'Ignore'], // child newTask
      taskUnverified: ['Complete', 'Ignore'], // child newTask
      Redemption: ['Complete', ''],
    };

    // the goal is complete so we want to return nothing
    if (this.props.displayButtons === false) {
      return (null);
    }

    // Declaring the buttons
    const type = this.props.entry.notificationType;
    const buttons = buttonMap[type];


    // We want to display dismiss
    if (buttons === 'Dismiss') {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress('Dismiss')}
          >
            <View style={pageStyle.buttonView}>

              <Text style={pageStyle.text}>
      Dismiss
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress(buttons[0])}
          >
            <View style={pageStyle.buttonView}>
              <Ionicons name="check"
                size={20}
                color="rgb(112, 214, 76)"
              />
              <Text style={pageStyle.text}>
                {buttons[0]}
              </Text>
            </View>
          </TouchableOpacity>
          {this.displaySecond(buttons[1])}
        </View>
      );
    }
  }


  // Need to implement
  // return null if its a goal other wise return date for task
  displayDueDate() {
    if (this.props.entry.notificationType === 'newTask' || this.props.entry.notificationType === 'taskComplete'
     || this.props.entry.notificationType === 'taskUnverified') {
      if (this.props.entry.displayRed === true) {
        return (
          <View style={pageStyle.deadlineContainerRed}>
            <Text style={pageStyle.deadlineText}>
              {'Due: '}
              {this.props.entry.deadline}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={pageStyle.descriptionContainer}>
            <Text style={pageStyle.deadlineText}>
              {'Due: '}
              {this.props.entry.deadline}
            </Text>
          </View>
        );
      }
    // } else if (this.props.entry.notificationType === 'goalComplete') {
    //   console.log('klsjf;alksfklsdfj');
    //   console.log(this.props.entry);
    //   return (
    //     <View style={pageStyle.descriptionContainer}>
    //       <Text style={pageStyle.deadlineText}>
    //         {'Completed on: '}
    //         {this.props.entry.deadline}
    //       </Text>
    //     </View>
    //   );
    } else {
      return null;
    }
  }

  render() {
    // // grabbing only the notifcations we want
    if (this.props.entry.notificationType === this.props.notificationTypePassed) {
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
          {this.displaySenderName()}
          {this.displayCorrectItems()}
        </Card>
      );
    } else {
      return (
        null
      );
    }
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

export default NotificationCard;
