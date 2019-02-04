import React, { Component } from 'react';
// import ImageBrowser from 'react-native-interactive-image-gallery';
// import ImagePicker from 'react-native-image-picker';
import {
  // View,
  // Text,
  // Image,
  Animated,
  // StyleSheet,

} from 'react-native';
// import {
//   Button, FormInput, Divider,
// } from 'react-native-elements';
// import { connect } from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';
// import { StackActions, NavigationActions } from 'react-navigation';
// import { postGoal } from '../actions';
// import Style from '../styling/Style';
// // import { colors, fonts } from '../styling/base';
// import { colors } from '../styling/base';

export default class GrowView extends Component {
  state = {
    gAnim: new Animated.Value(150), // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(// Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 500, // Animate to opacity: 1 (opaque)
        duration: 100000, // Make it take a while
      },
    ).start();// Starts the animation
  }

  render() {
    const { gAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          width: gAnim, // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
