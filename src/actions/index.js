import axios from 'axios';
import { AsyncStorage } from 'react-native';
import deviceStorage from './deviceStorage';
import navigationService from '../navigation/navigationService';


const ROOT_URL = 'http://127.0.0.1:5000/api';
// const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
// const API_KEY = '';


// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  FETCH_FAMILY: 'FETCH_FAMILY',
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  FETCH_GOALS: 'FETCH_GOALS',
  FETCH_FRIENDINFO: 'FETCH_FRIENDINFO',
  FETCH_IND: 'FETCH_IND',
  FETCH_ALL_SOC: 'FETCH_ALL_SOC',
  FETCH_EARNINGS: 'FETCH_EARNINGS',
};

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export async function deleteTokens() {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
  } catch (err) {
    console.log(`The error is: ${err}`);
  }
  console.log('Token and email removed');
}

// Send to url to delete token
export function logoutUser() {
  return (dispatch) => {
    deleteTokens();
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}

export function errorHandling(message, error) {
  console.log(message + error);
  if (error === ('Invalid Token' || 'Expired Token')) {
    console.log('Invalid Token -> Send to home');
    logoutUser();
    // want to go back to the login page
    navigationService.navigate('Login');
  }
}
// use the below when auth is fully implemented - go to login and comment out {email, password}
export function loginUser(payLoad, resetAction) {
  console.log(payLoad);
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/auth/login`, { payLoad }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      deviceStorage.saveItem('token', response.data[0].Token).then((error) => {
        console.log(error);
      });
      deviceStorage.saveItem('email', payLoad.email).then((error) => {
        console.log(error);
      });


      // something should happen in case this fails?

      // console.log(response.data[0].Success);
    }).catch((error) => {
      console.log(`LoginError: ${error.response.data[0].Error}`);
      // bug in error on backend
      dispatch(authError(`${error.response.data[0].Error}`));
    });
  };
}

// auth user to
// give them a new token
export function postNewUser(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/auth/register`, { payLoad })
      .then((response) => {
        console.log(`postNewUser post response ${response.data[0].Token}`);
        dispatch({ type: ActionTypes.AUTH_USER });
        deviceStorage.saveItem('token', response.data[0].Token).then((error) => {
          console.log(error);
        });
        deviceStorage.saveItem('email', payLoad.email).then((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error.response.data[0].Error);
        dispatch(authError(`${error.response.data[0].Error}`));
      });
  };
}

export function postTaskVerified(payLoad, userEmail, priority) {
  console.log('The payload I am sending: ');
  console.log(payLoad);
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/tasks/verified`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postTaskVerified post response ${response.data}`);
          const postData = {
            email: userEmail,
            priority,
          };
          return this.postNotifications(postData);
        }).catch((error) => {
          errorHandling('postTaskVerfied Post Error: ', error.response.data[0].Error);
        });
    });
  };
}


export function postGoalApprove(payLoad, priority) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/goals/approve`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postGoalApprove post response ${response.data}`);
          const postData = {
            email: payLoad.senderEmail,
            priority,
          };
          return this.postNotifications(postData);
        }).catch((error) => {
          errorHandling('`postNotifications Post Error:', error.response.data[0].Error);
        });
    });
  };
}

export function postNotifications(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/notifications`, { payLoad }, { headers: { authorization: token } })
        .then((result) => {
          console.log(`postNotifications post response ${result.data}`);
          // want to reload notification info and we currently do not
          // get a return of new notifications
          return this.fetchNotificationInfo(payLoad.email);
        }).catch((error) => {
          console.log(error);
          errorHandling('postNotifications Post Error:', error.response.data[0].Error);
        });
    });
  };
}

export function postNotificationsAlt(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/notifications`, { payLoad }, { headers: { authorization: token } })
        .then((result) => {
          console.log(`postNotifications post response ${result.data}`);
          // want to reload notification info and we currently do not
          // get a return of new notifications
          return axios.get(`${ROOT_URL}/notifications/${payLoad.email}`, { headers: { authorization: token } })
            .then((response) => {
              const payload = response.data;
              let itemList = [];
              console.log(response);
              if (Object.keys(payload).length > 0) {
                Object.keys(payload).forEach((key) => {
                  itemList.push(payload[key]);
                });
              } else {
                itemList = null;
              }
              console.log(`NotificationList: ${itemList}`);

              dispatch({
                type: ActionTypes.FETCH_NOTIFICATIONS,
                payload: itemList,
              });
            }).catch((error) => {
              console.log(error);
              errorHandling(
                'Notifications Grab Error: ',
                error.response.data[0].Error,
              );
            });
        });
    }).catch((error) => {
      console.log(error);
      errorHandling('postNotifications Post Error:', error.response.data[0].Error);
    });
  };
}

export function postTaskCompleted(payLoad, priority) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/tasks/completed`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postTaskCompleted post response: ${response.data}`);
          const postData = {
            email: payLoad.email,
            priority,
          };
          console.log(postData);
          // need to alert the backend that some
          return this.postNotifications(postData);
        }).catch((error) => {
          errorHandling(
            'postTaskCompletion Post Error:',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postTask(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/tasks`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Task Created: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postTask post Error:',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postRequest(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/addfriend`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Friend request sent: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postRequest post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postForgotPassword(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/auth/forgotpassword`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Forgot password email sent: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postForgotPassword post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postChangePassword(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/auth/changepassword`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Change password email sent: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postChangePassword post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postDeleteAccount(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/delete`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Account deleted: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'deleteAccount post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}


export function postParentDeleteAccount(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/deleteall`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Parent account and associated children deleted: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postParentDelete post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postFriendApprove(payLoad, priority) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/acceptfriends`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Friend request approved: ${response.data}`);
          // const postData = {
          //   email: payLoad.email,
          //   priority,
          // };
          // need to alert the backend that some
          // return this.postNotifications(postData);
        }).catch((error) => {
          console.log(error);
          errorHandling(
            'postFriendApprove post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postRemoveFriend(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/removefriends`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`Friend Removed: ${response.data}`);
        }).catch((error) => {
          errorHandling(
            'postRemoveFriend post Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}


export function fetchUserInfo(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/users/${email}`, { headers: { authorization: token } })
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: ActionTypes.FETCH_USER,
            payload: response.data,
          });
        }).catch((error) => {
          errorHandling(
            'fetchUserInfo fail : ',
            error.response.data[0].Error,
          );
        });
    });
  };
}


// function addToList(dictionary, item) {
//   let dictionary = dict
//   const type = item.notificationType;
//   if (Object.prototype.hasOwnProperty.call(dict, type)) {
//     dict.type.push(item);
//   }
//   else {
//     dict.type = [item]
//
//   }
//   return dict;

export function fetchNotificationInfo(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/notifications/${email}`, { headers: { authorization: token } })
        .then((response) => {
          const payload = response.data;
          let itemList = [];
          console.log(response);
          if (Object.keys(payload).length > 0) {
            Object.keys(payload).forEach((key) => {
              itemList.push(payload[key]);
            });
          } else {
            itemList = null;
          }
          console.log(`NotificationList: ${itemList}`);

          dispatch({
            type: ActionTypes.FETCH_NOTIFICATIONS,
            payload: itemList,
          });
        }).catch((error) => {
          errorHandling(
            'Notifications Grab Error: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function fetchGoals(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/goals/${email}`, { headers: { authorization: token } }).then((response) => {
        console.log(`fetchGoals: ${response.data}`);
        // make a list of the parent's children
        const gList = response.data;
        const goalList = [];
        // loop through each kid and make an object for them with FirstName, Email
        Object.keys(gList).forEach((key) => {
          if (gList[key].approved === 1) {
            goalList.unshift({
              key,
              goalName: gList[key].name,
              goalValue: gList[key].value,
              goalDescription: gList[key].description,
              goalImage: gList[key].image,
              App: gList[key].approved,
              redeemed: gList[key].redeemed,
              // goalProgress: (parseFloat(this.state.balance)/parseFloat(gList[key].value));
            });
          } else {
            console.log(`Goal ${gList[key.name]} not approved`);
          }// end else
        });// end for each

        const defaultGoal = {
          goalName: 'This Is the Goal Tab',
          goalDescription: 'Add Goals Below or Redeem Completed Goals',
          goalImage: 'http://chittagongit.com//images/goal-icon/goal-icon-4.jpg',
          goalValue: 0,
          App: 1,
          redeemed: true,
        };

        if (goalList.length === 0) {
          goalList.push(defaultGoal);
        }
        dispatch({
          type: ActionTypes.FETCH_GOALS,
          payload: goalList,
        });
      }).catch((error) => {
        errorHandling(
          'Error in fetchGoals fetch: ',
          error.response.data[0].Error,
        );
      });
    });
  };
}

export function postUpdateBalance(payLoad, email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/balance`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`updateBalance: ${payLoad.data}`);
          return fetchUserInfo(email);
        }).catch((error) => {
          errorHandling(
            'Error in postUpdateBalance post: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postRedeemMoney(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/redeemmoney`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postRedeemMoney: ${response.data}`);
          return axios.get(`${ROOT_URL}/users/${payLoad.email}`, { headers: { authorization: AsyncStorage.getItem('token') } }).then((res) => {
            console.log(res.data);
            dispatch({
              type: ActionTypes.FETCH_USER,
              payload: res.data,
            });
          });
        }).catch((error) => {
          errorHandling(
            'Error in postRedeemMoney post: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postGoalRedeem(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/redeem`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postGoalRedeem: ${response.data}`);

          return axios.get(`${ROOT_URL}/users/${payLoad.email}`, { headers: { authorization: AsyncStorage.getItem('token') } }).then((res) => {
            console.log(res.data);
            dispatch({
              type: ActionTypes.FETCH_USER,
              payload: res.data,
            });
          });
        }).catch((error) => {
          errorHandling(
            'Error in postGoalsRedeem post: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function postGoal(payLoad) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.post(`${ROOT_URL}/goals`, { payLoad }, { headers: { authorization: token } })
        .then((response) => {
          console.log(`postGoal: ${response.data[0]}`);
          // return this.fetchGoals(payLoad.email);
          errorHandling('bla', 'Invalid Token');
        }).catch((error) => {
          errorHandling(
            'Error in postGoal post: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function fetchKidGoals(email) {
  return AsyncStorage.getItem('token').then((token) => {
    return axios.get(`${ROOT_URL}/goals/${email}`, { headers: { authorization: token } })
      .then((response) => {
      // make a list of the parent's children
        const payload = response.data;
        const list = [];
        Object.keys(payload).forEach((key) => {
          list.push(payload[key]);
        });
        return list;
      }).catch((error) => {
        errorHandling(
          'Error in fetchKidGoals: ',
          error.response.data[0].Error,
        );
      });
  });
}

export function fetchKidTasks(email) {
  console.log('HEY');
  return AsyncStorage.getItem('token').then((token) => {
    return axios.get(`${ROOT_URL}/childtasks/${email}`, { headers: { authorization: token } })
      .then((response) => {
      // make a list of the parent's children
        const payload = response.data;
        const list = [];
        Object.keys(payload).forEach((key) => {
          list.push({
            name: payload[key].taskName,
            value: payload[key].reward,
            description: payload[key].taskDescription,
          });
        });
        console.log(list);
        return list;
      }).catch((error) => {
        errorHandling(
          'Error in fetchKidTasks: ',
          error.response.data[0].Error,

        );
      });
  });
}

// Fetch Parent Information -> fetch all child Info as well
export function fetchParentInfo(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/children/${email}`, { headers: { authorization: token } })
        .then((response) => {
          // make a list of the parent's children
          const payload = response.data;
          // Want to do this for every Kid
          let childList = [];
          // console.log(`fetchParentPay :${payload[0]}`);
          if ((Object.keys(payload).length > 0)) {
            Object.keys(payload).forEach((key) => {
              axios.all([fetchKidGoals(payload[key].email), fetchKidTasks(payload[key].email)])
                .then(axios.spread((goals, tasks) => {
                  console.log(payload[key]);

                  payload[key].goals = goals;
                  payload[key].tasks = tasks;
                }));
              // adding goals and tasks Json objects to payLoad
              // fetchKidGoals(payload[key].email).then((kidsGoals) => {
              //   console.log(kidsGoals);
              //
              // });
              //
              // payload[key].put('tasks', fetchKidTasks(payload[key].email));
              console.log(payload[key]);
              childList.push(payload[key]);
            });
          } else {
            childList = null;
          }
          console.log(`Fetched Parent Info ${childList}`);
          dispatch({
            type: ActionTypes.FETCH_FAMILY,
            payload: childList,
          });
        }).catch((error) => {
          errorHandling(
            'Error in fetchParentInfo fetch: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function fetchKidFriends(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/social/${email}`, { headers: { authorization: token } })
        .then((response) => {
          console.log('fetched kid friends');
          dispatch({
            type: ActionTypes.FETCH_FRIENDINFO,
            payload: response.data,
          });
        });
    }).catch((error) => {
      errorHandling(
        'Error in fetchKidFriends: ',
        error.response.data[0].Error,
      );
    });
  };
}

export function fetchIndividualSocial(email) {
  return AsyncStorage.getItem('token').then((token) => {
    return axios.get(`${ROOT_URL}/social/taskhistory/${email}`, { headers: { authorization: token } })
      .then((response) => {
        // make a list of the parent's children
        const payload = response.data;
        const list = [];
        Object.keys(payload).forEach((key) => {
          list.push(payload[key]);
        });
        return list;
      }).catch((error) => {
        errorHandling(
          'Error in fetchKidGoals: ',
          error.response.data[0].Error,
        );
      });
  });
}

export function fetchEarningsHistory(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/history/${email}`, { headers: { authorization: token } })
        .then((response) => {
          // make a list of the parent's children
          const payload = response.data;
          const list = [];
          Object.keys(payload).forEach((key) => {
            list.push(payload[key]);
          });
          dispatch({
            type: ActionTypes.FETCH_EARNINGS,
            payload: list,
          });
        }).catch((error) => {
          errorHandling(
            'Error in fetchEarningsHistory: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}

export function fetchAllSocial(email) {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      return axios.get(`${ROOT_URL}/social/${email}`, { headers: { authorization: token } })
        .then((response) => {
          // make a list of the kid's friends
          const payload = response.data;
          // Want to do this for every Kid
          let friendList = [];
          // console.log(`fetchParentPay :${payload[0]}`);

          if ((Object.keys(payload).length > 0)) {
            Object.keys(payload).forEach((key) => {
              axios.all([fetchIndividualSocial(key)])
                .then(axios.spread((taskhist) => {
                  console.log(payload[key]);
                  payload[key].taskhist = taskhist;
                }));
              // adding goals and tasks Json objects to payLoad
              // fetchKidGoals(payload[key].email).then((kidsGoals) => {
              //   console.log(kidsGoals);
              //
              // });
              //
              // payload[key].put('tasks', fetchKidTasks(payload[key].email));
              console.log(payload[key]);
              friendList.push(payload[key]);
            });
          } else {
            friendList = null;
          }
          console.log(`Fetched Friends Info ${friendList}`);
          dispatch({
            type: ActionTypes.FETCH_ALL_SOC,
            payload: friendList,
          });
        }).catch((error) => {
          errorHandling(
            'Error in fetchAllSocial fetch: ',
            error.response.data[0].Error,
          );
        });
    });
  };
}
