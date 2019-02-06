import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors } from '../../styling/base';


// can take entry(listOfNotificaitons)
// notificationTypePassed - what type of notificaiton you want to display
// based on what is given in entry
// displayButton (optional) your dont want to displayanython
// complete= (optional) whether you want to display a task has been completed

class RequestCard extends Component {
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
      this.props.entry.notificationType,
    );
  }

  displaySecond(item) {
    if (item === 'Ignore') {
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
      addRequest: ['Accept', 'Ignore'], // Parent verify task complete
    };

    // the request is complete so we want to return nothing
    if (this.props.displayButtons === false) {
      return (null);
    }

    // Declaring the buttons
    const type = this.props.entry.notificationType;
    const buttons = buttonMap[type];

    // We want to display ignore
    if (buttons === 'Ignore') {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress('Ignore')}
          >
            <View style={pageStyle.buttonView}>
              <Text style={pageStyle.text}>
      Ignore
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

  render() {
    // // grabbing only the notifcations we want
    if (this.props.entry.notificationType === 'addRequest') {
      return (
        <Card
          containerStyle={pageStyle.cardContainer}
          wrapperStyle={pageStyle.wrapperStyle}
        >
          <View style={pageStyle.headerView}>
            <Text style={pageStyle.titleStyle}>
              {this.props.entry.notificationName}
            </Text>
          </View>
          <Divider style={pageStyle.divider} />
          <View style={pageStyle.descriptionContainer}>
            <Text style={pageStyle.descriptionText}>
              {this.props.entry.senderEmail}
            </Text>
          </View>
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
    borderRadius: 8,
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
  titleStyle: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: fonts.md,
  },
  wrapperStyle: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  descriptionContainer: {
    // backgroundColor: 'rgb(216, 217, 216)',
    padding: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  descriptionText: {
    textAlign: 'center',
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
});

export default RequestCard;
