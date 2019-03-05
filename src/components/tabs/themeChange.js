import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
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
                    fontSize: fonts.md,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                    borderWidth: 1,
                    borderColor: themeColors.secondary[this.props.mode],
                    color: themeColors.headerColor[this.props.mode],
                    width: dimensions.fullWidth - 40,
                    fontFamily: fonts.secondary,
                    textAlign: 'center',
                  },
                }}
                value={this.state.colorIndex}
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                title="Change The Theme!"
                large
                raised
                fontFamily={fonts.secondary}
                style={Style.button}
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
    flex: 1,
    padding: '3%',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => (
  {
    account: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { postColorMode })(ThemeChange);
