import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, ButtonGroup } from 'react-native-elements';
import {
  AreaChart, XAxis, Grid, YAxis,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';
import { colors2 } from '../../styling/parent';
import Style2 from '../../styling/ParentStyle';
import { fetchEarningsHistory } from '../../actions/index';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          <Text style={pageStyle.sectionText}> Children: </Text>
          { kidsList.map(person => (
            <Text style={pageStyle.darkSubSectionText}>
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
        <Text style={pageStyle.sectionText}> Balance: </Text>
        <Text style={pageStyle.subSectionText}>
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

  childCharts() {
    if (this.props.user.accountType === 'Child') {
      // const balHist = [{ value: 0, index: new Date('2019-01-29') }, { value: 20, index: new Date('2019-02-02') }, { value: 50, index: new Date('2019-02-10') }, { value: 25, index: new Date('2019-02-11') }, { value: 65, index: new Date('2019-02-15') }];
      const balHist = [];
      console.log(this.props.earnings);
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
              fill: 'black',
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
              svg={{ fill: 'rgba(28, 228, 28, 0.8)' }}
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
              labelStyle={{ color: 'black' }}
              xAccessor={({ item }) => item.index}
              svg={{
                fill: 'black',
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
      <View
        style={{
          position: 'absolute', top: '84%', left: '-2.2%',
        }}
      >
        <ButtonGroup
          onPress={() => this.props.navigation.navigate('SettingsPage')}
          buttons={['Settings']}
          containerStyle={{ width: dimensions.fullWidth, fill: 'rgba=(256, 256, 256, 1)' }}
        />
      </View>
    );
  }

  render() {
    if (this.props.user.accountType === 'Parent') {
      return (
        <View style={{
          width: dimensions.fullWidth,
          height: dimensions.fullHeight,
        }}
        >
          <LinearGradient colors={[colors2.linearGradientTop, colors2.linearGradientBottom]} style={{ width: dimensions.fullWidth, height: dimensions.fullHeight }}>
            <View>
              <Text style={Style2.headerText}>Profile </Text>
              <View style={pageStyle.sectionContainer}>
                <Text style={pageStyle.sectionHeader}> Account </Text>
                <Divider style={pageStyle.divider} />
                <View style={pageStyle.sectionContainer}>
                  <Text style={pageStyle.sectionText}> Name: </Text>
                  <Text style={pageStyle.darkSubSectionText}>
                    {' '}
                    {this.props.user.firstName}
                    {' '}
                    {this.props.user.lastName}
                  </Text>
                  <Text style={pageStyle.sectionText}> Account Type: </Text>
                  <Text style={pageStyle.darkSubSectionText}>
                    {' '}
                    {this.props.user.accountType}
                    {' '}
                  </Text>
                  {this.determineDisplay()}
                  <Text style={pageStyle.sectionHeader}> Analytics </Text>
                  <Divider style={pageStyle.bdivider} />
                </View>
              </View>
              <TouchableOpacity onPress={() => console.log('Touchable Opacity Touched')}>
                <Text style={{
                  color: colors.logoGreen, fontSize: 18, fontFamily: fonts.secondary, textAlign: 'center',
                }}
                >
                  {'Analytics Available on Your Child\'s Profile'}
                </Text>
                {this.childCharts()}
                <Text style={{
                  color: colors.logoGreen, fontSize: 12, fontFamily: fonts.secondary, textAlign: 'center', paddingTop: 8,
                }}
                >
                  {'Log into thier account to see more!'}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {this.renderFooter()}
        </View>
      );
    } else if (this.props.user.accountType === 'Child') {
      return (
        <View style={{
          width: dimensions.fullWidth,
          height: dimensions.fullHeight,
        }}
        >
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={{ width: dimensions.fullWidth, height: dimensions.fullHeight }}>
            <View>
              <Text style={Style.headerTextLeaderboard}>Profile </Text>
              <View style={pageStyle.sectionContainer}>
                <Text style={pageStyle.sectionHeader}> Account </Text>
                <Divider style={pageStyle.divider} />
                <View style={pageStyle.sectionContainer}>
                  <Text style={pageStyle.sectionText}> Name: </Text>
                  <Text style={pageStyle.subSectionText}>
                    {' '}
                    {this.props.user.firstName}
                    {' '}
                    {this.props.user.lastName}
                  </Text>
                  <Text style={pageStyle.sectionText}> Account Type: </Text>
                  <Text style={pageStyle.subSectionText}>
                    {' '}
                    {this.props.user.accountType}
                    {' '}
                  </Text>
                  {this.determineDisplay()}
                  <Text style={pageStyle.sectionHeader}> Analytics </Text>
                  <Divider style={pageStyle.bdivider} />
                </View>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Analytics', {
                email: this.props.user.email,
              })
              }
              >
                <Text style={{
                  color: 'black', fontSize: 18, fontFamily: fonts.secondary, textAlign: 'center',
                }}
                >
                  {'Lifetime Balance'}
                </Text>
                {this.childCharts()}
                <Text style={{
                  color: 'black', fontSize: 12, fontFamily: fonts.secondary, textAlign: 'center', paddingTop: 8,
                }}
                >
                  {'Click the Graph for More! '}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {this.renderFooter()}
        </View>
      );
    } else {
      console.log('ERROR: accountType not loaded or selected proprely');
      return null;
    }
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
    fontSize: 24,
    color: '#fff',
    fontFamily: fonts.secondary,
    paddingVertical: 4,
    paddingLeft: 2,
    paddingTop: 10,
  },
  sectionText: {
    fontSize: fonts.md,
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
    fontSize: fonts.smmd,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 2,
  },
  darkSubSectionText: {
    fontSize: fonts.smmd,
    color: colors.logoGreen,
    fontFamily: fonts.secondary,
    paddingVertical: 6,
    paddingLeft: 3,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 2,
    marginBottom: 2,
    width: dimensions.fullWidth,
  },
  bdivider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 2,
    marginBottom: 0,
    width: dimensions.fullWidth,
  },
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
  });


export default connect(mapStateToProps, { fetchEarningsHistory })(Profile);
