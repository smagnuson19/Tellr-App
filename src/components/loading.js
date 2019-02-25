import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styling/base';
import {
  fetchUserInfo, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory,
} from '../actions/index';
import Style from '../styling/Style';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
    };
  }


  componentDidMount() {
    this.fetchNames();
  }


  fetchAtLoad(email) {
    if (this.props.accountInfo.accountType === 'Child') {
      this.props.fetchNotificationInfo(email).then(() => { console.log('Notifications pulled in'); });
      this.props.fetchGoals(email).then(() => { console.log('Goals pulled in'); });
      this.props.fetchKidFriends(email).then(() => { console.log('Friends pulled in'); });
      this.props.fetchAllSocial(email).then(() => { console.log('All friends pulled in'); });
      this.props.fetchEarningsHistory(email).then(() => { console.log('Earnings pulled in'); });
    } else if (this.props.accountInfo.accountType === 'Parent') {
      this.props.fetchNotificationInfo(email).then(() => { console.log('Notifications pulled in'); });
      this.props.fetchParentInfo(email).then(() => { console.log('User Info pulled in'); });
    } else {
      console.log('missing accountTypeID');
    }
  }

  fetchNames() {
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    console.log(email);
    // means there should be a token
    if (email === 'NO-EMAIL') {
      console.log('yes');
      AsyncStorage.getItem('email').then((storageEmail) => {
        console.log(storageEmail);
        this.setState({ email: storageEmail });
        if (storageEmail != null) {
          console.log();
          this.props.fetchUserInfo(storageEmail).then(() => { this.fetchAtLoad(storageEmail); });
        }
      });
    }
  }

  loading() {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }


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
        // const resetAction = StackActions.reset({
        //   index: 0, // <-- currect active route from actions array
        //   key: null,
        //   actions: [
        //     NavigationActions.navigate({ routeName: chooseRoute }),
        //   ],
        // });

        // Usage!
        sleep(500).then(() => {
        // Do something after the sleep!
          // this.props.navigation.dispatch(resetAction);
          this.props.navigation.navigate(chooseRoute);
        });
      }
    }
  }


  render() {
    if (this.state.email != null) {
      this.loading();
    }


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


export default connect(mapStateToProps, {
  fetchUserInfo, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory,
})(Loading);
