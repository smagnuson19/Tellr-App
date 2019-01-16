import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import { colors } from '../styling/base';
import { fetchUserInfo } from '../actions/index';
import Style from '../styling/Style';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.fetchNames();
  }

  fetchNames() {
    console.log(this.props);
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    console.log(email);
    this.props.fetchUserInfo(email);
  }

  loading(email) {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    // const emailObject = email;
    // AsyncStorage.setItem('emailID', JSON.stringify(emailObject), () => {
    // });


    // figure out if Parent or Child user
    let chooseRoute;
    console.log(this.props);
    console.log(this.props.accountType);
    if (this.props.accountType === 'Child') {
      chooseRoute = 'ChildTabBar';
    } else if (this.props.accountType === 'Parent') {
      chooseRoute = 'ParentTabBar';
    } else {
      console.log('Error in Loading', this.props.accountType);
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


const mapStateToProps = state => (
  {
    accountType: state.user.info.accountType,
  });


export default connect(mapStateToProps, { fetchUserInfo })(Loading);
