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
    // call listed parent function here
  }

  renderNumber() {
    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'];
    return (
      <View style={pageStyle.numberButtonContainer}>
        { items.map((itemKey) => {
          return (
            <TouchableOpacity style={pageStyle.numberButton}
              onPress={this.buttonPress(itemKey)}
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
        <Text> HELLOOO </Text>
        {this.renderNumber()}
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  numberPadContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  numberButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  numberButton: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 20,
  },

  number: {
    alignItems: 'center',
    fontFamily: fonts.secondary,
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 55,

  },
});


export default KeyPad;
