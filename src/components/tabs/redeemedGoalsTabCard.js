import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

// import Style from '../../styling/Style';
// import Ionicons from 'react-native-vector-icons/AntDesign';
import { fonts, colors, dimensions } from '../../styling/base';
// import Style from '../../styling/Style';

class RedeemedGoalsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // // action is boolean deny or accept
  // buttonPress(action) {
  //   this.props.onPress(action,
  //     this.props.goals.goalValue,
  //     this.props.goals.App,
  //     this.props.goals.goalName,
  //     this.props.goals.redeemed);
  //   // action is boolean deny or accept
  // }

  displayCorrectItems(redeemed, date) {
    if (redeemed !== true) {
      return null;
    } else {
      let dateString;
      if (date !== null) {
        dateString = `Redeemed on ${date}`;
      } else {
        dateString = '';
      }
      return (
        <View style={pageStyle.buttonView}>
          <Text style={pageStyle.dateText}>
            {dateString}
          </Text>
        </View>
      );
    }
  }

  render() {
    if (this.props.goals.redeemed !== true) {
      return null;
    }
    const style = pageStyle.redeemedContainer;
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
          <Divider style={{ backgroundColor: colors.clear, height: 5 }} />
          <Image
            style={{
              width: 150 * 1.5, height: 200 * 1.5, alignSelf: 'center',
            }}
            source={{ uri: this.props.goals.goalImage }}
          />
        </View>
        {this.displayCorrectItems(this.props.goals.redeemed, this.props.goals.dateRedeemed)}
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
    backgroundColor: colors.babyBlue,
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
    width: dimensions.fullWidth * 0.8,
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
    fontWeight: '400',
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
    backgroundColor: colors.logoGreen,
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
  dateText: {
    width: dimensions.fullWidth * 0.7,
    margin: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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

export default RedeemedGoalsCard;
