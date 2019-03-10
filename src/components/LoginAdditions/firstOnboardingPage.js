import React from 'react';
// verticalScale, moderateScale other
import { scale } from 'react-native-size-matters';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Logo from './logo';
import {
  fonts,
  colors,
} from '../../styling/base';


// Would be cool to have a cursor going back and forth entering
// and then deleting the bottom container text
const FirstOnboardingPage = () => {
  return (
    <View style={pageStyle.containerView}>
      <View style={pageStyle.aboveHeader}>
        <Text style={pageStyle.welcomeText}>
      Welcome To
        </Text>
      </View>
      <View style={pageStyle.header}>
        <Logo />
      </View>
      <View style={pageStyle.bottomContainer}>
        <Text style={pageStyle.textStyling}>
      The family driven,
      chore management,
      task completion, and
      financial literacy
        </Text>
      </View>


    </View>
  );
};


const pageStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingTop: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  aboveHeader: {
    // paddingTop: '10%',
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  welcomeText: {
    fontFamily: fonts.logo,
    textAlign: 'center',
    fontSize: scale(60),
    color: colors.logoGreen,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 0.5,

  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textStyling: {
    paddingHorizontal: '2%',
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
    textAlign: 'center',
    alignContent: 'flex-start',
    paddingTop: '5%',
    color: '#fff',
  },


});

export default FirstOnboardingPage;
