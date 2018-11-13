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
    );
  }

  displayCorrectItems() {
    if (this.props.completed === false) {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress(true)}
          >
            <View style={pageStyle.buttonView}>
              <Ionicons name="check"
                size={20}
                color="rgb(112, 214, 76)"
              />
              <Text style={pageStyle.text}>
          Accept
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress(false)}
          >
            <View style={pageStyle.buttonView}>
              <Ionicons name="close"
                size={20}
                color="rgb(240, 64, 64)"
              />
              <Text style={pageStyle.text}>
          Deny
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress(false)}
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

  render() {
    if (this.props.goals.notificationType === this.props.notificationTypePassed) {
      return (
        <Card
          containerStyle={pageStyle.cardContainer}
          wrapperStyle={pageStyle.wrapperStyle}
        >
          <View style={pageStyle.headerView}>
            <View style={pageStyle.pageFiller} />
            <View style={pageStyle.titleFiller}>
              <Text style={pageStyle.titleStyle}>
                {this.props.goals.notificationName}
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
              {this.props.goals.description}

            </Text>
          </View>
          {this.displayCorrectItems()}
        </Card>
      );
    } else {
      return (
        <View style={pageStyle.noGoals}>
          <Text style={pageStyle.noGoalsText}> No goals yet!</Text>
        </View>
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
