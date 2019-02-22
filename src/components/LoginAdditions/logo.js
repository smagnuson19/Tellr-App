import React from 'react';
// verticalScale, moderateScale other
import { scale } from 'react-native-size-matters';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  fonts,
  colors,
} from '../../styling/base';

const Logo = () => {
  return (
    <View style={pageStyle.container}>

      <Text style={pageStyle.firstLetter}
        adjustsFontSizeToFit
      >
      T
        <Text style={pageStyle.lastPart}
          adjustsFontSizeToFit
        >
        eller
        </Text>
      </Text>


    </View>
  );
};


const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  firstLetter: {
    padding: 0,
    fontSize: scale(170),
    marginTop: '25%',
    paddingRight: '5%',
    color: colors.logoGreenHex,
    textAlign: 'right',
    justifyContent: 'center',
    fontFamily: fonts.logo,

  },

  lastPart: {
    flex: 1,
    marginLeft: '-2%',
    padding: 0,
    margin: 0,
    color: '#ffff',
    fontFamily: fonts.logo,
  },

});

export default Logo;
