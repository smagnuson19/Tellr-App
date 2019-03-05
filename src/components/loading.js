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
  fetchUserInfo, fetchTasksWeek, fetchTasksMonth, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory, fetchAllStats, fetchTasksYear, fetchColorMode,
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
<<<<<<< HEAD
    initialChildFetchCheck = {
      fetchNotificationInfo: null,
      fetchGoals: null,
      fetchKidFriends: null,
      fetchAllSocial: null,
      fetchEarningsHistory: null,
      fetchAllStats: null,
      fetchTasksMonth: null,
      fetchTasksYear: null,
      fetchTasksWeek: null,
      fetchUserInfo: null,
    };

    intialParentFetchCheck = {
      fetchNotificationInfo: null,
      fetchParentInfo: null,
      fetchUserInfo: null,
    };
    if (this.props.accountInfo.accountType === 'Child') {
      this.props.fetchNotificationInfo(email).then((response) => {
        console.log('Notifications pulled in');
        initialChildFetchCheck.fetchNotificationInfo = true;
        this.props.fetchGoals(email)
          .then(() => {
            console.log('Goals pulled in');
            initialChildFetchCheck.fetchGoals = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchGoals = false;
          });
        this.props.fetchKidFriends(email)
          .then(() => {
            console.log('Friends pulled in');
            initialChildFetchCheck.fetchKidFriends = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchKidFriends = false;
          });
        this.props.fetchAllSocial(email)
          .then(() => {
            console.log('All friends pulled in');
            initialChildFetchCheck.fetchAllSocial = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchAllSocial = false;
          });
        this.props.fetchEarningsHistory(email)
          .then(() => {
            console.log('Earnings pulled in');
            initialChildFetchCheck.fetchEarningsHistory = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchEarningsHistory = true;
          });
        this.props.fetchAllStats(email)
          .then(() => {
            console.log('Stats pulled in');
            initialChildFetchCheck.fetchAllStats = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchAllStats = false;
          });
        this.props.fetchTasksWeek(email)
          .then(() => {
            console.log('W Tasks pulled in');
            initialChildFetchCheck.fetchTasksWeek = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchTasksWeek = false;
          });
        this.props.fetchTasksMonth(email)
          .then(() => {
            console.log('M Tasks pulled in');
            initialChildFetchCheck.fetchTasksMonth = true;
          })
          .catch(() => {
            initialChildFetchCheck.fetchTasksMonth = false;
          });
        this.props.fetchTasksYear(email)
          .then(() => {
            console.log('Y Tasks pulled in');
            initialChildFetchCheck.fetchTasksYear = true;
          })
          .catch(() => {
            nitialChildFetchCheck.fetchTasksYear = false;
          });
      }).catch((error) => {
        initialChildFetchCheck.fetchNotificationInfo = false;
      });
        while
      return intitialChildFetchCheck
    } else if (this.props.accountInfo.accountType === 'Parent') {
      this.props.fetchNotificationInfo(email).then(() => {
        console.log('Notifications pulled in ');
        initialParentFetchCheck.fetchNotificationInfo = true;
        this.props.fetchParentInfo(email)
          .then(() => {
            console.log('User Info pulled in');
            initialParentFetchCheck.fetchParentInfo = true;
          })
          .catch(() => {
            initialParentFetchCheck.fetchParentInfo = true;
          });
      }).catch(() => {
        console.log('Error on Notification');
        initialParentFetchCheck.fetchNotificationInfo = false;
      });
    } else {
      console.log('missing accountTypeID');
      this.setState({ loginVerify: false });
=======
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
        }).catch(() => {
          console.log('Error on Notification');
          this.setState({ fetchNotificationInfo: false });
        });
      } else {
        console.log('missing accountTypeID');
        this.goToLogin();
      }
>>>>>>> secure login updated
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
<<<<<<< HEAD
    let chooseRoute;
    if (this.props.accountInfo !== null && this.props.mode !== null) {
      if (this.props.accountInfo.accountType === 'Child') {
        if (this.props.mode.color === 0) {
          chooseRoute = 'ChildTabBarLight';
        } else if (this.props.mode.color === 1) {
          chooseRoute = 'ChildTabBarDark';
        } else {
          console.log('Error in Loading', this.props.mode.color);
        }
      } else if (this.props.accountInfo.accountType === 'Parent') {
        if (this.props.mode.color === 0) {
          chooseRoute = 'ParentTabBarLight';
        } else if (this.props.mode.color === 1) {
          chooseRoute = 'ParentTabBarDark';
        } else {
          console.log('Error in Loading', this.props.mode.color);
        }
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
          if (this.state.loginVerify) {
            this.props.navigation.navigate(chooseRoute);
=======
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
          ) {
            this.props.navigation.navigate('ChildTabBar');
          } else {
            this.goToLogin();
          }
        }
      } else if (this.props.accountInfo.accountType === 'Parent') {
        if ((this.state.fetchNotificationInfo !== null)
        && (this.state.fetchParentInfo !== null)
        ) {
          if ((this.state.fetchNotificationInfo === true)
        && (this.state.fetchParentInfo === true)
          ) {
            this.props.navigation.navigate('ParentTabBar');
>>>>>>> secure login updated
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

<<<<<<< HEAD

export default connect(mapStateToProps, {

  fetchUserInfo, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory, fetchAllStats, fetchTasksWeek, fetchTasksMonth, fetchTasksYear, fetchColorMode,
=======
export default connect(mapStateToProps, {
  fetchUserInfo, fetchNotificationInfo, fetchParentInfo, fetchGoals, fetchKidFriends, fetchAllSocial, fetchEarningsHistory, fetchAllStats, fetchTasksWeek, fetchTasksMonth, fetchTasksYear,
>>>>>>> secure login updated

})(Loading);
