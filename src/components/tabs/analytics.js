import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, RefreshControl,
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
import { fetchAllStats } from '../../actions/index';
import Style from '../../styling/Style';

// const API_KEY = '';

class Analytics extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const indEmail = navigation.getParam('email');
    console.log(this.props.allStats);
    this.state = {
      isFetching: false,
      userEmail: indEmail,
      filter: 0,
      datDict: {},
      timeDict: {},
      barDict: {},
      tickDict: {},
      maxDict: {},
    };
    this.buttonPress = this.buttonPress.bind(this);
  }

  componentWillMount() {
    const datDict = {};
    const alldat = [];
    const addSubtractDate = require('add-subtract-date');
    Object.keys(this.props.allStats[0].retNeg).forEach((key1) => {
      alldat.push({ value: this.props.allStats[0].retNeg[key1] });
    });
    Object.keys(this.props.allStats[0].retPos).forEach((key2) => {
      alldat.push({ value: this.props.allStats[0].retPos[key2] });
    });
    datDict[0] = alldat;

    const alldat1 = [];
    Object.keys(this.props.allStats[1].retNeg).forEach((key3) => {
      alldat1.push({ value: this.props.allStats[1].retNeg[key3] });
    });
    Object.keys(this.props.allStats[1].retPos).forEach((key4) => {
      alldat1.push({ value: this.props.allStats[1].retPos[key4] });
    });
    datDict[1] = alldat1;

    const alldat2 = [];
    Object.keys(this.props.allStats[2].retNeg).forEach((key5) => {
      alldat2.push({ value: this.props.allStats[2].retNeg[key5] });
    });
    Object.keys(this.props.allStats[2].retPos).forEach((key6) => {
      alldat2.push({ value: this.props.allStats[2].retPos[key6] });
    });
    datDict[2] = alldat2;

    this.setState({ datDict });

    const timeDict = {};
    const timezero = [];

    let i = 0;
    for (i = 0; i < 8; i++) {
      timezero.push({ value: 1, index: addSubtractDate.subtract(new Date(), i, 'days') });
    }
    timeDict[0] = timezero;
    console.log(datDict);
    const timeone = [];

    let j = 0;
    for (j = 0; j < 9; j++) {
      timeone.push({ value: 1, index: addSubtractDate.subtract(new Date(), 4 * j, 'days') });
    }
    timeDict[1] = timeone;

    const timetwo = [];

    let k = 0;
    for (k = 0; k < 7; k++) {
      timetwo.push({ value: 1, index: addSubtractDate.subtract(new Date(), 60 * k, 'days') });
    }
    timeDict[2] = timetwo;

    this.setState({ timeDict });

    const barDict = {};

    const barzero = [
      {
        data: valMaker(this.props.allStats[0].retPos),
        svg: {
          fill: 'rgb(24, 128, 24)',
        },
      },
      {
        data: valMaker(this.props.allStats[0].retNeg),
      },
    ];

    barDict[0] = barzero;

    const barone = [
      {
        data: valMaker(this.props.allStats[1].retPos),
        svg: {
          fill: 'rgb(24, 128, 24)',
        },
      },
      {
        data: valMaker(this.props.allStats[1].retNeg),
      },
    ];

    barDict[1] = barone;


    const bartwo = [
      {
        data: valMaker(this.props.allStats[2].retPos),
        svg: {
          fill: 'rgb(24, 128, 24)',
        },
      },
      {
        data: valMaker(this.props.allStats[2].retNeg),
      },
    ];

    barDict[2] = bartwo;

    const tickDict = {
      0: 6,
      1: 6,
      2: 3,
    };

    this.setState({ tickDict });

    this.setState({ barDict });
    const maxDict = {
      0: this.props.allStats[0].max,
      1: this.props.allStats[1].max,
      2: this.props.allStats[2].max,
    };
    this.setState({ maxDict });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  reloadApiData() {
    console.log('reloading api Data');
    // Do we want to update children info as well?
    this.props.fetchAllStats(this.state.userEmail);
    // No longer fetching
    this.setState({ isFetching: false });
  }

  buttonPress(action, goalName, sEmail, cEmail, priority) {
    this.props.onPress(action, goalName, sEmail, cEmail, priority);
  }

  renderChart() {
    const deviceWidth = Dimensions.get('window').width;
    console.log(this.state.barDict[0]);
    const balHist = [];
    Object.keys(this.props.allStats[this.state.filter].balanceGraph).forEach((key) => {
      balHist.push({ value: this.props.allStats[this.state.filter].balanceGraph[key][0], index: new Date(`${this.props.allStats[this.state.filter].balanceGraph[key][1]}`) });
    });
    const contentInset = {
      top: 0, left: 5, right: 0, bottom: 5,
    };
    return (
      <View style={{
        height: 200, padding: 10, marginLeft: 0, flexDirection: 'row', width: deviceWidth,
      }}
      >
        <YAxis
          data={balHist}
          style={{ marginBottom: 3 }}
          yAccessor={({ item }) => item.value}
          contentInset={{
            top: 5, left: 5, right: 0, bottom: 5,
          }}
          formatLabel={value => `$${value}`}
          gridMax={this.state.maxDict[this.state.filter] + 1}
          gridMin={0}
          svg={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
          }}
          numberOfTicks={6}
        />
        <View
          style={{
            height: 200, marginLeft: 5, marginRight: 5, flexDirection: 'column',
          }}
        >
          <AreaChart
            curve={shape.curveLinear}
            data={balHist}
            svg={{ fill: colors.babyBlue }}
            yAccessor={({ item }) => item.value}
            xAccessor={({ item }) => item.index}

            // showGrid={false}
            style={{
              height: 200, flex: 1, marginLeft: 5, width: deviceWidth - 45,
            }}
            gridMin={0}
            contentInset={contentInset}
            numberOfTicks={6}
            gridMax={this.state.maxDict[this.state.filter] + 1}
          >
            <Grid />
          </AreaChart>
          <XAxis
            style={{
              marginTop: 10, marginLeft: 0,
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
            numberOfTicks={7}
          />
        </View>
      </View>
    );
  }

  renderPieChart() {
    const deviceWidth = Dimensions.get('window').width;
    const contentInset = {
      top: 0, left: 5, right: 0, bottom: 5,
    };
    console.log(this.state.datDict);
    return (
      <View style={{
        marginTop: 15, height: 220, padding: 10, marginLeft: 0, flexDirection: 'row', width: deviceWidth,
      }}
      >
        <YAxis
          data={this.state.datDict[this.state.filter]}
          style={{ marginBottom: 0 }}
          yAccessor={({ item }) => item.value}
          contentInset={{
            top: 5, left: 5, right: 0, bottom: 5,
          }}
          numberOfTicks={8}
          formatLabel={value => `$${value}`}
          svg={{
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
          }}
        />
        <View style={{
          flex: 1, flexDirection: 'column', height: 200, width: deviceWidth, marginLeft: 0, marginRight: 0,
        }}
        >
          <BarChart
            style={{ height: 200, width: deviceWidth - 45 }}
            data={this.state.barDict[this.state.filter]}
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
              marginTop: 10, marginLeft: 10, width: deviceWidth - 40,
            }}
            data={this.state.timeDict[this.state.filter]}
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
              top: 0, left: 10, right: 0, bottom: 5,
            }}
            numberOfTicks={this.state.tickDict[this.state.filter]}
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
        paddingTop: 30, flex: 1, flexDirection: 'row',
      }}
      >
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{
            color: 'black', fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center', paddingBottom: 8,
          }}
          >
            {'Average Goal Cost'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.props.allStats[this.state.filter].avgGoal) / 50}
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
            color: 'black', fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center', paddingBottom: 8,
          }}
          >
            {'Average Task Value'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.props.allStats[this.state.filter].avgTask) / 50}
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

  render2Bottom() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <View style={{
        paddingTop: 30, flex: 1, flexDirection: 'row',
      }}
      >
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{
            color: 'black', fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center', paddingBottom: 8,
          }}
          >
            {'Net Weekly Earnings'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.props.allStats[this.state.filter].rate) / 50}
            progressColor="rgb(216, 28, 218)"
            startAngle={-Math.PI * 1}
            endAngle={Math.PI * 1}
            strokeWidth={12}
            backgroundColor="rgba(218, 24, 218, .3)"
          />
        </View>
        <View
          style={{ flex: 1, paddingRight: 10 }}
        >
          <Text style={{
            color: 'black', fontSize: 13, fontWeight: 'bold', fontFamily: fonts.secondary, flex: 1, textAlign: 'center', paddingBottom: 8,
          }}
          >
            {'Total Earnings'}
          </Text>
          <ProgressCircle
            style={{ height: 158, paddingTop: 5 }}
            progress={parseFloat(this.props.allStats[this.state.filter].net) / 250}
            progressColor="rgb(256, 165, 0)"
            startAngle={Math.PI * 1}
            endAngle={-Math.PI * 1}
            strokeWidth={12}
            backgroundColor="rgba(256, 165, 0, .3)"
          />
        </View>
      </View>
    );
  }


  render() {
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
              buttons={['Week', 'Month', 'Year']}
              containerStyle={{ height: 20, backgroundColor: 'rgba(250, 27, 3, 0.05)', borderColor: 'black' }}
              selectedTextStyle={{
                color: 'black', fontSize: 11, fontFamily: fonts.secondary,
              }}
              textStyle={{
                color: 'black', fontSize: 11, fontFamily: fonts.secondary,
              }}
              selectedButtonStyle={{ backgroundColor: colors.secondary }
              }
            />
            <ScrollView refreshControl={(
              <RefreshControl
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                tintColor="#fff"
              />
            )}
            >
              {this.renderTop()}
              <Divider style={pageStyle.bdivider} />
              {this.renderChart()}
              {this.renderM1()}
              <Divider style={pageStyle.divider} />
              {this.renderPieChart()}
              {this.renderM2()}
              <Divider style={pageStyle.divider} />
              <Text
                style={{
                  position: 'absolute',
                  left: '70%',
                  top: '64%',
                  fontSize: 24,
                  fontWeight: 'bold',
                  fontFamily: fonts.secondary,
                  color: 'rgb(24, 24, 224)',
                }}
              >
                {`$${this.props.allStats[this.state.filter].avgTask}`}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '22.5%',
                  top: '64%',
                  fontSize: 24,
                  fontWeight: 'bold',
                  fontFamily: fonts.secondary,
                  color: 'rgb(20, 218, 20)',
                }}
              >
                {`$${this.props.allStats[this.state.filter].avgGoal}`}
              </Text>

              <Text
                style={{
                  position: 'absolute',
                  left: '20%',
                  top: '83%',
                  fontSize: 24,
                  fontWeight: 'bold',
                  fontFamily: fonts.secondary,
                  color: 'rgb(216, 28, 218)',
                }}
              >
                {`$${this.props.allStats[this.state.filter].rate}`}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '68%',
                  top: '83%',
                  fontSize: 24,
                  fontWeight: 'bold',
                  fontFamily: fonts.secondary,
                  color: 'rgb(256, 165, 0)',
                }}
              >
                {`$${this.props.allStats[this.state.filter].net}`}
              </Text>
              {this.renderBottom()}
              {this.render2Bottom()}
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
                {' '}
                {' '}
              </Text>
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
              </Text>
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
              </Text>
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
              </Text>
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
              </Text>
              <Text style={pageStyle.subSectionText}>
                {' '}
                {' '}
              </Text>
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

const valMaker = (lis) => {
  const retList = [];
  Object.keys(lis).forEach((key) => {
    retList.unshift({ value: lis[key] });
  });
  return retList;
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
    allStats: state.user.allStats,
  });


export default connect(mapStateToProps, { fetchAllStats })(Analytics);
