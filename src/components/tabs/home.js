import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
// import Login from './login';
import Style from '../../styling/Style';

<<<<<<< HEAD
const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = 'goals/100001';
=======
const ROOT_URL = 'http://localhost:5000/api/';
const API_KEY = '';
>>>>>>> 43d84c6231248e94dd3376db6e1869e92b5d6482

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
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
      this.setState({ persons: payload });
    }).catch((error) => {
      console.log('ERROR in ');
    });
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>Home </Text>
        </View>
        <View style={Style.inputContainer}>
          <Text style={styles.welcome}>This will be the beginning of the Tellr scaffold</Text>
        </View>
        <View style={Style.inputContainer}>
          { this.state.persons.map(person => (
            <Text style={styles.welcome}>
              {' '}
              {person.name}
              {' '}
            </Text>
          ))}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default Home;
