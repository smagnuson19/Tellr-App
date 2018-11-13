import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import { colors } from '../styling/base';
// import Login from './login';
import Style from '../styling/Style';

const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: '',

    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    return axios.get(`${ROOT_URL}/users/${email}`).then((response) => {
      const payload = response.data;
      this.setState({ accountType: payload.accountType });

      AsyncStorage.setItem('familyID', JSON.stringify(payload.familyName), () => {
      });

      AsyncStorage.setItem('accountTypeID', JSON.stringify(payload.accountType), () => {
      });
      AsyncStorage.setItem('accountNameID', JSON.stringify(`${payload.firstName} ${payload.lastName}`), () => {
      });
      if (this.state.accountType === 'Child') {
        AsyncStorage.setItem('balanceID', JSON.stringify(payload.balance), () => {
        });
      }
    }).catch((error) => {
      console.log('ERROR in Loading');
    });
  }

  loading(email) {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    const emailObject = email;
    AsyncStorage.setItem('emailID', JSON.stringify(emailObject), () => {
    });


    // figure out if Parent or Child user
    let chooseRoute;
    if (this.state.accountType === 'Child') {
      chooseRoute = 'ChildTabBar';
    } else if (this.state.accountType === 'Parent') {
      chooseRoute = 'ParentTabBar';
    } else {
      console.log('Error in Loading', this.state.accountType);
    }
    //  So that you are unable to navigate back to login page once logged in.
    if (chooseRoute != null) {
      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: chooseRoute }),
        ],
      });

      // Usage!
      sleep(500).then(() => {
      // Do something after the sleep!
        this.props.navigation.dispatch(resetAction);
      });
    }
  }


  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    this.loading(email);

    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerText}>
              <Text style={Style.headerText}>Loading... </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default Loading;
