import axios from 'axios';
import AsyncStorage from 'react';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://tellr-dartmouth.herokuapp.com/api';
const API_KEY = '';


// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  RETRIVE_USER: 'RETRIVE_USER',
  RETRIVE_FAMILY: 'RETRIVE_FAMILY',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: (response.data) });
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: null });
    });
  };
}


export function fetchUserInfo() {
  const familyInfo = {};
  AsyncStorage.multiGet(['emailID', 'familyID', 'accountTypeID'], (err, result) => {
    for (let i = 0; i < result.length; i++) {
      const nameExtract = result[i][0];

      const valExtract = result[i][1].slice(1, -1);
      familyInfo[nameExtract] = valExtract;
    }

    this.setState({
      accountType: familyInfo.accountTypeID,
      email: familyInfo.emailID,
    });
    // different avenues to retrive data
    this.fetchUserInformation(familyInfo.accountTypeID, familyInfo.emailID);
    // this.setState({ senderEmail: API_KEY_USERS });
  });
}
