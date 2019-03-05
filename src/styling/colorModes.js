import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

// 0: kids regular mode / pink colors - pink, light purple, blue
// 1: night mode dark colors

export const themeColors = {
  linearGradientTop: { 0: 'rgba(250, 27, 3, 0.29615)', 1: 'rgba(4, 27, 37, 0.9615)', 2: 'rgba(64, 224, 208, .8)' },
  linearGradientBottom: { 0: 'rgba(1, 2, 243, 0.376)', 1: 'rgba(1, 6, 3, 0.76)', 2: 'rgba(25, 25, 112, 1)' },
  primary: { 0: 'rgba(1, 2, 243, 0.376)', 1: 'rgb(61, 229, 148)' },
  secondary: { 0: '#15BFD6', 1: '#15BFD6' },
  buttonColor: { 0: '#15BFD6', 1: 'rgb(61, 229, 148)' },
  newGoalButton: { 0: 'rgba(250, 27, 3, 0.29615)', 1: 'rgb(61, 229, 148)' },
  redeemButton: { 0: 'rgba(1, 2, 243, 0.376)', 1: 'rgb(137,207,240)' },
  highlight: '',
  headerColor: { 0: 'rgb(0,0,0)', 1: 'rgb(255,255,255)' },
  grey: '#424242',
  placeholderColor: 'grey',
  lightGrey: 'rgb(150, 150, 150)',
  black: 'rgb(0,0,0)',
  white: 'rgb(255,255,255)',
  red: 'rgb(255,0,0)',
  money: 'rgb(0, 100, 0)',
  clear: 'rgba(0,0,0,0)',
  button: 'rgba(250,0,0,.5)',
  logoGreen: 'rgb(61, 229, 148)',
  logoGreenHex: '#3de594',
};
