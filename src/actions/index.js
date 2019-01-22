import axios from 'axios';
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
          email: payLoad.senderEemail,
          priority,
        };
        return this.postNotifications(postData);
      }).catch((error) => {
        console.log(`postNotifications Post Error: ${error.response.data[0].Error}`);
      });
  };
}

export function postNotifications(payLoad) {
  console.log('Hello');
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
        localStorage.setItem('token', response.data.token);
      }

      // console.log(response.data[0].Success);
    }).catch((error) => {
      console.log(`LoginError: ${error.response.data[0].Error}`);
      // bug in error on backend
      dispatch(authError(`${error.response.data[0].Error}`));
    });
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

// Fetch Parent Information
export function fetchParentInfo(email) {
  return (dispatch) => {
    return axios.get(`${ROOT_URL}/children/${email}`).then((response) => {
      // make a list of the parent's children

      const payload = response.data;
      let childList = [];
      console.log(payload);
      if ((Object.keys(payload).length > 0)) {
        Object.keys(payload).forEach((key) => {
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
      console.log(`${error.response.data[0].Error}`);
    });
  };
}
