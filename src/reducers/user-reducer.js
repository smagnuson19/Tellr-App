import { ActionTypes } from '../actions';

const UserReducer = (
  state =
  {
    info: null,
    notifications: null,
    family: null,
    goals: null,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return {
        info: action.payload,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
      };
    case ActionTypes.FETCH_FAMILY:
      return {
        info: state.info,
        family: action.payload,
        notifications: state.notifications,
        goals: state.goals,
      };
    case ActionTypes.FETCH_NOTIFICATIONS:
      return {
        info: state.info,
        family: state.family,
        notifications: action.payload,
        goals: state.goals,
      };
    case ActionTypes.FETCH_GOALS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
