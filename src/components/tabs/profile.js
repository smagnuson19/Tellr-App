import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import { PieChart } from 'react-native-svg-charts';
// import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { logoutUser } from '../../actions';
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
      <View style={pageStyle.sectionContainer}>
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

  logout() {
    console.log('logout Clicked');
    this.props.logoutUser();
    this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'Login' }));
  }
  //   const resetAction = NavigationActions.reset({
  //     index: 0, // <-- currect active route from actions array
  //     key: null,
  //     actions: [
  //       NavigationActions.navigate({ routeName: 'Auth' }),
  //     ],
  //   });
  //
  //   console.log(this.props.navigation);
  //   this.props.navigation.navigate({ routeName: 'Auth' });
  // }
  //
  // deleteAccount() {
  //   // move to login page after you delete the account
  //   const resetAction = StackActions.reset({
  //     index: 0, // <-- currect active route from actions array
  //     key: null,
  //     actions: [
  //       NavigationActions.navigate({ routeName: 'Login' }),
  //     ],
  //   });
  //
  //   const payLoad = {
  //     email: this.state.myEmail,
  //   };
  //   axios.post(`${ROOT_URL}/delete`, { payLoad })
  //     .then((response) => {
  //       console.log('deleting 222');
  //       console.log(response.data);
  //
  //     });
  // }

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
              </View>

              <View style={pageStyle.sectionContainer}>
                <Text style={pageStyle.sectionText}> Account Type: </Text>
                <Text style={pageStyle.subSectionText}>
                  {' '}
                  {this.props.user.accountType}
                  {' '}
                </Text>
              </View>

              {this.determineDisplay()}
            </View>
            <View style={pageStyle.sectionContainer}>
              <Text style={pageStyle.sectionHeader}> Settings </Text>
              <Divider style={pageStyle.divider} />

              <View style={pageStyle.buttonContainer}>
                <Button
                  title="Logout"
                  color={colors.secondary}
                  style={pageStyle.settingsButton}
                  onPress={() => this.logout()}
                />
              </View>
              <ScrollView>
                {this.childCharts()}
                {this.childCharts()}
              </ScrollView>
            </View>
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
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 5,
  },
  sectionText: {
    fontSize: fonts.smmd,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 5,
  },
  subSectionText: {
    fontSize: fonts.sm,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
    marginLeft: 10,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },
  settingsButton: {
    fontSize: fonts.smmd,
    fontWeight: 'bold',
    color: colors.secondary,
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
  logoutUser,
})(Profile);
