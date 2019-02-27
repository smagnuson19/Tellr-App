import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

// import Style from '../../styling/Style';
import { fonts, colors, dimensions } from '../../styling/base';

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
            <TouchableOpacity style={pageStyle.numberCell}
              onPress={() => this.buttonPress(itemKey)}
            >
              <Text
                style={pageStyle.number}
              >
                {' '}
                {itemKey}
                {' '}
              </Text>
            </TouchableOpacity>
          );
        })
    }
      </View>
    );
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
    paddingHorizontal: 10,
    paddingTop: '20%',
    paddingBottom: '7%',
    alignItems: 'center',
  },
  numberButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  numberCell: {
    width: (dimensions.fullWidth - 20) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '3%',
    paddingHorizontal: '7.5%',
  },

  number: {
    fontFamily: fonts.secondary,

    color: colors.secondary,
    fontSize: 40,

  },
});


export default KeyPad;
