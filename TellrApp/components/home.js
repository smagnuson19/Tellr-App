import React, { Component } from 'react';
import Style from '../Style';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    this.fetchNames()
  }

  fetchNames() {
    return (dispatch) => {
      axios.get(`${ROOT_URL}/${API_KEY}`).then((response) => {
        const payload = response.data
        this.setState([persons])
      }).catch((error) => {
        const payload = null
      });
    };
  }

  render() {
    return (
      <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>Hello World! </Text>
          </View>
          <View style={Style.inputContainer}>
            <Text style={styles.welcome}>This will be the beginning of the Tellr scaffold</Text>
          </View>
          <View style={Style.inputContainer}>
            { this.state.persons.map(person => <Text style={styles.welcome}> {person.name} </Text>)}
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
