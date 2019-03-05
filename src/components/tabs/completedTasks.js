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
// import RedeemedGoalsCard from './redeemedGoalsTabCard';
import { fetchTasksWeek } from '../../actions';


// import AvatarImage from './avatarImage';
// import GoalsCard from './goalsCard';
import { colors, fonts } from '../../styling/base';

class completedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
    };
  }

  renderGoals() {
    console.log('Weekly Tasks');
    console.log(this.props.wTasks);
    console.log('Monthly');
    console.log(this.props.mTasks);
    console.log('Yearly');
    console.log(this.props.yTasks);
    if (this.props.wTasks !== null && this.props.user !== null) {
      if (this.props.wTasks.length > 0) {
        return null;
        // return (

        // this.props.goals.map(goal => (
        //   <View key={goal.id}>
        //     <RedeemedGoalsCard goals={goal} />
        //   </View>
        // ))
        // );
      }
    }
    return (<Text style={Style.headerText}>No Completed Tasks Yet!</Text>);
  }

  render() {
    console.log('rendering completed tasks');
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Completed Tasks!</Text>
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
              selectedButtonStyle={{ backgroundColor: '#3de594' }
              }
            />
            <ScrollView>
              {this.renderGoals()}
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
