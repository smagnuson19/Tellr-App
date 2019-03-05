import { ActionTypes } from '../actions';

const UserReducer = (
  state =
  {
    info: null,
    notifications: null,
    family: null,
    goals: null,
    friendInfo: null,
    allFriend: null,
    earnings: null,
    allStats: null,
    colorMode: null,
    wTasks: null,
    mTasks: null,
    yTasks: null,
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
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_FAMILY:
      return {
        info: state.info,
        family: action.payload,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_NOTIFICATIONS:
      return {
        info: state.info,
        family: state.family,
        notifications: action.payload,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_GOALS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: action.payload,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_WCOMPLETED_TASKS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: action.payload,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_MCOMPLETED_TASKS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: action.payload,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_YCOMPLETED_TASKS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: action.payload,
      };
    case ActionTypes.FETCH_FRIENDINFO:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: action.payload,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_ALL_SOC:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: action.payload,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_EARNINGS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: action.payload,
        allStats: state.allStats,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_STATS:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: action.payload,
        colorMode: state.colorMode,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    case ActionTypes.FETCH_COLORMODE:
      return {
        info: state.info,
        family: state.family,
        notifications: state.notifications,
        goals: state.goals,
        friendInfo: state.friendInfo,
        allFriend: state.allFriend,
        earnings: state.earnings,
        allStats: state.allStats,
        colorMode: action.payload,
        wTasks: state.wTasks,
        mTasks: state.mTasks,
        yTasks: state.yTasks,
      };
    default:
      return state;
  }
};

export default UserReducer;
