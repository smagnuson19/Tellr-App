import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  colors2, fonts2, dimensions2,
} from './parent';


const Style = StyleSheet.create({
  // Should wrap the entire page
  rootContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions2.fullWidth,
    height: dimensions2.fullHeight,
  },

  // Another wrapper - will bring the full width of the screen in
  contentWrapper: {
    flex: 1,
    width: dimensions2.fullWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  headerText: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts2.secondary,
    fontSize: fonts2.xlg,
    color: colors2.white,
    marginTop: '20%',
    marginBottom: '10%',
  },

  headerTextLeaderboard: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts2.secondary,
    fontSize: fonts2.xlg,
    color: colors2.black,
    marginTop: '20%',
    marginBottom: '0%',
  },

  headerTextContainter: {
    alignItems: 'flex-start',
    marginTop: -200,
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
    height: dimensions2.fullHeight / 4,
    backgroundColor: colors2.logoGreen,
    alignItems: 'center',
    marginBottom: '15%',
  },

  // associated with buttonGradient and Touchable Opacity object
  buttonText: {
    fontFamily: fonts2.secondary,
    textAlign: 'center',
    fontSize: fonts2.lg,

  },

  buttonContainer: {
    flex: 1,
    paddingTop: '20%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  button: {
    // fontFamily: fonts.primary,
    marginBottom: '15%',
  },

  button2: {
    // fontFamily: fonts.primary,
    marginBottom: '8%',
  },

  // The FormInput object, wrapps a single fieldText
  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    margin: '5 %',
    borderColor: colors2.lightGrey,
    color: colors2.white,
  },

  // Style for a FormInput
  fieldText: {
    color: colors2.black,
    fontFamily: fonts2.secondary,
    textAlign: 'center',
    fontSize: fonts2.md,
  },

  fieldContainerSecondary: {
    borderBottomWidth: 1,
    flex: 0,
    margin: 40,
    borderColor: colors2.lightGrey,
    color: 'white',
    width: '40%',
  },

  fieldContainerThird: {
    borderBottomWidth: 1,
    flex: 0,
    margin: 2,
    borderColor: colors2.lightGrey,
    color: 'white',
    width: '40%',
  },

  // Style for a FormInput
  fieldTextSecondary: {
    color: 'white',
    fontFamily: fonts2.secondary,
    textAlign: 'left',
    fontSize: fonts2.md,
    marginLeft: 25,
  },

  container: {
    flex: 1,
    width: dimensions2.fullWidth,
    justifyContent: 'center',
    marginBottom: 10,
    // background: linear-gradient(155.26, rgba(4, 27, 37, 0.961547) - 13.61, rgba(0, 6, 3, 0.76) - 146.55),
  },

  // Wrapper for multiple FormInput Objects
  inputContainer: {
    flex: 1,
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // paddingHorizontal: 30,
    alignItems: 'center',
  },

  // Container for a Chore object
  listContainer: {
    flex: 0,
    borderColor: colors2.secondary,
    width: 380,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    paddingHorizontal: 30,
  },

  displayText: {
    color: colors2.primary,
    fontSize: fonts2.large,
    fontFamily: fonts2.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Style;
