import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#3de594',
  secondary: '#15BFD6',
  grey: '#424242',
  // linearGradientTop: 'rgba(4, 27, 37, 0.9615)',
  // linearGradientBottom: 'rgba(1, 6, 3, 0.76)',
  linearGradientTop: 'rgba(250, 27, 3, 0.29615)',
  linearGradientBottom: 'rgba(1, 246, 3, 0.376)',
  placeholderColor: 'grey',
  lightGrey: 'rgb(176, 176, 176)',
  black: 'rgb(0,0,0)',
  white: 'rgb(255,255,255)',
  red: 'rgb(255,0,0)',
  money: 'rgb(0, 100, 0)',
  clear: 'rgba(0,0,0,0)',
  button: 'rgba(250,0,0,.5)',
  logoGreen: 'rgb(61, 229, 148)',
};

export const fonts = {
  sm: 11,
  smmd: 15,
  md: 21,
  lg: 30,
  xlg: 35,
  primary: 'Montserrat-Thin',
  secondary: 'Montserrat',
};
