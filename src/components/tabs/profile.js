import React, { Component } from 'react';
import {
  View, Text, StyleSheet, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
// const API_KEY = '';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      accountType: '',
      accountName: '',
      balance: '',
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    AsyncStorage.getItem('accountTypeID', (err, result) => {
      const account = result.slice(1, -1);
      this.setState({ accountType: account });
    });
    AsyncStorage.getItem('accountNameID', (err, result) => {
      const account = result.slice(1, -1);
      this.setState({ accountName: account });
    });

    sleep(50).then(() => {
      if (this.state.accountType === 'Parent') {
        AsyncStorage.getItem('emailID', (err, result) => {
          // get rid of the quotes
          const API_KEY_USERS = result.slice(1, -1);
          console.log(API_KEY_USERS);
          return axios.get(`${ROOT_URL}/children/${API_KEY_USERS}`).then((response) => {
            // make a list of the parent's children
            const childList = response.data;
            const childrenList = [];
            // loop through each kid and make an object for them with FirstName, Email
            Object.keys(childList).forEach((key) => {
              childrenList.push({ label: childList[key].firstName, value: childList[key] });
            });
            this.setState({ children: childrenList });
            console.log(this.state.children, 'children');
          }).catch((error) => {
            console.log('ERROR in Profile');
          });
        });
      } else if (this.state.accountType === 'Child') {
        AsyncStorage.getItem('balanceID', (err, result) => {
          this.setState({ balance: result });
        });
      }
    });
  }

  // display children name and balance for Parent view
  displayChildren() {
    const kidsList = [];
    for (let i = 0; i < this.state.children.length; i++) {
      kidsList.push({
        name: this.state.children[i].value.firstName,
        balance: this.state.children[i].value.balance,
      });
    }
    console.log(kidsList, 'kids');
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionText}> Children: </Text>
        { kidsList.map(person => (
          <Text style={pageStyle.subSectionText}>
            {''}
            {person.name}
            {',  Balance: $'}
            {person.balance}
            {' '}
          </Text>
        ))}
      </View>
    );
  }

  // display kid's current balance for Child view
  displayBalance() {
    return (
      <View style={pageStyle.sectionContainer}>
        <Text style={pageStyle.sectionText}> Balance: </Text>
        <Text style={pageStyle.subSectionText}>
          {' $'}
          {this.state.balance}
          {' '}
        </Text>
      </View>
    );
  }

  determineDisplay() {
    // display children for parents, balance for kids
    if (this.state.accountType === 'Parent') {
      return (this.displayChildren());
    } else if (this.state.accountType === 'Child') {
      return (this.displayBalance());
    } else {
      console.log('ERROR: accountType not loaded or selected proprely');
      return null;
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerTextContainter}>
              <Text style={Style.headerText}>Profile </Text>
            </View>
            <View style={pageStyle.sectionContainer}>
              <Text style={pageStyle.sectionHeader}> Account </Text>
              <Divider style={pageStyle.divider} />

              <View style={pageStyle.sectionContainer}>
                <Text style={pageStyle.sectionText}> Name: </Text>
                <Text style={pageStyle.subSectionText}>
                  {' '}
                  {this.state.accountName}
                  {' '}
                </Text>
              </View>

              <View style={pageStyle.sectionContainer}>
                <Text style={pageStyle.sectionText}> Account Type: </Text>
                <Text style={pageStyle.subSectionText}>
                  {' '}
                  {this.state.accountType}
                  {' '}
                </Text>
              </View>

              {this.determineDisplay()}
            </View>
            <View style={pageStyle.sectionContainer}>
              <Text style={pageStyle.sectionHeader}> Settings </Text>
              <Divider style={pageStyle.divider} />

              <Text style={pageStyle.sectionText}> Change Password </Text>
              <Text style={pageStyle.sectionText}> Delete Account </Text>
              <Text style={pageStyle.sectionText}> Logout </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  sectionContainer: {
    marginBottom: 15,
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
  avatarRow: {
    flexDirection: 'row',
    // width: dimensions.fullWidth,
    justifyContent: 'center',
    marginTop: 105,
    marginHorizontal: 20,
  },

});


export default Profile;
