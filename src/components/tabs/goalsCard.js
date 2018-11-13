import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

// import Style from '../../styling/Style';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors } from '../../styling/base';

class GoalsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // action is boolean deny or accept
  buttonPress(action) {
    this.props.onPress(
      action,
      this.props.goals.notificationName,
      this.props.goals.email,
      this.props.goals.senderEmail,
      this.props.goals.priority,
      this.props.goals.redeemed,
    );
  }

  displaySenderName() {
    if (this.props.goals.senderName !== '' || this.props.goals.senderName !== null) {
      return (
        <View style={pageStyle.pageFiller}>
          <Text>
            {this.props.goals.senderName}
          </Text>
        </View>
      );
    } else {
      return ('');
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
    let names = [];
    if (this.props.nothing) {
      return (null);
    }
    if (this.props.typeChore) {
      names = ['Complete', 'Ignore'];
    } else {
      names = ['Accept', 'Deny'];
    }
    if (this.props.completed === false) {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress(names[0])}
          >
            <View style={pageStyle.buttonView}>
              <Ionicons name="check"
                size={20}
                color="rgb(112, 214, 76)"
              />
              <Text style={pageStyle.text}>
                {names[0]}
              </Text>
            </View>
          </TouchableOpacity>
          {this.displaySecond(names[1])}
        </View>
      );
    } else {
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
    }
  }

  // Need to implement
  displayDueDate() {
    return (null);
  }

  render() {
    if (this.props.goals.notificationType === this.props.notificationTypePassed) {
      return (
        <Card
          containerStyle={pageStyle.cardContainer}
          wrapperStyle={pageStyle.wrapperStyle}
        >
          <View style={pageStyle.headerView}>
            {this.displaySenderName()}
            <View style={pageStyle.titleFiller}>
              <Text style={pageStyle.titleStyle}>
                {this.props.goals.notificationName}
                {this.props.goals.name}
              </Text>
            </View>
            <View style={pageStyle.priceFiller}>
              <Text style={pageStyle.price}>
          $
                {this.props.goals.value}

              </Text>
            </View>
          </View>
          <Divider style={pageStyle.divider} />
          <View style={pageStyle.descriptionContainer}>
            <Text style={pageStyle.descriptionText}>
              {this.displayDueDate()}
              {this.props.goals.description}

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
    backgroundColor: 'rgb(0, 0, 0)',
    height: 2,
    marginTop: 6,
    marginBottom: 6,

  },
  priceFiller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 6,
  },

  titleStyle: {
    color: colors.primary,
    // padding: 1,
    textAlign: 'center',
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
    backgroundColor: 'rgba(213, 213, 213, 0.76)',
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

export default GoalsCard;
