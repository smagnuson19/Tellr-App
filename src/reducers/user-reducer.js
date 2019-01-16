import { ActionTypes } from '../actions';

const UserReducer = (
  state =
  { info: {} },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      console.log('THIS IS WORKING');
      return {
        info: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
