import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
} from 'react-native';
import { NativeRouter as Router, Route, Switch } from 'react-router-native';
import Style from './Style';
import BottomTabBar from './navigation/bottom_tab_bar';
import Home from './components/home';


const LandingPage = (props) => {
  return (
    <Home />
  );
};

//  <BottomTabBar /> - put this in below, was buggy error
const App = (props) => {
  return (
    <Router>
      <View style={Style.rootContainer}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </View>
    </Router>
  );
};

export default App;
