import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#3de594',
  secondary: '#15BFD6',
  // tertiary: '#5DA6A7',
};

export const fonts = {
  sm: 11,
  md: 21,
  lg: 30,
  primary: 'Montserrat-Thin',
  secondary: 'Montserrat',
};