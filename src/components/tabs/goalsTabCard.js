import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

// import Style from '../../styling/Style';
// import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors } from '../../styling/base';
// import Style from '../../styling/Style';

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
      this.props.goals.goalName,
      this.props.goals.redeemed);
    // action is boolean deny or accept
  }

  displayCorrectItems(redeemed) {
    if (redeemed !== true) {
      return (
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.redeemButton}
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
    } else {
      return null;
      // return (
      //   <View style={pageStyle.actionBar}>
      //     <TouchableOpacity style={pageStyle.greyButton}
      //       onPress={() => this.buttonPress()}
      //     >
      //       <View style={pageStyle.buttonView}>
      //         <Text style={pageStyle.text}>
      //     Done!
      //         </Text>
      //       </View>
      //     </TouchableOpacity>
      //   </View>
      // );
    }
  }

  render() {
    const progString0 = 'Progress: ';
    const progString1 = '%';
    console.log(this.props.goals.goalImage);
    let progress0 = parseFloat(this.props.balance) / parseFloat(this.props.goals.goalValue);
    if (this.props.goals.redeemed === true) {
      progress0 = 1;
    }
    if (Number.isNaN(progress0)) {
      progress0 = 0;
    }
    const progress = Math.trunc(Math.min(progress0 * 100, 100));
    const progressString = `${progString0} ${progress} ${progString1}`;
    const style = pageStyle.cardContainer;
    if (this.props.goals.redeemed === true) {
      return null;
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
          <Text style={pageStyle.headerText}>{progressString}</Text>
          <Image
            style={{
              width: 150 * 1.3, height: 200 * 1.3, alignSelf: 'center', opacity: Math.min(progress0 + 0.2, 1),
            }}
            source={{ uri: this.props.goals.goalImage }}
          />
        </View>
        {this.displayCorrectItems(this.props.goals.redeemed)}
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
  priceFiller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 6,
  },
  headerText: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.secondary,
    fontSize: fonts.lg,
    color: colors.headerText,
    marginTop: '3%',
    marginBottom: '3%',
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

  redeemButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,

  },

  greyButton: {
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

  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

});

export default GoalsCard;
