import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Divider,
} from 'react-native';
import { fonts, colors, dimensions } from '../../styling/base';
import GoalsCard from './goalsCard';

// import Style from '../../styling/Style';

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // buttonSelected: '',
    };
  }

  buttonPress(item) {
    // this.props.onPress(item);
  }

  render() {
    return (
      <View style={pageStyle.homeWrapper}>
        <View style={pageStyle.topContainer}>
          <View style={pageStyle.nameContainer}>
            <Text style={pageStyle.headerText}>
            Hey
              {this.props.firstName}
            </Text>
          </View>
        </View>
        <View style={pageStyle.balanceContainer}>
          <Text style={pageStyle.balanceText}>
        $
            {this.props.balance}
          </Text>
        </View>
        <View style={pageStyle.sectionContainer}>
          <Text style={pageStyle.sectionHeader}>
        Complete The Tasks
          </Text>

          { this.props.task.map(component => (
            <View key={component.notificationName}>
              <GoalsCard goals={component}
                completed={false}

              />

            </View>
          ))}
        </View>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  homeWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
  },
  topContainer: {
    width: dimensions.fullWidth,
    height: 300,
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },

  headerText: {
    fontSize: fonts.lg,
    color: 'rgb(0, 0, 0)',
  },

  balanceContainer: {
    backgroundColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
  },
  balanceText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
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


export default Child;
