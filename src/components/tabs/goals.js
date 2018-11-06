import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import {
  Button, FormInput,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';

const ROOT_URL = 'http://localhost:5000/api';

// const API_KEY = '';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalsName: '',
      goalsDeadline: '',
      child: '',
      goalsDescription: '',
      reward: '',
    };
  }

  submitgoals() {
    const payLoad = {
      goalsName: this.state.goalsName,
      goalsDeadline: this.state.goalsDeadline,
      child: this.state.child,
      goalsDescription: this.state.goalsDescription,
      reward: this.state.reward,
    };

    axios.post(`${ROOT_URL}`, { payLoad })
      .then((response) => {
        console.log(response.data);
      });

    // So that you are unable to navigate back to login page once logged in.
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={['rgba(4, 27, 37, 0.9615)', 'rgba(1, 6, 3, 0.76)']} style={Style.gradient}>
          <View style={Style.displayContainer}>
            <Text style={Style.displayText}>New goals </Text>
          </View>
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ goalsName: text })}
            value={this.state.goalsName}
            placeholder="goals Name"
            style={Style.fieldInput}
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ goalsDeadline: text })}
            value={this.state.goalsDeadline}
            placeholder="goals Deadline"
          />
          <FormInput
            containerStyle={{ width: '60%' }}
            onChangeText={text => this.setState({ child: text })}
            value={this.state.child}
            placeholder="Select Child"
          />
          <FormInput
            containerStyle={{ width: '90%' }}
            onChangeText={text => this.setState({ goalsDescription: text })}
            value={this.state.goalsDescription}
            placeholder="goals Description..."
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
            large
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: '50%',
            }}
            onPress={() => this.submitgoals()}
          />
        </LinearGradient>
      </View>
    );
  }
}


export default Goals;
