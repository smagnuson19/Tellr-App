import React, { Component } from 'react';
import {
  // View, Text, StyleSheet, AsyncStorage,
  View, Text, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import Login from './login';
import { Divider, ButtonGroup } from 'react-native-elements';
// import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../../styling/Style';
import CompletedTaskCard from './completedTaskCard';
import { fetchTasksWeek } from '../../actions';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors, fonts } from '../../styling/base';

class completedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
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
        return (<Text style={Style.headerText}>No Completed Tasks Yet!</Text>);
      }
    } else {
      return null;
    }
  }

  render() {
    console.log('rendering completed tasks');
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Completed Tasks!</Text>
            <ButtonGroup
              onPress={(x) => {
                this.setState({ filter: x });
                console.log(this.state.taskDict);
              }}
              selectedIndex={this.state.filter}
              buttons={['Week', 'Month', 'Year']}
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
  });

export default connect(mapStateToProps, { fetchTasksWeek })(completedTasks);
