import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#3de594',
  secondary: '#15BFD6',
  // tertiary: '#5DA6A7',
  linearGradientTop: 'rgba(4, 27, 37, 0.9615)',
  linearGradientBottom: 'rgba(1, 6, 3, 0.76)',
  placeholderColor: 'grey',
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
