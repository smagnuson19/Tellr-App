import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { Card } from 'react-native-elements';

// import Style from '../../styling/Style';
import { colors } from '../../styling/base';

class GoalsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // buttonSelected: '',
    };
  }

  // action is boolean deny or accept
  buttonPress(action) {
    this.props.goalAction(action);
  }

  render() {
    return (
      <Card title={this.props.title}
        containerStyle={pageStyle.cardContainer}
        titleStyle={pageStyle.titleStyle}
      >
        <View>
          <Text>Card info is going here</Text>
        </View>
      </Card>
    );
  }
}

const pageStyle = StyleSheet.create({
  cardContainer: {
  },
  titleStyle: {
    color: colors.primary,

  },
});

export default GoalsCard;
