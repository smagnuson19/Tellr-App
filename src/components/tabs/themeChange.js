import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button, Divider,
} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { colors, fonts, dimensions } from '../../styling/base';
import { themeColors } from '../../styling/colorModes';
import { postColorMode } from '../../actions/index';

import Style from '../../styling/Style';

class ThemeChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: '',
      themeList: [{ label: 'Light Mode', value: 0 }, { label: 'Night Mode', value: 1 }],
    };
  }


  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Theme Changer </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Theme Changer </Text>
      );
    }
  }

  displayThemeName() {
    if (this.props.mode === 0) {
      return (
        <Text style={{
          fontSize: fonts.smmd,
          color: themeColors.headerColor[this.props.mode],
          fontFamily: fonts.secondary,
          paddingHorizontal: '5%',
        }}
        >
Light Mode
        </Text>
      );
    } else {
      return (
        <Text style={{
          fontSize: fonts.smmd,
          color: themeColors.headerColor[this.props.mode],
          fontFamily: fonts.secondary,
          paddingHorizontal: '5%',
        }}
        >
Night Mode
        </Text>
      );
    }
  }

  changeTheme() {
    // move to home page after you change the theme
    let resetAction;
    if (this.props.account.accountType === 'Parent') {
      if (this.props.mode === 0) {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ParentTabBarLight' }),
          ],
        });
      } else {
        resetAction = StackActions.reset({
          index: 0, // <-- currect active route from actions array
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'ParentTabBarDark' }),
          ],
        });
      }
    } else if (this.props.mode === 0) {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarLight' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarDark' }),
        ],
      });
    }

    const payLoad = {
      color: this.state.colorIndex,
    };

    if (this.state.colorIndex === '') {
      Alert.alert('Please select a theme!');
      console.log('ERROR: color index empty');
    } else {
      console.log(payLoad);
      this.props.postColorMode(payLoad, this.props.account.email).then(() => { this.props.navigation.dispatch(resetAction); });
    }
  }


  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            {this.headingDisplay()}
            <View style={pageStyle.sectionContainer}>
              <Text style={{
                fontSize: fonts.md,
                color: themeColors.headerColor[this.props.mode],
                fontFamily: fonts.secondary,
                paddingVertical: 4,
                paddingLeft: 2,
                paddingTop: 10,
              }}
              >
                {' '}
Theme Preview:
              </Text>
              <Divider style={{
                backgroundColor: themeColors.divider[this.props.mode],
                height: 2,
                marginTop: 2,
                marginBottom: 2,
                width: dimensions.fullWidth,
              }}
              />
              <View style={pageStyle.sectionContainer}>
                <Text style={{
                  fontSize: fonts.smmd,
                  fontWeight: 'bold',
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts.secondary,
                  paddingVertical: 6,
                  paddingLeft: 2,
                }}
                >
                  {' '}
Light Mode:
                </Text>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: '5%',
                }}
                >
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.linearGradientTop[0], justifyContent: 'center',
                  }}
                  />
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.linearGradientBottom[0], justifyContent: 'center',
                  }}
                  />
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.buttonColor[0], justifyContent: 'center',
                  }}
                  />
                </View>
                <Text style={{
                  fontSize: fonts.smmd,
                  fontWeight: 'bold',
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts.secondary,
                  paddingVertical: 6,
                  paddingLeft: 2,
                }}
                >
                  {' '}
Night Mode:
                </Text>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: '5%',
                }}
                >
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.linearGradientTop[1], justifyContent: 'center',
                  }}
                  />
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.linearGradientBottom[1], justifyContent: 'center',
                  }}
                  />
                  <View style={{
                    width: 40, height: 40, borderRadius: 80, backgroundColor: themeColors.buttonColor[1], justifyContent: 'center',
                  }}
                  />
                </View>
                <Text style={{
                  fontSize: fonts.md,
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts.secondary,
                  paddingVertical: 5,
                  paddingLeft: 2,
                  paddingTop: 20,
                }}
                >
                  {' '}
Change your theme?
                </Text>
                <Divider style={{
                  backgroundColor: themeColors.divider[this.props.mode],
                  height: 2,
                  marginTop: 2,
                  marginBottom: 0,
                  width: dimensions.fullWidth,
                }}
                />
              </View>
              <Text style={{
                fontSize: fonts.smmd,
                fontWeight: 'bold',
                color: themeColors.headerColor[this.props.mode],
                fontFamily: fonts.secondary,
                paddingVertical: 6,
                paddingLeft: 2,
              }}
              >
                {' '}
Current Theme:
              </Text>
              {this.displayThemeName()}
              <Text style={{
                fontSize: fonts.smmd,
                fontWeight: 'bold',
                color: themeColors.headerColor[this.props.mode],
                fontFamily: fonts.secondary,
                paddingTop: 18,
                paddingLeft: 2,
              }}
              >
                {' '}
New Theme:
              </Text>
              <View style={pageStyle.selectorsContainer}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select Theme',
                    value: null,
                  }}
                  placeholderTextColor={colors.placeholderColor}
                  items={this.state.themeList}
                  onValueChange={(value) => {
                    this.setState({
                      colorIndex: value,
                    });
                  }}
                  style={{
                    inputIOS: {
                      fontSize: fonts.smmd,
                      paddingTop: 5,
                      paddingHorizontal: 5,
                      paddingBottom: 5,
                      borderWidth: 1,
                      borderColor: themeColors.divider[this.props.mode],
                      color: themeColors.headerColor[this.props.mode],
                      width: dimensions.fullWidth - 100,
                      fontFamily: fonts.secondary,
                      textAlign: 'center',
                    },
                  }}
                  value={this.state.colorIndex}
                />
              </View>
            </View>
            <View style={Style.buttonContainer}>
              <Button
                title="Change The Theme!"
                raised
                fontFamily={fonts.secondary}
                style={Style.button}
                color={themeColors.headerColor[this.props.mode]}
                buttonStyle={
                      {
                        backgroundColor: themeColors.buttonColor[this.props.mode],
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                onPress={() => this.changeTheme()}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


const pageStyle = StyleSheet.create({
  selectorsContainer: {
    flex: 0,
    padding: '5%',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginBottom: '2%',
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.md,
    // color: '#fff',
    fontFamily: fonts.secondary,
    paddingVertical: 4,
    paddingLeft: 2,
    paddingTop: 10,
  },
  sectionHeaderParent: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    paddingVertical: 4,
    paddingLeft: 2,
    paddingTop: 10,
  },
  sectionText: {
    fontSize: fonts.smmd,
    fontWeight: 'bold',
    // color: colors.white,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 2,
  },
  sectionTextParent: {
    fontSize: fonts.smmd,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 2,
  },
  lastSectionText: {
    fontSize: fonts.md,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    marginBottom: -50,
  },
  subSectionText: {
    fontSize: fonts.sm,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 2,
  },
  darkSubSectionText: {
    fontSize: fonts.sm,
    color: colors.white,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 3,
  },
  // divider: {
  //   backgroundColor: colors.secondary,
  //   height: 2,
  //   marginTop: 2,
  //   marginBottom: 2,
  //   width: dimensions.fullWidth,
  // },
  // bdivider: {
  //   backgroundColor: colors.secondary,
  //   height: 2,
  //   marginTop: 2,
  //   marginBottom: 0,
  //   width: dimensions.fullWidth,
  // },
  settingsButton: {
    fontSize: fonts.md,
    fontWeight: 'bold',
    color: colors.logoGreen,
    fontFamily: fonts.secondary,
    width: dimensions.fullWidth,
  },
  buttonContainer: {
  },
});

const mapStateToProps = state => (
  {
    account: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postColorMode })(ThemeChange);
