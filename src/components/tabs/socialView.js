import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { AreaChart, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import AvatarImageFriend from './avatarImageFriend';
import { fonts, colors, dimensions } from '../../styling/base';
import { fetchAllSocial } from '../../actions/index';
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
    this.state = {
      indEmail,
      name,
      score,
      rank,
      taskhistory: [],
      isDialogVisible: false,
    };
    console.log(indEmail);
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentWillMount() {
    Object.keys(this.props.allFriend).forEach((key) => {
      if (this.props.allFriend[key].email === this.state.indEmail) {
        this.setState({ taskhistory: this.props.allFriend[key].taskhist });
      }
    });
  }


  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }

  renderChart() {
    const data = [2, 2, 3, 4, 1, 2, 3, 6, 4, 2, 3, 4, 4, 5, 7, 9, 2, 4, 5, 7, 4, 2, 3, 4, 5, 6, 2, 1];
    return (
      <AreaChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: 'rgba(200, 22, 28, 0.8)' }}
      />
    );
  }

  renderPieChart() {
    const data = [7, 4, 5, 6, 2, 1];

    const randomColor = () => (`#${(Math.random() * 0xFFFFFF).toString(16)}000000`).slice(0, 7);
    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));

    return (
      <PieChart
        style={{ height: 200, marginTop: 15 }}
        data={pieData}
      />
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
            color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, textAlign: 'right', marginRight: 40,
          }}
          >
            {`${this.state.score} tasks`}
          </Text>
          <AvatarImageFriend
            individualName={this.state.name}
          />
          <Text style={{
            color: 'white', fontSize: fonts.md, fontFamily: fonts.secondary, flex: 1, marginLeft: 40,
          }}
          >
            {`${this.state.rank}st Place`}
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
            {'Task Completion History'}
          </Text>
        </View>
      </View>
    );
  }


  renderBottom() {
    return (
      <View
        style={{
          padding: 15, paddingTop: 5, paddingBottom: 45, alignItems: 'center',
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 100,
        }}
        >
          <Button
            onPress={() => this.setState({ isDialogVisible: true })}
            title="Remove Friend"
            rounded
            style={Style.button}
            backgroundColor={colors.logoGreen}
          />
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title="Do you want to remove this friend?"
            message="You cannot undo this action"
            submitInput={console.log('hi')}
            closeDialog={() => this.setState({ isDialogVisible: false })}
          />
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


export default connect(mapStateToProps, { fetchAllSocial })(SocialView);
