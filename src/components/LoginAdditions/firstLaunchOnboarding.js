import React from 'react';
// verticalScale, moderateScale other
// import { scale } from 'react-native-size-matters';
import Onboarding from 'react-native-onboarding-swiper';
import { StatusBar, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FirstOnboardingPage from './firstOnboardingPage';

// A hack to get to any page
import {
  fonts,
  colors,
} from '../../styling/base';

// Needs the naviagiton prop to navigate back
const FirstLaunchOnboarding = (props) => {
  return (
    <Onboarding
      showDone={false}
      titleStyles={pageStyle.title}
      subTitleStyles={pageStyle.subTitle}
      onSkip={() => {
        props.pageNavigation('Login');
        // should be saved by now
      }}
      pages={[
        {
          title: (null),
          subtitle: (
            <FirstOnboardingPage />
          ),
          backgroundColor: '#82b2fa',
          image: (null),
        },
        {

          title: 'Create Tasks',
          subtitle: 'Parents can create chores and keep track of what their kids have completed. ',
          backgroundColor: '#5f9ffe',
          image: (
            <Icon
              name="tasks"
              type="font-awesome"
              size={150}
              color="white"
            />
          ),

        },
        {
          title: 'Monitor Spending',
          subtitle: 'Gain insight into how money is spent and budgeted.',
          backgroundColor: '#5094fa',
          image: (
            <Icon
              name="line-chart"
              type="font-awesome"
              size={150}
              color="white"
            />
          ),
        },
        {
          title: 'Social Sharing',
          subtitle: 'Kids can see how they stack up against their friends!',
          backgroundColor: '#428cfa',
          image: (
            <Icon
              name="share-alt"
              type="font-awesome"
              size={150}
              color="white"
            />
          ),
        },
        {
          title: 'Get Started Now!',
          subtitle: (
            <Button
              title="Sign Up"
              containerViewStyle={{ marginTop: 20 }}
              backgroundColor="#ffff"
              large
              raised
              textStyle={{ color: '#3081f9' }}
              onPress={() => {
                StatusBar.setBarStyle('default');
                props.pageNavigation('SignUp');
              }}
            />
          ),
          backgroundColor: '#4890fa',
          image: (
            <Icon
              name="rocket"
              type="font-awesome"
              size={150}
              color="white"
            />
          ),
        },
      ]}
    />
  );
};

const pageStyle = StyleSheet.create({
  title: {
    fontFamily: fonts.secondary,
    fontSize: fonts.lg,
    color: colors.logoGreen,
  },
  subTitle: {
    fontFamily: fonts.secondary,
    fontSize: fonts.md,
    color: '#fff',
  },


});

export default FirstLaunchOnboarding;
