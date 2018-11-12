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
    this.props.onPress(action);
  }

  render() {
    return (
      <Card
        containerStyle={pageStyle.cardContainer}
        wrapperStyle={pageStyle.wrapperStyle}
      >
        <View style={pageStyle.headerView}>
          <View style={pageStyle.pageFiller} />
          <View style={pageStyle.titleFiller}>
            <Text style={pageStyle.titleStyle}>
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
            {this.props.goals.description}

          </Text>
        </View>
        <View style={pageStyle.actionBar}>
          <TouchableOpacity style={pageStyle.checkButton}
            onPress={() => this.buttonPress('true')}
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
            onPress={() => this.buttonPress('false')}
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
      </Card>
    );
  }
}

const pageStyle = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    padding: 5,
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
    fontSize: fonts.md,
    // textAlign: 'center',

  },
  priceStyle: {
    textAlign: 'right',
  },

  wrapperStyle: {
    // paddingTop: 0,
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
