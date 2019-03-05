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

  render() {
    const nameArray = this.props.individualName.split(' ');
    const indFirstName = nameArray[0];
    const indLastName = nameArray[1];
    const firstLetter = indFirstName.slice(0, 1).toUpperCase();
    const secondLetter = indLastName.slice(0, 1).toUpperCase();
    const avatarLetters = firstLetter + secondLetter;

    // check for old account with no avatarColors
    let aColor;
    if (this.props.avatarColor) {
      aColor = this.props.avatarColor;
    } else {
      aColor = '#000000';
    }

    return (
      <View style={pageStyle.avatarChildContainer}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          backgroundColor: aColor,
          justifyContent: 'center',
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
    padding: 0,
    marginLeft: -4,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
