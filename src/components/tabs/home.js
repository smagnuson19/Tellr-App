import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
// import Login from './login';
import Style from '../../styling/Style';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = '';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    return axios.get(`${ROOT_URL}/${API_KEY}`).then((response) => {
      const payload = response.data;
      console.log(payload);
      // this.setState({ persons: payload });
    }).catch((error) => {
      console.log('ERROR in Home');
    });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.contentWrapper}>
          <View style={Style.container}>
            <Text> images of avatars to see family </Text>
            <View style={pageStyle.avatarRow}>
              <Text> Avatar images should go here/letters</Text>
            </View>
          </View>
          <View style={Style.container}>
            <Text> goals that need to be approved </Text>

          </View>
          <View style={Style.container}>
            <Text>
          chores that are due soon that have not been
          marked complete
              {' '}
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  avatarRow: {

  },

  avatar: {

  },

});


export default Home;
