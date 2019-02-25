import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  ProgressCircle, AreaChart, XAxis, YAxis, Grid, BarChart,
} from 'react-native-svg-charts';
import { Divider, ButtonGroup } from 'react-native-elements';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import { fonts, colors, dimensions } from '../../styling/base';
import { fetchAllSocial } from '../../actions/index';
import Style from '../../styling/Style';

// const API_KEY = '';

class Analytics extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const indEmail = navigation.getParam('email');
    this.state = {
      filter: 0,
      alldata: [],
      counter: 0,
      indEmail,
      histWeek: [],
      histMonth: [],
      histYear: [],
      indWeek: [],
    };
    console.log(indEmail);
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentWillMount() {
    const addSubtractDate = require('add-subtract-date');
    const testda = [14, 5, 6, 8, 12, 5, 9];
    const data1 = [];
    const alldat = [];
    Object.keys(testda).forEach((key1) => {
      data1.push({ value: testda[key1], index: parseInt(key1, 10) });
      alldat.push({ value: testda[key1] });
    });
    const testda2 = [-2, -14, -20, 0, -5, -6, -2];
    const data2 = [];
    const ind = [];
    ind.push(new Date());
    Object.keys(testda2).forEach((key2) => {
      data2.push({ value: testda2[key2], index: parseInt(key2, 10) });
      ind.push(addSubtractDate.subtract(new Date(), parseInt(key2, 10) + 1, 'days'));
      alldat.push({ value: testda2[key2] });
    });
    const barData = [
      {
        data: data1,
        svg: {
          fill: 'rgb(24, 128, 24)',
        },
      },
      {
        data: data2,
      },

    ];
    this.setState({ alldata: alldat });
    this.setState({ histWeek: barData });
    this.setState({ indWeek: ind });
  }

  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }

  renderChart() {
    const balHist = [{ value: 0, index: new Date('2019-01-29') }, { value: 20, index: new Date('2019-02-02') }, { value: 50, index: new Date('2019-02-10') }, { value: 25, index: new Date('2019-02-11') }, { value: 65, index: new Date('2019-02-15') }];
    const contentInset = {
      top: 0, left: 5, right: 0, bottom: 5,
    };
    return (
      <View style={{
        height: 200, padding: 10, marginLeft: 0, flexDirection: 'row',
      }}
      >
        <YAxis
          data={balHist}
          style={{ marginBottom: 0 }}
          yAccessor={({ item }) => item.value}
          contentInset={contentInset}
          formatLabel={value => `$${value}`}
          svg={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
          }}
          numberOfTicks={8}
        />
        <View
          style={{
            height: 200, marginLeft: 5, marginRight: 5, flexDirection: 'column', width: 370,
          }}
        >
          <AreaChart
            curve={shape.curveLinear}
            data={balHist}
            svg={{ fill: '#15BFD6' }}
            yAccessor={({ item }) => item.value}
            xAccessor={({ item }) => item.index}
            // showGrid={false}
            style={{
              height: 200, flex: 1, marginLeft: 5, width: 370,
            }}
            gridMin={0}
            contentInset={contentInset}
            numberOfTicks={6}
          >
            <Grid />
          </AreaChart>
          <XAxis
            style={{
              marginTop: 10, marginLeft: 10,
            }}
            data={balHist}
            formatLabel={value => `${(value.getMonth() + 1)}/${value.getDate()}`}
            scale={scale.scaleTime}
            labelStyle={{ color: 'black' }}
            xAccessor={({ item }) => item.index}
            svg={{
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
            }}
            contentInset={contentInset}
            numberOfTicks={6}
          />
        </View>
      </View>
    );
  }

  renderPieChart() {
    const balHist = [{ value: 0, index: this.state.indWeek[0] }, { value: 20, index: this.state.indWeek[1] }, { value: 50, index: this.state.indWeek[2] }, { value: 25, index: this.state.indWeek[3] }, { value: 65, index: this.state.indWeek[4] }, { value: 100, index: this.state.indWeek[5] }, { value: 62, index: this.state.indWeek[6] }, { value: 22, index: this.state.indWeek[7] }];
    console.log(this.state.histWeek);
    const deviceWidth = Dimensions.get('window').width;
    const contentInset = {
      top: 0, left: 5, right: 0, bottom: 5,
    };
    return (
      <View style={{
        marginTop: 15, height: 220, padding: 10, marginLeft: 0, flexDirection: 'row',
      }}
      >
        <YAxis
          data={this.state.alldata}
          style={{ marginBottom: 0 }}
          yAccessor={({ item }) => item.value}
          contentInset={{
            top: 0, left: 5, right: 0, bottom: 5,
          }}
          formatLabel={value => `$${value}`}
          svg={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
          }}
          numberOfTicks={6}
        />
        <View style={{
          flex: 1, flexDirection: 'column', height: 200, width: 370, marginLeft: 0, marginRight: 10,
        }}
        >
          <BarChart
            style={{ height: 200, width: 370 }}
            data={this.state.histWeek}
            yAccessor={({ item }) => item.value}
            xAccessor={({ value, index }) => increment(index * 7)}
            svg={{
              fill: 'red',
            }}
            contentInset={contentInset}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{
              marginTop: 10, marginLeft: 5,
            }}
            data={balHist}
            formatLabel={value => `${(value.getMonth() + 1)}/${value.getDate()}`}
            scale={scale.scaleTime}
            labelStyle={{ color: 'black' }}
            xAccessor={({ item }) => item.index}
            svg={{
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
            }}
            contentInset={{
              top: 0, left: 15, right: -5, bottom: 5,
            }}
            numberOfTicks={7}
          />
        </View>
      </View>
    );
  }

  renderTop() {
    return (
      <View
        style={{
          paddingLeft: 5, paddingTop: 15, // alignItems: 'center',
        }}
      >
        <Text style={{
          color: 'black', fontSize: 18, fontFamily: fonts.secondary,
        }}
        >
          {'Balance History'}
        </Text>
      </View>
    );
  }

  renderM1() {
    return (
      <View
        style={{
          paddingLeft: 5, paddingTop: 35, // alignItems: 'center',
        }}
      >
        <Text style={{
          color: 'black', fontSize: 18, fontFamily: fonts.secondary,
        }}
        >
          {'Earnings Vs. Spend'}
        </Text>
      </View>
    );
  }

  renderM2() {
    return (
      <View
        style={{
          paddingLeft: 5, paddingTop: 35, // alignItems: 'center',
        }}
      >
        <Text style={{
          color: 'black', fontSize: 18, fontFamily: fonts.secondary,
        }}
        >
          {'Key Metrics'}
        </Text>
      </View>
    );
  }


  renderBottom() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <View style={{
        marginTop: 33, flex: 1, flexDirection: 'row', marginBottom: 80, // justifyContent: 'space-between',
      }}
      >
        <View style={{ flex: 1, paddingLeft: 15, paddingVertical: 25 }}>
          <ProgressCircle
            style={{ height: 150 }}
            progress={0.7}
            progressColor="rgb(248, 28, 28)"
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
        <View style={{ flex: 1, paddingRight: 15, paddingVertical: 25 }}>
          <ProgressCircle
            style={{ height: 150 }}
            progress={0.7}
            progressColor="rgb(256, 165, 0)"
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
            color: 'rgb(256, 165, 0)',
          }}
        >
          {'70%'}
        </Text>
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
          <View style={{ flex: 1 }}>
            <Text style={Style.headerTextLeaderboard}>Analytics </Text>
            <Text style={pageStyle.subSectionText}>
              {' '}
            </Text>
            <ButtonGroup
              onPress={(x) => { this.setState({ filter: x }); }}
              selectedIndex={this.state.filter}
              buttons={['Weekly', 'Monthly', 'Yearly']}
              containerStyle={{ height: 20, backgroundColor: 'rgba(250, 27, 3, 0.05)', borderColor: 'black' }}
              selectedTextStyle={{
                color: 'black', fontSize: 11, fontFamily: fonts.secondary,
              }}
              textStyle={{
                color: 'black', fontSize: 11, fontFamily: fonts.secondary,
              }}
              selectedButtonStyle={{ backgroundColor: '#3de594' }
              }
            />
            <ScrollView>
              {this.renderTop()}
              <Divider style={pageStyle.bdivider} />
              {this.renderChart()}
              {this.renderM1()}
              <Divider style={pageStyle.divider} />
              {this.renderPieChart()}
              {this.renderM2()}
              <Divider style={pageStyle.divider} />
              {this.renderBottom()}
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

let count = 0;
let two = true;
let retnum = 0;

const increment = (und) => {
  console.log(count);
  if (two) {
    two = false;
    return count;
  } else {
    retnum = count;
    count += 1;
    two = true;
    return retnum;
  }
};

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
    // justifyContent: 'flex-start',
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
  },
  topContainer: {
    width: dimensions.fullWidth,
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 0,
  },
  buttonContainer: {
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    marginBottom: 90,
  },
  headerText: {
    paddingTop: 80,
    marginLeft: 15,
    // alignContent: 'center',
    fontSize: fonts.lg,
    color: colors.black,
  },
  bdivider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 2,
    marginBottom: 0,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 2,
    marginTop: 5,
    marginBottom: 0,
  },
  balanceContainer: {
    backgroundColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 8,
    marginRight: 8,
    // justifyContent: 'center',
  },
  balanceText: {
    // textAlign: 'center',
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
    // justifyContent: 'flex-start',
    paddingVertical: 6,
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


export default connect(mapStateToProps, { fetchAllSocial })(Analytics);
