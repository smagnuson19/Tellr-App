import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, ButtonGroup } from 'react-native-elements';
import { PieChart } from 'react-native-svg-charts';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';

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
            <Text style={pageStyle.subSectionText}>
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
      // const completed = 10;
      // const incomplete = 5;
      const pieData = [
        {
          key: 1,
          amount: 100,
          svg: { fill: colors.logoGreen },
        },
        {
          key: 2,
          amount: 400,
          svg: { fill: colors.red },
        },
      ];
      console.log('Charting');
      return (
        <PieChart
          style={{
            height: 200,
            width: 200,
            // backgroundColor: colors.logoGreen,
          }}
          valueAccessor={({ item }) => item.amount}
          data={pieData}
        />
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
          padding: 20, paddingTop: 5, paddingBottom: 85, alignItems: 'center',
        }}
      >
        <ButtonGroup
          onPress={() => this.props.navigation.navigate('SettingsPage')}
          buttons={['Settings']}
          containerStyle={{ width: dimensions.fullWidth }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Profile </Text>
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
              </View>
            </View>
            <ScrollView>
              {this.childCharts()}
              {this.childCharts()}
            </ScrollView>
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
    marginBottom: '5%',
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.lg,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 5,
  },
  sectionText: {
    fontSize: fonts.md,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 5,
  },
  subSectionText: {
    fontSize: fonts.smmd,
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 10,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  settingsButton: {
    fontSize: fonts.md,
    fontWeight: 'bold',
    color: colors.logoGreen,
    fontFamily: fonts.secondary,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginLeft: 3,
  },
});

const mapStateToProps = state => (
  {
    user: state.user.info,
    family: state.user.family,
  });


export default connect(mapStateToProps, {
})(Profile);
