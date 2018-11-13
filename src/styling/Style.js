import { StyleSheet } from 'react-native';
import {
  colors, fonts, dimensions,
} from './base';


const Style = StyleSheet.create({
  // Should wrap the entire page
  rootContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },

  // Another wrapper - will bring the full width of the screen in
  contentWrapper: {
    flex: 1,
    width: dimensions.fullWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  headerText: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.secondary,
    fontSize: fonts.xlg,
    color: colors.primary,
    marginTop: 50,
    marginBottom: 30,
  },

  headerTextContainter: {
    alignItems: 'flex-start',
    marginTop: -200,
  },

  headerImage: {
    marginTop: 80,
    marginBottom: 100,
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  buttonGradient: {
    flex: 0,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: dimensions.fullHeight / 4,
    backgroundColor: '#3de594',
    alignItems: 'center',
    marginBottom: 50,
  },

  // associated with buttonGradient and Touchable Opacity object
  buttonText: {
    fontFamily: fonts.secondary,
    textAlign: 'center',
    fontSize: fonts.lg,

  },

  buttonContainer: {
    flex: 1,
    margin: 1,
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  button: {
    fontFamily: fonts.primary,
    marginBottom: 70,
  },

  // The FormInput object, wrapps a single fieldText
  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    margin: 25,
    borderColor: 'rgb(176, 176, 176)',
    color: 'rgb(255, 255, 255)',
  },

  // Style for a FormInput
  fieldText: {
    color: 'rgb(255, 255, 255)',
    fontFamily: fonts.secondary,
    textAlign: 'center',
    fontSize: fonts.md,
  },

  fieldContainerSecondary: {
    borderBottomWidth: 1,
    flex: 0,
    margin: 40,
    borderColor: 'rgb(176, 176, 176)',
    color: 'white',
    width: '40%',
  },

  // Style for a FormInput
  fieldTextSecondary: {
    color: 'white',
    fontFamily: fonts.secondary,
    textAlign: 'left',
    fontSize: fonts.md,
    marginLeft: 25,
  },

  container: {
    flex: 1,
    width: dimensions.fullWidth,
    justifyContent: 'center',
    marginBottom: 10,
    // background: linear-gradient(155.26, rgba(4, 27, 37, 0.961547) - 13.61, rgba(0, 6, 3, 0.76) - 146.55),
  },

  // Wrapper for multiple FormInput Objects
  inputContainer: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    alignItems: 'center',
  },

  // Container for a Chore object
  listContainer: {
    flex: 0,
    borderColor: colors.secondary,
    width: 380,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    paddingHorizontal: 30,
  },

  displayText: {
    color: colors.primary,
    fontSize: fonts.large,
    fontFamily: fonts.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Style;
