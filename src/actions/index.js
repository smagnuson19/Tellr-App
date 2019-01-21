import axios from 'axios';
// import AsyncStorage from 'react';

// const ROOT_URL = 'http://127.0.0.1:5000/api';
const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
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

export function postTask(payload) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/tasks`, { payload })
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(`PostError: ${error.response.data[0].Error}`);
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


// fetchNames() {
//   const { navigation } = this.props;
//   const email = navigation.getParam('emailParam', 'NO-EMAIL');
//   return axios.get(`${ROOT_URL}/users/${email}`).then((response) => {
//     const payload = response.data;
//     console.log(payload);
//     this.setState({ accountType: payload.accountType });
//
//     AsyncStorage.setItem('familyID', JSON.stringify(payload.familyName), () => {
//     });
//
//     AsyncStorage.setItem('accountTypeID', JSON.stringify(payload.accountType), () => {
//     });
//     AsyncStorage.setItem('accountNameID', JSON.stringify(`${payload.firstName} ${payload.lastName}`), () => {
//     });
//     if (this.state.accountType === 'Child') {
//       AsyncStorage.setItem('balanceID', JSON.stringify(payload.balance), () => {
//       });
//     }
//   }).catch((error) => {
//     console.log('ERROR in Loading');
//   });
// }

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

// Fetch notification information with email
export function fetchNotificationInfo(email) {
  return (dispatch) => {
    return axios.get(`${ROOT_URL}/notifications/${email}`).then((response) => {
      const payload = response.data;
      let itemList = [];
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
