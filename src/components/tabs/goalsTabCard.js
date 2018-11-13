import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

// import Style from '../../styling/Style';
// import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors } from '../../styling/base';
import Style from '../../styling/Style';

class GoalsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // action is boolean deny or accept
  buttonPress(action) {
    this.props.onPress(action,
      this.props.goals.goalValue,
      this.props.goals.App,
      this.props.goals.goalName);
    // action is boolean deny or accept
  }

  displayCorrectItems() {
    return (
      <View style={pageStyle.actionBar}>
        <TouchableOpacity style={pageStyle.checkButton}
          onPress={() => this.buttonPress()}
        >
          <View style={pageStyle.buttonView}>

            <Text style={pageStyle.text}>
          Redeem!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const progString0 = 'Progress: ';
    const progString1 = '%';
    const progress0 = parseFloat(this.props.balance) / parseFloat(this.props.goals.goalValue);
    const progress = Math.trunc(Math.min(progress0 * 100, 100));
    const progressString = `${progString0} ${progress} ${progString1}`;
    let style = pageStyle.cardContainer;
    if (this.props.goals.redeemed === true) {
      style = pageStyle.redeemedContainer;
    }
    return (
      <Card
        containerStyle={style}
        wrapperStyle={pageStyle.wrapperStyle}
      >
        <View style={pageStyle.headerView}>
          <View style={pageStyle.pageFiller} />
          <View style={pageStyle.titleFiller}>
            <Text style={pageStyle.titleStyle}>
              {this.props.goals.goalName}
            </Text>
          </View>
          <View style={pageStyle.priceFiller}>
            <Text style={pageStyle.price}>
          $
              {this.props.goals.goalValue}

            </Text>
          </View>
        </View>
        <Divider style={pageStyle.divider} />
        <View style={pageStyle.descriptionContainer}>
          <Text style={pageStyle.descriptionText}>
            {this.props.goals.goalDescription}

          </Text>
          <Text style={Style.headerText}>{progressString}</Text>
          <Image
            style={{
              width: 150, height: 200, alignSelf: 'center', opacity: Math.min(progress0 + 0.2, 1),
            }}
            source={{ uri: this.props.goals.goalImage }}
          />
        </View>
        {this.displayCorrectItems()}
      </Card>
    );
  }
}

const pageStyle = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
  },

  redeemedContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgb(0, 100, 0)',
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

  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

});

export default GoalsCard;