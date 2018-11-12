import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Style from '../../styling/Style';
import { colors } from '../../styling/base';

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
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default Profile;
