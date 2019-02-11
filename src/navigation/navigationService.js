import { NavigationActions } from 'react-navigation';

let _navigator;

// Using this as a bypass to redux as it is no longer supported
// defined this as top level navigator in app.js
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

// navigate to wherver you want
function navigate(routeName, params) {
  console.log('navigating');
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
