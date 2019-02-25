import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, colors } from '../../styling/base';

class AvatarImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  bPress() {
    if (this.props.screenRoute !== undefined) {
      console.log('Do nothing!');
    } else {
      this.props.onPressNav(this.props.individual);
    }
  }

  render() {
    let avatarLetters, aColor;
    if (this.props.pageNumber !== undefined) {
      avatarLetters = this.props.pageNumber;
      console.log('something');
    } else if (this.props.individual !== undefined) {
      const firstLetter = this.props.individual.firstName.slice(0, 1).toUpperCase();
      const secondLetter = this.props.individual.lastName.slice(0, 1).toUpperCase();
      avatarLetters = firstLetter + secondLetter;
    }


    // check for old account with no avatarColors
    if (this.props.definedColor !== undefined) {
      aColor = this.props.definedColor;
    } else if (this.props.individual.avatarColor) {
      aColor = this.props.individual.avatarColor;
    } else {
      aColor = '#000000';
    }
    return (
      <View style={pageStyle.avatarParentContainer}>
        <TouchableOpacity
          style={pageStyle.avatarBackground}
          onPress={() => this.bPress()}
        >
          <View style={{
            width: 50, height: 50, borderRadius: 100, backgroundColor: aColor, justifyContent: 'center',
          }}
          >
            <Text style={pageStyle.avatarText}>
              {' '}
              {avatarLetters}
              {' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  avatarParentContainer: {
    margin: 8,
    // controlls how far from top view they render
    paddingTop: '50%',
    paddingBottom: '4%',
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
