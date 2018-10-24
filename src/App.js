import React from 'react';
import {
  View,
} from 'react-native';
import { NativeRouter as Router, Route, Switch } from 'react-router-native';
import Style from './styling/Style';
// import BottomTabBar from './navigation/bottom_tab_bar';
import Home from './components/home';


//  <BottomTabBar /> - put this in below, was buggy error
const App = (props) => {
  return (
    <Router>
      <View style={Style.rootContainer}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </View>
    </Router>
  );
};

export default App;
