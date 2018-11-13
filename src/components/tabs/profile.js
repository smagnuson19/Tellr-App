import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import { colors, fonts, dimensions } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = '';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // persons: [],
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    return axios.get(`${ROOT_URL}/${API_KEY}`).then((response) => {
      console.log('Hello');
      const payload = response.data;
      console.log(payload);
      // this.setState({ persons: payload });
    }).catch((error) => {
      console.log('ERROR in ');
    });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerText}>
              <Text style={Style.headerText}>Profile </Text>
            </View>
            <View style={pageStyle.sectionContainer}>
              <Text style={pageStyle.sectionHeader}> Account </Text>
              <Divider style={pageStyle.divider} />
              <Text style={pageStyle.sectionText}> Account Type: </Text>
              <Text style={pageStyle.sectionText}> Children: </Text>
              <Text style={pageStyle.sectionText}> Other Family members: </Text>
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
  },
  sectionText: {
    fontSize: fonts.sm,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
  },
  divider: {
    backgroundColor: colors.secondary,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },

});


export default Profile;
