import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, Button } from 'react-native-elements';
import {
  AreaChart, XAxis, Grid, YAxis,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';
import { fetchEarningsHistory } from '../../actions/index';
import { themeColors } from '../../styling/colorModes';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Profile </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Profile </Text>
      );
    }
  }

  // display children name and balance for Parent view
  displayChildren() {
    if (this.props.family !== null) {
      const kidsList = [];
      for (let i = 0; i < this.props.family.length; i++) {
        kidsList.push({
          name: this.props.family[i].firstName,
          balance: this.props.family[i].balance,
        });
      }
      return (
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
            Children:
          </Text>
          { kidsList.map(person => (
            <Text style={{
              fontSize: fonts.sm,
              color: themeColors.headerColor[this.props.mode],
              fontFamily: fonts.secondary,
              paddingVertical: 6,
              paddingLeft: 3,
            }}
            >
              {' '}
              {person.name}
              {',  Balance: $'}
              {person.balance}
              {''}
            </Text>
          ))}
        </View>
      );
      // no kids so don't display anything about kids
    } else {
      return (null);
    }
  }

  // display kid's current balance for Child view
  displayBalance() {
    return (
      <View>
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
Balance:
        </Text>
        <Text style={{
          fontSize: fonts.sm,
          fontFamily: fonts.secondary,
          color: themeColors.headerColor[this.props.mode],
          paddingVertical: 6,
          paddingLeft: 2,
        }}
        >
          {'  $'}
          {this.props.user.balance}
          {' '}
        </Text>
      </View>
    );
  }

  determineDisplay() {
    // display children for parents, balance for kids
    if (this.props.user.accountType === 'Parent') {
      return (this.displayChildren());
    } else if (this.props.user.accountType === 'Child') {
      return (this.displayBalance());
    } else {
      console.log('ERROR: accountType not loaded or selected proprely');
      return null;
    }
  }

  analyticsDisplay() {
    if (this.props.user.accountType === 'Parent') {
      return (
        <Text style={{
          color: themeColors.headerColor[this.props.mode], fontSize: 18, fontFamily: fonts.secondary, textAlign: 'center',
        }}
        >
          {'Analytics available for children. Log into their account to see more!'}
        </Text>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Analytics', {
          email: this.props.user.email,
        })
              }
        >
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 18, fontFamily: fonts.secondary, textAlign: 'center',
          }}
          >
            {'Lifetime Balance'}
          </Text>
          {this.childCharts()}
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 12, fontFamily: fonts.secondary, textAlign: 'center', paddingTop: 8,
          }}
          >
            {'Click the Graph for More! '}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  childCharts() {
    if (this.props.user.accountType === 'Child') {
      // const balHist = [{ value: 0, index: new Date('2019-01-29') }, { value: 20, index: new Date('2019-02-02') }, { value: 50, index: new Date('2019-02-10') }, { value: 25, index: new Date('2019-02-11') }, { value: 65, index: new Date('2019-02-15') }];
      const balHist = [];

      Object.keys(this.props.earnings).forEach((key) => {
        balHist.push({ value: this.props.earnings[key][0], index: new Date(`${this.props.earnings[key][1]}`) });
      });
      console.log(balHist);
      const contentInset = {
        top: 0, left: 5, right: 0, bottom: 5,
      };
      return (
        <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
          <YAxis
            data={balHist}
            style={{ marginBottom: 0 }}
            yAccessor={({ item }) => item.value}
            contentInset={{
              top: 5, left: 5, right: 0, bottom: 25,
            }}
            formatLabel={value => `$${value}`}
            svg={{
              fill: themeColors.headerColor[this.props.mode],
              fontSize: 8,
              fontWeight: 'bold',
            }}
            numberOfTicks={6}
          />
          <View
            style={{
              height: '100%', marginLeft: 5, marginRight: 10, flexDirection: 'column', width: '95%',
            }}
          >
            <AreaChart
              curve={shape.curveLinear}
              data={balHist}
              svg={{ fill: colors.babyBlue }}
              yAccessor={({ item }) => item.value}
              xAccessor={({ item }) => item.index}
              // showGrid={false}
              style={{
                height: '100%', flex: 1, marginLeft: 5, width: '95%',
              }}
              gridMin={0}
              contentInset={contentInset}
              numberOfTicks={6}
            >
              <Grid />
            </AreaChart>
            <XAxis
              style={{
                marginTop: 10, marginLeft: 10,
              }}
              data={balHist}
              formatLabel={value => `${(value.getMonth() + 1)}/${value.getDate()}`}
              scale={scale.scaleTime}
              labelStyle={{ color: themeColors.headerColor[this.props.mode] }}
              xAccessor={({ item }) => item.index}
              svg={{
                fill: themeColors.headerColor[this.props.mode],
                fontSize: 8,
                fontWeight: 'bold',
              }}
              contentInset={contentInset}
              numberOfTicks={6}
            />
          </View>
        </View>
      );
    } else {
      console.log('no charts rn');
      return null;
    }
  }

  renderFooter() {
    return (
      <View style={pageStyle.footerContainer}>
        <Button
          raised
          onPress={() => this.props.navigation.navigate('SettingsPage')}
          title="Settings"
          buttonStyle={{
            backgroundColor: themeColors.buttonColor[this.props.mode],
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 5,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
          fontFamily={fonts.secondary}
          color="black"
        />
      </View>
    );
  }

  // renderFooter2() {
  //   return (
  //     <View
  //       style={{
  //         position: 'absolute', top: '84%',
  //       }}
  //     >
  //       <ButtonGroup
  //         onPress={() => this.props.navigation.navigate('SettingsPage')}
  //         buttons={['Settings']}
  //         containerStyle={{ width: dimensions.fullWidth - 20, backgroundColor: themeColors.buttonColor[this.props.mode], borderColor: 'transparent' }}
  //         textStyle={{ fontFamily: fonts.secondary, color: themeColors.black }}
  //         underlayColor={themeColors.secondary[this.props.mode]}
  //       />
  //     </View>
  //   );
  // }

  render() {
    return (
      <View style={{
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
      }}
      >
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={{ width: dimensions.fullWidth, height: dimensions.fullHeight }}>
          <View>
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
Account
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
Name:
                </Text>
                <Text style={{
                  fontSize: fonts.sm,
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts.secondary,
                  paddingVertical: 6,
                  paddingLeft: 3,
                }}
                >
                  {' '}
                  {this.props.user.firstName}
                  {' '}
                  {this.props.user.lastName}
                </Text>
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
Account Type:
                </Text>
                <Text style={{
                  fontSize: fonts.sm,
                  color: themeColors.headerColor[this.props.mode],
                  fontFamily: fonts.secondary,
                  paddingVertical: 6,
                  paddingLeft: 3,
                }}
                >
                  {' '}
                  {this.props.user.accountType}
                  {' '}
                </Text>
                {this.determineDisplay()}
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
Analytics
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
            </View>
            {this.analyticsDisplay()}
            {this.renderFooter()}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  // headerContainer: {
  //   top: 0,
  //   width: dimensions.fullWidth,
  // },
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
  footerContainer: {
    marginBottom: 15,
    marginTop: 5,
    width: dimensions.fullWidth,
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
    user: state.user.info,
    family: state.user.family,
    earnings: state.user.earnings,
    mode: state.user.colorMode.color,
  });


export default connect(mapStateToProps, { fetchEarningsHistory })(Profile);
