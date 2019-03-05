import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider, ButtonGroup } from 'react-native-elements';
// import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import { themeColors } from '../../styling/colorModes';

// import RedeemedGoalsCard from './redeemedGoalsTabCard';
import { fetchTasksWeek, fetchTasksMonth, fetchTasksYear } from '../../actions';
import CompletedTaskCard from './completedTaskCard';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors, fonts, dimensions } from '../../styling/base';

class completedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      isFetching: false,
      taskDict: {},
    };
  }

  componentWillMount() {
    const taskDict = {};
    taskDict[0] = this.props.wTasks;
    taskDict[1] = this.props.mTasks;
    taskDict[2] = this.props.yTasks;
    this.setState({ taskDict });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.reloadApiData(); });
  }

  headingDisplay() {
    if (this.props.mode === 0) {
      return (
        <Text style={Style.headerTextLight}>Completed Tasks! </Text>
      );
    } else {
      return (
        <Text style={Style.headerTextDark}>Completed Tasks! </Text>
      );
    }
  }

  reloadApiData() {
    console.log('reloading api Data');
    // Do we want to update children info as well?
    this.props.fetchTasksWeek(this.props.user.email);
    this.props.fetchTasksMonth(this.props.user.email);
    this.props.fetchTasksYear(this.props.user.email);
    // No longer fetching
    this.setState({ isFetching: false });
  }

  renderTasks(filter) {
    // console.log('Weekly Tasks');
    // console.log(this.props.wTasks);
    // console.log('Monthly');
    // console.log(this.props.mTasks);
    // console.log('Yearly');
    // console.log(this.props.yTasks);
    // <RedeemedGoalsCard goals={goal} />
    // <Text style={Style.headerText}>{task.name}</Text>
    if (this.props.wTasks !== null) {
      if (this.props.wTasks.length > 0) {
        return (
          this.state.taskDict[filter].map(task => (
            <View key={task.id}>
              <CompletedTaskCard tasks={task} />
            </View>
          ))
        );
      } else {
        return (
          <View style={{
            marginTop: 20,
            width: dimensions.fullWidth,
          }}
          >
            <Text style={{
              fontSize: fonts.smmd,
              fontWeight: 'bold',
              color: themeColors.headerColor[this.props.mode],
              fontFamily: fonts.secondary,
              paddingHorizontal: '10%',
            }}
            >
No Completed Tasks Yet!
            </Text>
          </View>
        );
      }
    } else {
      return null;
    }
  }

  render() {
    console.log('rendering completed tasks');
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[themeColors.linearGradientTop[this.props.mode], themeColors.linearGradientBottom[this.props.mode]]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            {this.headingDisplay()}
            <ButtonGroup
              onPress={(x) => {
                this.setState({ filter: x });
                console.log(this.state.taskDict);
              }}
              selectedIndex={this.state.filter}
              buttons={['Week', 'Month', 'Year']}
              containerStyle={{ height: 20, backgroundColor: 'rgba(250, 27, 3, 0.05)', borderColor: 'black' }}
              selectedTextStyle={{
                color: themeColors.headerColor[this.props.mode], fontSize: 11, fontFamily: fonts.secondary,
              }}
              textStyle={{
                color: themeColors.headerColor[this.props.mode], fontSize: 11, fontFamily: fonts.secondary,
              }}
              selectedButtonStyle={{ backgroundColor: themeColors.buttonColor[this.props.mode] }
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
              {this.renderTasks(this.state.filter)}
              <Divider style={{ backgroundColor: colors.clear, height: 105 }} />
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


const mapStateToProps = state => (
  {
    mTasks: state.user.mTasks,
    wTasks: state.user.wTasks,
    yTasks: state.user.yTasks,
    user: state.user.info,
    mode: state.user.colorMode.color,
  });

export default connect(mapStateToProps, { fetchTasksWeek, fetchTasksMonth, fetchTasksYear })(completedTasks);
