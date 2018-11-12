import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider } from 'react-native-elements';
import Style from '../../styling/Style';
import AvatarImage from './avatarImage';
import GoalsCard from './goalsCard';
import { fonts, colors } from '../../styling/base';

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
    this.goalAction = this.goalAction.bind(this);
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

  goalAction(action) {
    // action is a true fale string saying that a  card has been marked
    // should post saying marked
    // and then delete it from view
  }

  renderGoalsToComplete() {
    const goals = [{
      name: 'Name of Goal',
      value: 45.90,
      description: 'THis is a long description fo what should go in the container and overwarp protection',
      id: '2',
    }];
    return (
      <View>
        <Text style={pageStyle.sectionHeader}>
      Family Goals
        </Text>
        <Divider style={pageStyle.divider} />
        { goals.map(goal => (
          <View key={goal.id}>
            <GoalsCard goals={goal}
              completed={false}
              onPress={this.goalAction}
            />

          </View>
        ))}

      </View>
    );
  }

  renderGoalsCompletion() {
    // somethingAbout emails
  }

  renderGoalsCompleted() {
    const goals = [{
      name: 'Name of Goal',
      value: 45.90,
      description: 'THis is a long description fo what should go in the container and overwarp protection',
      id: '2',
    }];
    return (
      <View>
        <Text style={pageStyle.sectionHeader}>
      Family Goals
        </Text>
        <Divider style={pageStyle.divider} />
        { goals.map(goal => (
          <View key={goal.id}>
            <GoalsCard goals={goal}
              completed
              onPress={this.goalAction}
            />

          </View>
        ))}

      </View>
    );
  }

  renderAvatarRow() {
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
          {this.renderGoalsCompleted}
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
  sectionHeader: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
  },
  divider: {
    backgroundColor: '#ffffff',
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },


});


export default Home;
