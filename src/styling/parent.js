import { Dimensions } from 'react-native';

export const dimensions2 = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors2 = {

  primary: 'rgb(61, 229, 148)',
  secondary: '#15BFD6',
  grey: '#424242',
  linearGradientTop: 'rgba(4, 27, 37, 0.9615)',
  linearGradientBottom: 'rgba(1, 6, 3, 0.76)',
  // linearGradientTop: 'rgba(250, 27, 3, 0.29615)',
  // linearGradientBottom: 'rgba(1, 2, 243, 0.376)',
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

export const fonts2 = {
  sm: 11,
  smmd: 15,
  md: 19,
  lg: 28,
  xlg: 35,
  primary: 'Montserrat-Thin',
  secondary: 'Montserrat',
  logo: 'SignPainter',
};
