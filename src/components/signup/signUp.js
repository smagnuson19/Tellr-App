import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button, FormInput,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { postNewUser } from '../../actions';
import Style from '../../styling/Style';
import { colors } from '../../styling/base';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      familyName: '',
      avatar: '',
    };
  }

  createAccount() {
    // So that you are unable to navigate back to login page once logged in.
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   key: null,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Loading', params: { emailParam: this.state.email } }),
    //   ],
    // });

    // Describing what will be sent
    const payLoad = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      familyName: this.state.familyName,
      accountType: this.props.navigation.getParam('userType'),
      avatar: this.state.avatar,
    };

    // checking for errors and notifying user
    if (this.state.firstName === '') {
      Alert.alert('First Name cannot be empty');
      console.log('ERROR: first name empty');
    } else if (this.state.lastName === '') {
      Alert.alert('Last Name cannot be empty');
      console.log('ERROR: last name empty');
    } else if (this.state.email === '') {
      Alert.alert('Email cannot be empty');
      console.log('ERROR: email empty');
    } else if (this.state.password === '') {
      Alert.alert('Password cannot be empty');
      console.log('ERROR: password empty');
    } else if (this.state.familyName === '') {
      Alert.alert('Family Name cannot be empty');
      console.log('ERROR: family name empty');
    // } else if (this.state.avatar === '') {
    //   Alert.alert('Avatar cannot be empty');
    //   console.log('ERROR: avatar empty');
    } else {
      console.log('attempting to log in');
      // do a post if there are no errors in the fields
      this.props.postNewUser(payLoad)
        .then((response) => {
          // maybe backend returns a specific error so we can know for sure this
          // is the issue
          console.log(response);

          if (this.props.authenticated) {
            this.props.navigation.navigate('Auth', { emailParam: this.state.email }, NavigationActions.navigate({ routeName: 'Loading' }));
          } else if (this.props.errorMessage) {
            Alert.alert(this.props.errorMessage);
          }
        });
    }
  }

  displayAdditionalFields(userType) {
    // if (userType === 'child') {
    //   return (<View />);
    // } else {
    return (
      <FormInput
        inputStyle={Style.fieldText}
        containerStyle={pageStyle.fieldContainer}
        onChangeText={text => this.setState({ familyName: text })}
        value={this.state.familyName}
        placeholder="Family Name"
        placeholderTextColor={colors.grey}
        spellCheck="false"
        returnKeyType="done"
        ref={(input) => { this.lastInput = input; }}
        onSubmitEditing={() => this.createAccount()}
      />
    );
    // }
  }

  render() {
    const { navigation } = this.props;
    const userType = navigation.getParam('userType');

    return (
      <View style={Style.rootContainer}>
        <LinearGradient colors={[colors.linearGradientTop, colors.linearGradientBottom]} style={Style.gradient}>
          <View style={Style.contentWrapper}>
            <Text style={Style.headerText}>Create Account </Text>
            <View style={pageStyle.inputContainer}>
              <FormInput
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
                placeholder="First Name"
                inputStyle={Style.fieldText}
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
                placeholder="Last Name"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                ref={(input) => { this.secondTextInput = input; }}
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email Address"
                keyboardType="email-address"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                ref={(input) => { this.thirdTextInput = input; }}
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <FormInput
                inputStyle={Style.fieldText}
                containerStyle={pageStyle.fieldContainer}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Set Password"
                placeholderTextColor={colors.grey}
                spellCheck="false"
                returnKeyType="next"
                secureTextEntry="true"
                ref={(input) => { this.fourthTextInput = input; }}
                onSubmitEditing={() => { this.lastInput.focus(); }}
                blurOnSubmit={false}
              />

              {this.displayAdditionalFields(userType)}

            </View>
            <View style={pageStyle.buttonContainer}>
              <Button
                large
                raised
                rounded
                title="Get Started"
                backgroundColor="#3de594"
                onPress={() => this.createAccount()}
                style={Style.button}
              />
            </View>
          </View>
        </LinearGradient>

      </View>
    );
  }
}

const pageStyle = StyleSheet.create({
  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    borderColor: colors.lightGrey,
    color: colors.white,
  },
  inputContainer: {
    flex: 1,
    marginTop: '0%',
    marginBottom: '8%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    margin: '9%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',

  },

});


const mapStateToProps = state => (
  {
    account: state.user.info,
    family: state.user.family,
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });


export default connect(mapStateToProps, {
  postNewUser,
})(SignUp);
