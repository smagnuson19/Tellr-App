import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styling/base';
import { colors2 } from '../styling/parent';
import {
  fetchUserInfo, fetchTasksWeek, fetchTasksMonth, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory, fetchAllStats, fetchTasksYear, fetchColorMode, fetchParentAnalytics,
} from '../actions/index';
import Style from '../styling/Style';
// import { themeColors } from '../styling/colorModes';


// IMPORTANT !!!!!!!!!
// THIS page includes a loading part to make sure everything is successfully Loaded
// If YOU ADD ITEMS TO LOAD THEN INCREASE THE ITEMS TO LOAD and necessary Parts
class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      fetchNotificationInfo: null,
      fetchGoals: null,
      fetchKidFriends: null,
      fetchAllSocial: null,
      fetchEarningsHistory: null,
      fetchAllStats: null,
      fetchTasksMonth: null,
      fetchTasksYear: null,
      fetchTasksWeek: null,
      fetchParentInfo: null,
      fetchColorMode: null,
      fetchParentAnalytics: null,

    };
  }


  componentDidMount() {
    this.fetchNames();
  }


  // IMPORTANT!!!!!!
  // Logic flow is if there is an error in fetchNotifications
  // We can see if the token is valid or
  // If its a bad token we obviously dont want to continue with the other functions and want to send to go home
  // better way here would be to dispatch error messages/ have something that checks each function
  // userinfo call also checks for bad tokens

  // MAke this an await function for everything to finsih and then return true
  // or false then continue on to next page or not
  // checkForComplete(list) {
  //   counter = 0;
  //   if (list !== undefined) {
  //     for (key in list) {
  //       if (list[key] === null) {
  //         return false;
  //       }
  //       if (list[key] === true) {
  //         counter += 1;
  //       }
  //     }
  //   }
  //
  //   return counter;
  // }


  fetchAtLoad(email) {
    if (this.props.accountInfo != null) {
      if (this.props.accountInfo.accountType === 'Child') {
        this.props.fetchNotificationInfo(email).then((response) => {
          console.log('Notifications pulled in');
          this.setState({ fetchNotificationInfo: true });
          this.props.fetchGoals(email)
            .then(() => {
              console.log('Goals pulled in');

              this.setState({ fetchGoals: true });
            })
            .catch(() => {
              this.setState({ fetchGoals: false });
            });
          this.props.fetchKidFriends(email)
            .then(() => {
              console.log('Friends pulled in');

              this.setState({ fetchKidFriends: true });
            })
            .catch(() => {
              this.setState({ fetchKidFriends: false });
            });
          this.props.fetchAllSocial(email)
            .then(() => {
              console.log('All friends pulled in');
              this.setState({ fetchAllSocial: true });
            })
            .catch(() => {
              this.setState({ fetchAllSocial: false });
            });
          this.props.fetchEarningsHistory(email)
            .then(() => {
              console.log('Earnings pulled in');

              this.setState({ fetchEarningsHistory: true });
            })
            .catch(() => {
              this.setState({ fetchEarningsHistory: false });
            });
          this.props.fetchAllStats(email)
            .then(() => {
              console.log('Stats pulled in');

              this.setState({ fetchAllStats: true });
            })
            .catch(() => {
              this.setState({ fetchAllStats: false });
            });
          this.props.fetchTasksWeek(email)
            .then(() => {
              console.log('W Tasks pulled in');

              this.setState({ fetchTasksWeek: true });
            })
            .catch(() => {
              this.setState({ fetchTasksWeek: false });
            });
          this.props.fetchColorMode(email)
            .then(() => {
              console.log('M Tasks pulled in');

              this.setState({ fetchColorMode: true });
            })
            .catch(() => {
              this.setState({ fetchColorMode: false });
            });
          this.props.fetchTasksMonth(email)
            .then(() => {
              console.log('M Tasks pulled in');

              this.setState({ fetchTasksMonth: true });
            })
            .catch(() => {
              this.setState({ fetchTasksMonth: false });
            });
          this.props.fetchTasksYear(email)
            .then(() => {
              console.log('Y Tasks pulled in');

              this.setState({ fetchTasksYear: true });
            })
            .catch(() => {
              this.setState({ fetchTasksYear: false });
            });
        }).catch((error) => {
          this.setState({ fetchNotificationInfo: false });
        });
      } else if (this.props.accountInfo.accountType === 'Parent') {
        this.props.fetchNotificationInfo(email).then(() => {
          console.log('Notifications pulled in ');

          this.setState({ fetchNotificationInfo: true });
          this.props.fetchParentInfo(email)
            .then(() => {
              console.log('User Info pulled in');

              this.setState({ fetchParentInfo: true });
            })
            .catch(() => {
              this.setState({ fetchParentInfo: false });
            });
          this.props.fetchColorMode(email)
            .then(() => {
              console.log('M Tasks pulled in');

              this.setState({ fetchColorMode: true });
            })
            .catch(() => {
              this.setState({ fetchColorMode: false });
            });
          this.props.fetchParentAnalytics(email)
            .then(() => {
              console.log('M Tasks pulled in');

              this.setState({ fetchParentAnalytics: true });
            })
            .catch(() => {
              this.setState({ fetchParentAnalytics: false });
            });
        }).catch(() => {
          console.log('Error on Notification');
          this.setState({ fetchNotificationInfo: false });
        });
      } else {
        console.log('missing accountTypeID');
        this.goToLogin();
      }
    }
  }

  fetchNames() {
    const { navigation } = this.props;
    const email = navigation.getParam('emailParam', 'NO-EMAIL');
    console.log('Email: ', email);
    // means there should be a token
    if (email === 'NO-EMAIL') {
      AsyncStorage.getItem('email').then((storageEmail) => {
        console.log(storageEmail);
        this.setState({ email: storageEmail });
        if (storageEmail != null) {
          this.props.fetchUserInfo(storageEmail)
            .then(() => {
              // this is going to check that async correctly pulled token AND token is valid
              this.fetchAtLoad(storageEmail);
            }).catch(() => {
              this.goToLogin();
            });
        } else {
          this.goToLogin();
        }
      });
    } else {
      this.setState({ email });
      this.props.fetchUserInfo(email)
        .then(() => {
          // this.fetchAtLoad();
          console.log('happy');
        }).catch(() => {
          this.goToLogin();
        });
    }
  }

  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  loading() {
    console.log(this.state);
    // figure out if Parent or Child user
    // makes sure everything has returned something and then checks whether it
    // was loaded correctly
    // better loading flags should be used here at some point
    if (this.props.accountInfo !== null) {
      if (this.props.accountInfo.accountType === 'Child') {
        if ((this.state.fetchNotificationInfo !== null)
        && (this.state.fetchGoals !== null)
        && (this.state.fetchKidFriends !== null)
        && (this.state.fetchAllSocial !== null)
        && (this.state.fetchEarningsHistory !== null)
        && (this.state.fetchAllStats !== null)
        && (this.state.fetchTasksMonth !== null)
        && (this.state.fetchTasksYear !== null)
        && (this.state.fetchTasksWeek !== null)
        && (this.state.fetchColorMode !== null)
        ) {
          if ((this.state.fetchNotificationInfo === true)
          && (this.state.fetchGoals === true)
          && (this.state.fetchKidFriends === true)
          && (this.state.fetchAllSocial === true)
          && (this.state.fetchEarningsHistory === true)
          && (this.state.fetchAllStats === true)
          && (this.state.fetchTasksMonth === true)
          && (this.state.fetchTasksYear === true)
          && (this.state.fetchTasksWeek === true)
          && (this.state.fetchColorMode === true)
          ) {
            if (this.props.mode.color === 0) {
              this.props.navigation.navigate('ChildTabBarLight');
            } else if (this.props.mode.color === 1) {
              this.props.navigation.navigate('ChildTabBarDark');
            }
          } else {
            this.goToLogin();
          }
        }
      } else if (this.props.accountInfo.accountType === 'Parent') {
        if ((this.state.fetchNotificationInfo !== null)
        && (this.state.fetchParentInfo !== null)
        && (this.state.fetchColorMode !== null)
        && (this.state.fetchParentAnalytics !== null)


        ) {
          if ((this.state.fetchNotificationInfo === true)
        && (this.state.fetchParentInfo === true)
        && (this.state.fetchColorMode === true)
        && (this.state.fetchParentAnalytics === true)

          ) {
            if (this.props.mode.color === 0) {
              this.props.navigation.navigate('ParentTabBarLight');
            } else if (this.props.mode.color === 1) {
              this.props.navigation.navigate('ParentTabBarDark');
            }
          } else {
            this.goToLogin();
          }
        }
      } else {
        console.log('Error in Loading', this.props.accountInfo.accountType);
      }
    }
  }

  render() {
    // function will timeout if not everything is called in 15 seconds
    if (this.state.email != null) {
      console.log('going into loading');
      this.loading();
    }

    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors2.linearGradientBottom]} style={Style.gradient}>
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
    mode: state.user.colorMode,
  });


export default connect(mapStateToProps, {
  fetchUserInfo, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory, fetchAllStats, fetchTasksWeek, fetchTasksMonth, fetchTasksYear, fetchColorMode, fetchParentAnalytics,

})(Loading);
