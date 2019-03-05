import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  ProgressCircle, AreaChart, XAxis,
} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import AvatarImageFriend from './avatarImageFriend';
import { fonts, colors, dimensions } from '../../styling/base';
import { themeColors } from '../../styling/colorModes';
import { fetchAllSocial, postRemoveFriend } from '../../actions/index';
import Style from '../../styling/Style';

// const API_KEY = '';

class SocialView extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const indEmail = navigation.getParam('email');
    const name = navigation.getParam('name');
    const score = navigation.getParam('score');
    const rank = navigation.getParam('rank');
    const avatarColor = navigation.getParam('avatarColor');
    const friendInfo = navigation.getParam('friendInfo');
    const taskComp = friendInfo[indEmail].taskCompletionRateWeek;
    this.state = {
      indEmail,
      name,
      score,
      rank,
      taskhistory: [],
      avatarColor,
      taskComp,
      goalComp: 0,
      gridMaxNum: 0,
    };
    console.log(indEmail);
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentWillMount() {
    const addSubtractDate = require('add-subtract-date');
    Object.keys(this.props.allFriend).forEach((key) => {
      if (this.props.allFriend[key].email === this.state.indEmail) {
        const myList = [];
        Object.keys(this.props.allFriend[key].taskhist[0]).forEach((key1) => {
          if (parseInt(key1, 10) < 32) {
            myList.push({ value: this.props.allFriend[key].taskhist[0][key1] + 0.2, index: addSubtractDate.subtract(new Date(), key1, 'days') });
          }
        });
        this.setState({ taskhistory: myList });
        this.setState({ goalComp: this.props.allFriend[key].taskhist[0][32] });
        this.setState({ gridMaxNum: this.props.allFriend[key].taskhist[0][33] });
      }
    });
  }


  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }


  removeFriend() {
    let resetAction;
    if (this.props.mode === 0) {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarLight' }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'ChildTabBarDark' }),
        ],
      });
    }
    // email of yourself, remFriend is email of friend you're removing
    const payLoad = {
      email: this.props.account.email,
      remFriend: this.state.indEmail,
    };
    console.log(payLoad);
    this.props.postRemoveFriend(payLoad).then(() => { this.props.navigation.dispatch(resetAction); });
  }

  removeFriendAlert() {
    // Confirmation alert
    Alert.alert(
      'Are you sure you want to remove this friend?',
      'You will be removed from your friend\'s friend list as well',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => this.removeFriend(),
        },
      ],
      { cancelable: false },
    );
  }

  determineDisplay() {
    // don't display a remove friend button if this is your own account page
    if (this.props.account.email === this.state.indEmail) {
      return (
        <Text style={{
          marginBottom: '13%',
        }}
        >
          {' '}
        </Text>
      );
    } else {
      return (
        <Button
          raised
          onPress={() => this.removeFriendAlert()}
          title="Remove Friend"
          style={Style.button}
          buttonStyle={{
            backgroundColor: themeColors.buttonColor[this.props.mode],
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
          color={themeColors.headerColor[this.props.mode]}
          fontFamily={fonts.secondary}
        />
      );
    }
  }

  renderChart() {
    // const data = [7, 4, 5, 6, 2, 1, 7, 4, 5, 6, 2, 1];
    const data = this.state.taskhistory;
    const contentInset = {
      top: 0, left: 2, right: 2, bottom: 0,
    };
    return (
      <View
        style={{
          height: 200, marginLeft: 5, marginRight: 10, flexDirection: 'column',
        }}
      >
        <AreaChart
          data={data}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(22, 22, 288, 0.4)' }}
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.index}
          showGrid={false}
          style={{
            height: 200, flex: 1, marginLeft: 5,
          }}
          gridMin={0}
          gridMax={this.state.gridMaxNum + 1}
          contentInset={contentInset}
          numberOfTicks={6}
        />
        <XAxis
          style={{
            marginTop: 10, marginLeft: 10,
          }}
          data={data}
          formatLabel={value => `${(value.getMonth() + 1)}/${value.getDate()}`}
          scale={scale.scaleTime}
          labelStyle={{ color: themeColors.headerColor[this.props.mode] }}
          xAccessor={({ item }) => item.index}
          svg={{
            fill: themeColors.headerColor[this.props.mode],
            fontSize: 11,
            fontWeight: 'bold',
          }}
          contentInset={contentInset}
          numberOfTicks={6}
        />
      </View>
    );
  }

  renderPieChart() {
    console.log(this.state.taskComp);
    return (
      <View style={{
        paddingTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between',
      }}
      >
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center',
          }}
          >
            {'Completion Percentage'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.state.taskComp) / 100}
            progressColor="rgb(28, 218, 28)"
            startAngle={-Math.PI * 1}
            endAngle={Math.PI * 1}
            strokeWidth={12}
            backgroundColor="rgba(88, 248, 88, .3)"
          />
        </View>
        <View
          style={{ flex: 1, paddingRight: 10 }}
        >
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center',
          }}
          >
            {'Amount to Next Goal'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.state.goalComp) / 100}
            progressColor="rgb(28, 28, 228)"
            startAngle={Math.PI * 1}
            endAngle={-Math.PI * 1}
            strokeWidth={12}
            backgroundColor="rgba(88, 88, 238,.5)"
          />
        </View>
      </View>
    );
  }

  renderTop() {
    console.log(this.state.taskhistory);
    return (
      <View
        style={{
          padding: 15, paddingTop: 45, alignItems: 'center',
        }}
      >
        <Text style={{
          fontSize: fonts.lg, color: themeColors.headerColor[this.props.mode], fontFamily: fonts.secondary, textAlign: 'center', fontWeight: 'bold',
        }}
        >
          {this.state.name}
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
          marginTop: 20,
        }}
        >
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 16, fontFamily: fonts.secondary, flex: 1, textAlign: 'left', marginRight: 20, fontWeight: 'bold',
          }}
          >
            {`${numTasks(this.state.score)} Done`}
          </Text>
          <AvatarImageFriend
            individualName={this.state.name}
            avatarColor={this.state.avatarColor}
          />
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 16, fontFamily: fonts.secondary, flex: 1, marginLeft: 40, fontWeight: 'bold',
          }}
          >
            {`${ordinalSuffixOf(this.state.rank)} Place`}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 0,
          marginTop: 10,
        }}
        >
          <Text style={{
            color: themeColors.headerColor[this.props.mode], fontSize: 16, fontFamily: fonts.secondary, textAlign: 'center', fontWeight: 'bold',
          }}
          >
            {'Tasks Completed in Past Month'}
          </Text>
        </View>
      </View>
    );
  }


  renderBottom() {
    return (
      <View
        style={{
          padding: 10, paddingTop: 10, paddingBottom: 75, alignItems: 'center',
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          paddingTop: 20,
        }}
        >
          {this.determineDisplay()}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={pageStyle.homeWrapper}>
            {this.renderTop()}
            {this.renderChart()}
            {this.renderPieChart()}
            <Text
              style={{
                position: 'absolute',
                left: '68%',
                top: '68%',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: fonts.secondary,
                color: 'rgb(24, 24, 224)',
              }}
            >
              {`${this.state.goalComp}%`}
            </Text>
            <Text
              style={{
                position: 'absolute',
                left: '19%',
                top: '68%',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: fonts.secondary,
                color: 'rgb(20, 218, 20)',
              }}
            >
              { `${this.state.taskComp}%`}
            </Text>
            {this.renderBottom()}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const ordinalSuffixOf = (i) => {
  const reali = parseInt(i, 10) + 1;
  const j = reali % 10;

  const k = reali % 100;
  if (j === 1 && k !== 11) {
    return `${reali}st`;
  }
  if (j === 2 && k !== 12) {
    return `${reali}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${reali}rd`;
  }
  return `${reali}th`;
};

const numTasks = (i) => {
  if (i === 1) {
    return `${i} Task`;
  } else {
    return `${i} Tasks`;
  }
};

const pageStyle = StyleSheet.create({
  homeWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },
  topContainer: {
    width: dimensions.fullWidth,
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  main: {
    flex: 1,
    marginBottom: 90,
  },
  headerText: {
    paddingTop: 80,
    marginLeft: 15,
    alignContent: 'center',
    fontSize: fonts.lg,
    color: colors.black,
  },
  balanceContainer: {
    backgroundColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  balanceText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
  },
  sectionContainer: {
    marginBottom: 15,
    width: dimensions.fullWidth,
  },
  sectionHeader: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.secondary,
    justifyContent: 'flex-start',
    paddingVertical: 6,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 6,
    marginBottom: 6,
  },
  noGoals: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noGoalsText: {
    fontSize: fonts.md,
    color: '#fff',
    fontFamily: fonts.primary,
  },
});


const mapStateToProps = state => (
  {
    account: state.user.info,
    allFriend: state.user.allFriend,
    mode: state.user.colorMode.color,
  });


export default connect(mapStateToProps, { fetchAllSocial, postRemoveFriend })(SocialView);
