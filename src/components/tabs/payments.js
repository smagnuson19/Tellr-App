import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-elements';
import Style from '../../styling/Style';
import KeyPad from './keypad';
import { dimensions } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = '';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyMembers: [],
      selectedFamilyMember: '',
      accountSelected: '',
      amount: 0,
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    return axios.get(`${ROOT_URL}/${API_KEY}`).then((response) => {
      const payload = response.data;
      console.log(payload);
      this.setState({ familyMembers: payload });
    }).catch((error) => {
      console.log('ERROR');
    });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.contentWrapper}>

            <View style={pageStyle.upperContainer}>
              <View style={pageStyle.selectorsContainer}>
                <Text> Selector Containers will go here </Text>
              </View>

              <View style={pageStyle.amountContainer}>
                <Text> $ </Text>
                <Text style={pageStyle.amountStyle}>
                  {' '}
                  {this.state.amount}
                  {' '}
                </Text>
              </View>
            </View>
            <KeyPad />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  upperContainer: {
  },
  selectorsContainer: {

  },
  amountContainer: {
    flexDirection: 'row',
  },

  amountStyle: {

  },

});


export default Payments;
