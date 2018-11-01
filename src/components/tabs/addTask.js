import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  Button, ThemeProvider, FormInput, Input, Header,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '@material-ui/core/TextField';
import LinearGradient from 'react-native-linear-gradient';
import Style from '../../styling/Style';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = '';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskDeadline: '',
      child: '',
      taskDescription: '',
      reward: '',
    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    return axios.get(`${ROOT_URL}/${API_KEY}`).then((response) => {
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
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>New Task </Text>
          </View>
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ taskName: text })}
            value={this.state.taskName}
            placeholder="Task Name"
            style={Style.fieldInput}
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ taskDeadline: text })}
            value={this.state.taskDeadline}
            placeholder="Task Deadline"
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ child: text })}
            value={this.state.child}
            placeholder="Select Child"
          />
          <FormInput
            containerStyle={{ width: '90%' }}
            onChangeText={text => this.setState({ taskDescription: text })}
            value={this.state.taskDescription}
            placeholder="Task Description..."
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ reward: text })}
            value={this.state.reward}
            placeholder="Reward: $0.00"
          />
          <Button
            title="Publish!"
            rounded
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: '50%',
            }}
            // onPress={() => this.submitTask()}
          />
        </LinearGradient>
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
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
});


export default AddTask;
