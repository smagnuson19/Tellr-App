import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

// import Style from '../../styling/Style';
import { fonts, colors } from '../../styling/base';

class AvatarImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  bPress() {
    this.props.onPressNav(this.props.individual);
  }

  render() {
    const firstLetter = this.props.individual.firstName.slice(0, 1).toUpperCase();
    const secondLetter = this.props.individual.lastName.slice(0, 1).toUpperCase();
    const avatarLetters = firstLetter + secondLetter;
    if (this.props.account.accountType === 'Parent') {
      return (
        <View style={pageStyle.avatarParentContainer}>
          <TouchableOpacity
            style={pageStyle.avatarBackground}
            onPress={() => this.bPress()}
          >
            <View style={pageStyle.avatarInnerCircle}>
              <Text style={pageStyle.avatarText}>
                {' '}
                {avatarLetters}
                {' '}
              </Text>
            </View>

          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={pageStyle.avatarChildContainer}>
          <View style={pageStyle.avatarInnerCircle}>
            <Text style={pageStyle.avatarText}>
              {' '}
              {avatarLetters}
              {' '}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const pageStyle = StyleSheet.create({
  avatarParentContainer: {
    margin: 8,
    // controlls how far from top view they render
    paddingTop: 80,
    paddingBottom: 8,
  },
  avatarChildContainer: {
  },
  avatarBackground: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: colors.grey,
    borderRadius: 100,
  },
  avatarInnerCircle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',


  },
  avatarText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.md,
    fontFamily: fonts.secondary,
  },
});

const mapStateToProps = state => (
  {
    account: state.user.info,
  });

export default connect(mapStateToProps)(AvatarImage);
