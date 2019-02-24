import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { ViewPager } from 'rn-viewpager';

import StepIndicator from 'react-native-step-indicator';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-elements';
import Style from '../../styling/Style';
import { colors } from '../../styling/base';
// import { dimensions } from '../../styling/base';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];
const labels = ['Cart', 'Delivery Address', 'Order Summary', 'Payment Method', 'Track'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};


class SignUpFirstDialouge extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
    };
  }

  onPageChange(position) {
    this.setState({ currentPosition: position });
  }

  renderViewPagerPage = (data) => {
    return (
      <View style={Style.page}>
        <Text>{data}</Text>
      </View>
    );
  }


  render() {
    return (

      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text>
          Helosofnasdfbajsdfbasjhdfbakljsdnfkasndf
            </Text>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
            />
            <Text style={Style.headerText}>Choose Account Type </Text>
            <View style={Style.buttonContainer}>
              <TouchableOpacity
                style={Style.buttonGradient}
                onPress={() => this.props.navigation.navigate('SignUp', {
                  userType: 'Parent',
                })
            }
              >
                <ViewPager
                  style={{ flexGrow: 1 }}
                  ref={(viewPager) => {
                    this.viewPager = viewPager;
                  }}
                  onPageSelected={(page) => {
                    this.setState({ currentPage: page.position });
                  }}
                >
                  {PAGES.map(page => this.renderViewPagerPage(page))}
                </ViewPager>
                <Text style={Style.buttonText}>
                    Parent
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={Style.buttonGradient}
                onPress={() => this.props.navigation.navigate('SignUp', {
                  userType: 'Child',
                })}
              >
                <Text style={Style.buttonText}>
                      Child
                </Text>

              </TouchableOpacity>


            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default SignUpFirstDialouge;
