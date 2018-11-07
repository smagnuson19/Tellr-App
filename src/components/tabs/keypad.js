import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

// import Style from '../../styling/Style';
import { fonts, colors } from '../../styling/base';

class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // buttonSelected: '',
    };
  }

  buttonPress(item) {
    this.props.onPress(item);
  }

  renderNumber() {
    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'];
    return (
      <View style={pageStyle.numberButtonContainer}>
        { items.map((itemKey) => {
          return (
            <TouchableOpacity style={pageStyle.numberButton}
              onPress={() => this.buttonPress(itemKey)}
            >
              <Text style={pageStyle.number}>
                {' '}
                {itemKey}
                {' '}
              </Text>
            </TouchableOpacity>
          );
        })
    }
      </View>);
  }


  render() {
    return (
      <View style={pageStyle.numberPadContainer}>
        {this.renderNumber()}
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  numberPadContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  numberButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  numberButton: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 33,
  },

  number: {
    fontFamily: fonts.secondary,
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 55,

  },
});


export default KeyPad;
