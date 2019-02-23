import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
// import Style from '../../styling/Style';
import { fonts, colors } from '../../styling/base';

class AvatarImageFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  bPress() {
    this.props.onPressNav(this.props.individualName);
    this.props.onPressNav(this.props.avatarColor);
  }

  render() {
    console.log(this.props.individualName);
    console.log(this.props.avatarColor);
    const nameArray = this.props.individualName.split(' ');
    const indFirstName = nameArray[0];
    const indLastName = nameArray[1];
    const firstLetter = indFirstName.slice(0, 1).toUpperCase();
    const secondLetter = indLastName.slice(0, 1).toUpperCase();
    const avatarLetters = firstLetter + secondLetter;
    return (
      <View style={pageStyle.avatarChildContainer}>
        <View style={{
          width: 50, height: 50, borderRadius: 100, backgroundColor: this.props.avatarColor, justifyContent: 'center',
        }}
        >
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

const pageStyle = StyleSheet.create({
  avatarParentContainer: {
    margin: 8,
    // controlls how far from top view they render
    paddingTop: '50%',
    paddingBottom: '4%',
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

export default connect(mapStateToProps)(AvatarImageFriend);
