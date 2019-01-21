import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import { colors } from '../styling/base';
import { fetchUserInfo, fetchNotificationInfo, fetchParentInfo } from '../actions/index';
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

  fetchAtLoad(email) {
    if (this.props.accountInfo.accountType === 'Child' || this.props.accountInfo.accountType === 'Parent') {
      this.props.fetchNotificationInfo(email).then(() => { console.log('Notifications updated'); });
      if (this.props.accountInfo.accountType === 'Parent') {
        this.props.fetchParentInfo(email).then(() => { console.log('Parent Data pulled in'); });
      }
    } else {
      console.log('missing accountTypeID');
    }
  }

  fetchNames() {
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    this.props.fetchUserInfo(email).then(() => { this.fetchAtLoad(email); });
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
    if (this.props.accountInfo !== null) {
      if (this.props.accountInfo.accountType === 'Child') {
        chooseRoute = 'ChildTabBar';
      } else if (this.props.accountInfo.accountType === 'Parent') {
        chooseRoute = 'ParentTabBar';
      } else {
        console.log('Error in Loading', this.props.accountInfo.accountType);
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
              <ActivityIndicator size="large" color={Style.primary} />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


const mapStateToProps = state => (
  {
    accountInfo: state.user.info,
  });


export default connect(mapStateToProps, { fetchUserInfo, fetchNotificationInfo, fetchParentInfo })(Loading);
