import { ActionTypes } from '../actions';

const UserReducer = (
  state =
  { name: '' },
  action,
) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        authenticated: true,
      };
    case ActionTypes.DEAUTH_USER:
      return {
        authenticated: false,
      };
    case ActionTypes.AUTH_ERROR:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
