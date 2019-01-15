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
  RETRIVE_USER: 'RETRIVE_USER',
  RETRIVE_FAMILY: 'RETRIVE_FAMILY',
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
      console.log(error.response.data[0].Error);
      // bug in error on backend
      dispatch(authError(`${error.response.data[0].Error}`));
    });
  };
}


export function

// export function fetchUserInfo() {
//   const familyInfo = {};
//   AsyncStorage.multiGet(['emailID', 'familyID', 'accountTypeID'], (err, result) => {
//     for (let i = 0; i < result.length; i++) {
//       const nameExtract = result[i][0];
//
//       const valExtract = result[i][1].slice(1, -1);
//       familyInfo[nameExtract] = valExtract;
//     }
//
//     this.setState({
//       accountType: familyInfo.accountTypeID,
//       email: familyInfo.emailID,
//     });
//     // different avenues to retrive data
//     this.fetchUserInformation(familyInfo.accountTypeID, familyInfo.emailID);
//     // this.setState({ senderEmail: API_KEY_USERS });
//   });
// }
