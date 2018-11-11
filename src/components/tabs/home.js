import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import Style from '../../styling/Style';
import AvatarImage from './avatarImage';
import GoalsCard from './goalsCard';
import { colors } from '../../styling/base';

const ROOT_URL = 'http://localhost:5000/api';
const API_KEY = '';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: [
        {
          firstName: 'Patrick',
          lastName: 'Holland',
          userName: '23',
        },
        {
          firstName: 'Jordan',
          lastName: 'Siegal',
          userName: '35',
        },
      ],
    };

    // Bind this instance used in navigationToAccount to this component
    this.navigationToAccount = this.navigationToAccount.bind(this);
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

  // navigate to the correct account for child on a click
  navigationToAccount() {
    // Needs to be filled

  }

  renderGoalsToComplete() {
    return (
      <View>
        <GoalsCard title="hello" />
      </View>
    );
  }

  renderTasksToComplete() {
    // needs to be filled
  }

  renderAvatarRow() {
    console.log('rendering Row');
    console.log(this.state.family);
    return (
      <View style={pageStyle.avatarRow}>
        { this.state.family.map(person => (
          <View key={person.username}>
            <AvatarImage buttonPress={this.navigationToAccount()} individual={person} />

          </View>
        ))}

      </View>
    );
  }

  // Render of the parentsView
  renderParentView() {
    return (
      <View>
        <View style={Style.container}>
          <View>
            {this.renderAvatarRow()}
          </View>
        </View>
        <View style={Style.container}>
          <View>
            {this.renderGoalsToComplete()}
          </View>

        </View>
        <View style={Style.container}>
          <Text>
        chores that are due soon that have not been
        marked complete
            {' '}
          </Text>
        </View>
      </View>
    );
  }

  // render of the childs view
  renderChildView() {

  }

  render() {
    // if (this.props.type === 'parent') {
    if (true) {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.renderParentView()}
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View style={Style.rootContainer}>
          <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
            <View style={Style.contentWrapper}>
              {this.renderChildView()}
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}

const pageStyle = StyleSheet.create({
  avatarRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },


});


export default Home;
