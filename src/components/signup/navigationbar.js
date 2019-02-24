// Takes props curPage and pages
import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';

import { Divider } from 'react-native-elements';
import AvatarImage from '../tabs/avatarImage';

import { colors } from '../../styling/base';
// import { dimensions } from '../../styling/base';


const NavigationBar = (props) => {
  function renderCirclesAndLine() {
    const headerMaterial = [];
    for (let i = 0; i < props.numPages; i++) {
      if (i < props.currPage) {
        headerMaterial.push(<AvatarImage
          key={i}
          screenRoute={null}
          pageNumber={i}
          definedColor={colors.NavigationBarColoredLine}
        />);
      } else {
        headerMaterial.push(<AvatarImage
          key={i}
          screenRoute={null}
          pageNumber={i}
          definedColor="#959595"
        />);
      }
      if (i < props.numPages - 1) {
        headerMaterial.push(<Divider
          style={{
            backgroundColor: colors.NavigationBarColoredLine,
            height: 3,
          }}
        />);
      }
    }
    return (headerMaterial);
  }


  const data = renderCirclesAndLine(props);
  if (data) {
    return (
      <View style={PageStyle.headerWrapper}>
        {data}
      </View>
    );
  } else {
    return (null);
  }
};


const PageStyle = StyleSheet.create({
  headerWrapper: {
    paddingTop: '8%',
    justifyContent: 'center',

  },
});

export default NavigationBar;
