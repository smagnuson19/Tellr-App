import React, { Component } from 'react';
// import ImageBrowser from 'react-native-interactive-image-gallery';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  // StyleSheet,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import {
  Button, FormInput,
} from 'react-native-elements';
// import DatePicker from 'react-native-datepicker';
// import RNPickerSelect from 'react-native-picker-select';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import Style from '../styling/Style';
// import { colors, fonts } from '../styling/base';
import { colors } from '../styling/base';

const ROOT_URL = 'http://localhost:5000/api';

const API_KEY_GOALS = 'goals';
// const API_KEY_CHILD = 'children';
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'What Do You Want?',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class NewGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalName: '',
      childEmail: '',
      goalDescription: '',
      value: '',
      image: '',
      // familyName: '',
      // children: [],
      // images: [{
      //   uri: '../media/Tellr-Logo.gif',
      //   title: 'After Rain (Jeshu John - designerspics.com)',
      //   thumbnail: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
      //   index: 0,
      // },
      // {
      //   uri: '../media/Tellr-Logo.gif',
      //   thumbnail: '../media/Tellr-Logo.gif',
      //   title: 'After Rain (Jeshu John - designerspics.com)',
      //   index: 1,
      // },
      // ],
    };
  }

  componentDidMount() {
    // this.fetchNames();
  }

  choosePhoto() {
    console.log('Choosing Photo');
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source.uri,
        });
        console.log(`source is: ${source.uri}`);
      }
    });
  }

  // fetchNames() {
  //   AsyncStorage.getItem('emailID', (err, result) => {
  //     const API_KEY_USERS = result;
  //     return axios.get(`${ROOT_URL}/${API_KEY_CHILD}/${API_KEY_USERS}`).then((response) => {
  //       const childList = response.data;
  //       console.log(childList);
  //       const childrenList = [];
  //       Object.keys(childList).forEach((key) => {
  //         childrenList.push(childList[key].firstName);
  //         this.setState({ children: childrenList });
  //         console.log(key, childList[key]);
  //       });
  //     // this.setState({ children: childList });
  //     }).catch((error) => {
  //       console.log('ERROR in NewGoal');
  //     });
  //   });
  // }

  submitGoal() {
    // So that you are unable to navigate back to login page once logged in.
    AsyncStorage.getItem('emailID').then((value) => {
      this.setState({ childEmail: value });
    }).done();
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainTabBar' }),
      ],
    });

    const payLoad = {
      goalName: this.state.goalName,
      childEmail: this.state.childEmail,
      goalDescription: this.state.goalDescription,
      value: this.state.value,
      image: this.state.image,
      // familyName: this.state.familyName,
    };

    axios.post(`${ROOT_URL}/${API_KEY_GOALS}`, { payLoad })
      .then((response) => {
        console.log(response.data);
        this.props.navigation.dispatch(resetAction);
      });
  }

  render() {
    // const imageURLs: Array<Object> = this.state.images.map(
    //   (img: Object) => ({
    //     URI: img.uri,
    //     id: String(img.index),
    //     title: img.title,
    //     thumbnail: img.thumbnail,
    //   }),
    // );
    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <View style={Style.headerText}>
              <Text style={Style.headerText}>New Goal </Text>
            </View>
            <View style={Style.inputContainer}>
              <Button
                title="Take A Photo!"
                rounded
                large
                style={Style.button}
                backgroundColor={colors.secondary}
                onPress={() => this.choosePhoto()}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ goalName: text })}
                value={this.state.goalName}
                placeholder="Goal"
                placeholderTextColor={colors.placeholderColor}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ goalDescription: text })}
                value={this.state.goalDescription}
                placeholder="Goal Description..."
                placeholderTextColor={colors.placeholderColor}
              />
              <FormInput
                containerStyle={Style.fieldContainerSecondary}
                inputStyle={Style.fieldTextSecondary}
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                placeholder="Value: $0.00"
                placeholderTextColor={colors.placeholderColor}
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button
                title="Set Goal!"
                rounded
                large
                style={Style.button}
                backgroundColor={colors.secondary}
                onPress={() => this.submitGoal()}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: fonts.md,
//     margin: 40,
//     paddingTop: 7,
//     paddingHorizontal: 8,
//     paddingBottom: 7,
//     borderWidth: 0.8,
//     borderColor: 'rgb(176, 176, 176)',
//     width: 320,
//     marginLeft: 40,
//     marginTop: 15,
//     fontFamily: fonts.secondary,
//     alignSelf: 'flex-start',
//   },
// });


export default NewGoal;
