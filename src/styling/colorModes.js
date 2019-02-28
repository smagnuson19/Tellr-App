import { Dimensions } from 'react-native';

export const dimensions2 = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

// 0: night mode dark colors
// 1: kids regular mode / pink colors - pink, light purple, blue lightlight?
// 2: kids mode 2 / blue and orange colors - light blue, dark blue, orange highlight


export const linearGradientColors = {
  top: { 0: 'rgba(4, 27, 37, 0.9615)', 1: 'rgba(250, 27, 3, 0.29615)', 2: 'rgba(64, 224, 208, .8)' },
  bottom: { 0: 'rgba(1, 6, 3, 0.76)', 1: 'rgba(1, 2, 243, 0.376)', 2: 'rgba(25, 25, 112, 1)' },
};

export const themeColors = {
  primary: { 0: 'rgb(61, 229, 148)', 1: 'rgb(61, 229, 148)' },
  secondary: '#15BFD6',
  highlight: '',
};

export const otherColors = {
  headerColor: { 0: 'rgb(255,255,255)', 1: 'rgb(0,0,0)' },
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
