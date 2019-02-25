import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {

  primary: 'rgb(0, 0, 0)',
  secondary: '#15BFD6',
  grey: '#424242',
  // linearGradientTop: 'rgba(4, 27, 37, 0.9615)',
  // linearGradientBottom: 'rgba(1, 6, 3, 0.76)',
  linearGradientTop: 'rgba(250, 27, 3, 0.29615)',
  linearGradientBottom: 'rgba(1, 2, 243, 0.376)',
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
  NavigationBarColoredLine: 'rgb(5, 5, 5)',
};


export const fonts = {
  sm: 11,
  smmd: 15,
  md: scale(20),
  lg: scale(25),
  xlg: scale(30),
  primary: 'Montserrat-Thin',
  secondary: 'Montserrat',
  logo: 'SignPainter',
};
