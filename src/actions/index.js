import axios from 'axios';
import AsyncStorage from 'React';
// import AsyncStorage from 'react';

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
};

// export function fetchPosts() {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
//       dispatch({ type: ActionTypes.FETCH_POSTS, payload: (response.data) });
//     }).catch((error) => {
//       dispatch({ type: ActionTypes.FETCH_POSTS, payload: null });
//     });
//   };
// }

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// auth user to
// give them a new token
export function postNewUser(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/users`, { payLoad })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        console.log(`postNewUser post response ${response.data[0]}`);
      }).catch((error) => {
        console.log(`postNewUser Post Error: ${error.response.data[0]}`);
      });
  };
}

export function postTaskVerified(payLoad, userEmail, priority) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/tasks/verified`, { payLoad })
      .then((response) => {
        console.log(`postTaskVerified post response ${response.data}`);
        const postData = {
          email: userEmail,
          priority,
        };
        return this.postNotifications(postData);
      }).catch((error) => {
        console.log(`postTaskVerfied Post Error: ${error.response.data[0].Error}`);
      });
  };
}


export function postGoalApprove(payLoad, priority) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/goals/approve`, { payLoad })
      .then((response) => {
        console.log(`postGoalApprove post response ${response.data}`);
        const postData = {
          email: payLoad.senderEmail,
          priority,
        };
        return this.postNotifications(postData);
      }).catch((error) => {
        console.log(`postNotifications Post Error: ${error.response.data[0].Error}`);
      });
  };
}

export function postNotifications(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/notifications`, { payLoad })
      .then((result) => {
        console.log(`postNotifications post response ${result.data}`);
        // want to reload notification info and we currently do not
        // get a return of new notifications
        return this.fetchNotificationInfo(payLoad.email);
      }).catch((error) => {
        console.log(`postNotifications Post Error: ${error.response.data[0].Error}`);
      });
  };
}


export function postTaskCompleted(payLoad, priority) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/tasks/completed`, { payLoad })
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
        console.log(`postTaskCompletion Post Error: ${error.response.data[0].Error}`);
      });
  };
}

export function postTask(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/tasks`, { payLoad })
      .then((response) => {
        console.log(`Task Created: ${response.data}`);
      }).catch((error) => {
        console.log(`postTask post Error: ${error.response.data[0].Error}`);
      });
  };
}

// use the below when auth is fully implemented - go to login and comment out {email, password}
// export function loginUser({ email, password }, resetAction) {
//   return (dispatch) => {
//     axios.post(`${ROOT_URL}/credentials`, { email, password }).then((response) => {
export function loginUser(email, password, resetAction) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/${email}/credentials/${password}`).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      if (response.data.token) {
        localStorage.setItem('ACCESS_TOKEN', response.data.token);
      }

      // console.log(response.data[0].Success);
    }).catch((error) => {
      console.log(`LoginError: ${error.response.data[0].Error}`);
      // bug in error on backend
      dispatch(authError(`${error.response.data[0].Error}`));
    });
  };
}

export async function deleteToken() {
  try {
    await AsyncStorage.removeItem('ACCESS_TOKEN');
  } catch (err) {
    console.log(`The error is: ${err}`);
  }
}

export function logoutUser() {
  return (dispatch) => {
    deleteToken();
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}


export function fetchUserInfo(email) {
  return (dispatch) => {
    return axios.get(`${ROOT_URL}/users/${email}`).then((response) => {
      console.log(response.data);
      dispatch({
        type: ActionTypes.FETCH_USER,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(`${error.response.data[0].Error}`);
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
    return axios.get(`${ROOT_URL}/notifications/${email}`).then((response) => {
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
      console.log(`Notifications Grab Error: ${error.response.data[0].Error}`);
    });
  };
}

export function fetchGoals(email) {
  return (dispatch) => {
    console.log('INSIDDE FETCH GOALS');
    console.log(email);
    return axios.get(`${ROOT_URL}/goals/${email}`).then((response) => {
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
      console.log(`Error in fetchGoals fetch ${error.response.data[0].Error}`);
    });
  };
}

export function postUpdateBalance(payLoad, email) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/balance`, { payLoad })
      .then((response) => {
        console.log(`updateBalance: ${payLoad.data}`);
        return fetchUserInfo(email);
      }).catch((error) => {
        console.log(`Error in postUpdateBalance post ${error.response.data[0].Error}`);
      });
  };
}

export function postRedeemMoney(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/redeemmoney`, { payLoad })
      .then((response) => {
        console.log(`postRedeemMoney: ${response.data}`);
        return axios.get(`${ROOT_URL}/users/${payLoad.email}`).then((res) => {
          console.log(res.data);
          dispatch({
            type: ActionTypes.FETCH_USER,
            payload: res.data,
          });
        });
      }).catch((error) => {
        console.log(`Error in postRedeemMoney post ${error.response.data[0].Error}`);
      });
  };
}

export function postGoalRedeem(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/redeem`, { payLoad })
      .then((response) => {
        console.log(`postGoalRedeem: ${response.data}`);

        return axios.get(`${ROOT_URL}/users/${payLoad.email}`).then((res) => {
          console.log(res.data);
          dispatch({
            type: ActionTypes.FETCH_USER,
            payload: res.data,
          });
        });
      }).catch((error) => {
        console.log(`Error in postGoalsRedeem post ${error.response.data[0].Error}`);
      });
  };
}

export function postGoal(payLoad) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/goals`, { payLoad })
      .then((response) => {
        console.log(`postGoal: ${response.data[0]}`);
        // return this.fetchGoals(payLoad.email);
      }).catch((error) => {
        console.log(`Error in postGoal post ${error.response.data[0].Error}`);
      });
  };
}

export function fetchKidGoals(email) {
  return axios.get(`${ROOT_URL}/goals/${email}`).then((response) => {
    // make a list of the parent's children
    const payload = response.data;
    const list = [];
    Object.keys(payload).forEach((key) => {
      list.push(payload[key]);
    });
    return list;
  });
}

export function fetchKidTasks(email) {
  console.log('HEY');
  return axios.get(`${ROOT_URL}/childtasks/${email}`).then((response) => {
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
  });
}

// Fetch Parent Information -> fetch all child Info as well
export function fetchParentInfo(email) {
  return (dispatch) => {
    return axios.get(`${ROOT_URL}/children/${email}`).then((response) => {
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
      console.log(`Error in fetchParentInfo fetch ${error.response.data[0].Error}`);
    });
  };
}

// deleteAccount()

//
