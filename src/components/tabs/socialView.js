import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import {
  ProgressCircle, AreaChart, XAxis,
} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import AvatarImageFriend from './avatarImageFriend';
import { fonts, colors, dimensions } from '../../styling/base';
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
    this.state = {
      indEmail,
      name,
      score,
      rank,
      taskhistory: [],
      avatarColor,
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
          myList.push({ value: this.props.allFriend[key].taskhist[0][key1] + 0.2, index: addSubtractDate.subtract(new Date(), key1, 'days') });
        });
        this.setState({ taskhistory: myList });
      }
    });
  }


  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }


  removeFriend() {
    // email of yourself, remFriend is email of friend you're removing
    const payLoad = {
      email: this.props.account.email,
      remFriend: this.state.indEmail,
    };
    console.log(payLoad);
    // this.props.postRemoveFriend(payLoad);
    // this.props.navigation.navigate('Auth', {}, NavigationActions.navigate({ routeName: 'ChildTabBar' }));
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
          marginBottom: '15%',
        }}
        >
          {' '}
        </Text>
      );
    } else {
      return (
        <Button
          onPress={() => this.removeFriendAlert()}
          title="Remove Friend"
          rounded
          style={Style.button}
          backgroundColor={colors.logoGreen}
        />
      );
    }
  }

  renderChart() {
    // const data = [7, 4, 5, 6, 2, 1, 7, 4, 5, 6, 2, 1];
    const data = this.state.taskhistory;
    const contentInset = {
      top: 0, left: 0, right: 0, bottom: 0,
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
          contentInset={contentInset}
          numberOfTicks={6}
        />
        <XAxis
          style={{
            marginTop: 10, marginHorizontal: -15, marginRight: 5,
          }}
          data={data}
          formatLabel={value => `${(value.getMonth() + 1)}/${value.getDate()}`}
          scale={scale.scaleTime}
          labelStyle={{ color: 'black' }}
          xAccessor={({ item }) => item.index}
          svg={{
            fill: 'black',
            fontSize: 9,
            fontWeight: 'bold',
          }}
          contentInset={contentInset}
          numberOfTicks={6}
        />
      </View>
    );
  }

  renderPieChart() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <View style={{
        marginTop: 40, flex: 1, flexDirection: 'row', justifyContent: 'space-between',
      }}
      >
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{
            color: 'black', fontSize: 12, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center',
          }}
          >
            {'Completion Percentage'}
          </Text>
          <ProgressCircle
            style={{ height: 175, paddingTop: -250 }}
            progress={0.7}
            progressColor="rgb(24, 224, 24)"
            startAngle={-Math.PI * 1.25}
            endAngle={Math.PI * 0.75}
            strokeWidth={12}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            left: deviceWidth / 4 - 14,
            top: 115,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: fonts.secondary,
            color: 'rgb(24, 224, 24)',
          }}
        >
          {'70%'}
        </Text>
        <View
          style={{ flex: 1, paddingRight: 10 }}
        >
          <Text style={{
            color: 'black', fontSize: 12, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center',
          }}
          >
            {'Amount to Next Goal'}
          </Text>
          <ProgressCircle
            style={{ height: 175, paddingTop: -250 }}
            progress={0.7}
            progressColor="rgb(24, 24, 224)"
            startAngle={Math.PI * 1.25}
            endAngle={-Math.PI * 0.75}
            strokeWidth={12}
          />
          <Text
            style={{
              position: 'absolute',
              left: deviceWidth / 4 - 20,
              top: 115,
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: fonts.secondary,
              color: 'rgb(24, 24, 224)',
            }}
          >
            {'70%'}
          </Text>
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
          fontSize: fonts.lg, color: 'white', fontFamily: fonts.secondary, textAlign: 'center', fontWeight: 'bold',
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
            color: 'white', fontSize: 16, fontFamily: fonts.secondary, flex: 1, textAlign: 'left', marginRight: 20, fontWeight: 'bold',
          }}
          >
            {`${numTasks(this.state.score)} Done`}
          </Text>
          <AvatarImageFriend
            individualName={this.state.name}
            avatarColor={this.state.avatarColor}
          />
          <Text style={{
            color: 'white', fontSize: 16, fontFamily: fonts.secondary, flex: 1, marginLeft: 40, fontWeight: 'bold',
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
            color: 'white', fontSize: 16, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center',
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
          padding: 15, paddingTop: 15, paddingBottom: 85, alignItems: 'center',
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 50,
        }}
        >
          {this.determineDisplay()}
        </View>
      </View>
    );
  }

  render() {
    // const props = {
    //   labelBy: 'username',
    //   sortBy: 'score',
    //   data: this.state.filter > 0 ? this.state.monthlyData : this.state.weeklyData,
    //   icon: 'iconUrl',
    //   sort: this.sort,
    //   onRowPress: (item, index) => {
    //     this.props.navigation.navigate('SocialIndividual', {
    //       email: item.email,
    //       rank: index,
    //       score: item.score,
    //       name: item.username,
    //     });
    //   },
    // };

    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={pageStyle.homeWrapper}>
            {this.renderTop()}
            {this.renderChart()}
            {this.renderPieChart()}
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
  });


export default connect(mapStateToProps, { fetchAllSocial, postRemoveFriend })(SocialView);
