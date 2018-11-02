import { StyleSheet } from 'react-native';


const Style = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerImage: {
    marginTop: 80,
    marginBottom: 60,
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',

  },

  buttonLogin: {
    fontFamily: 'Montserrat-Thin',
    margin: 20,
  },

  fieldContainer: {
    borderBottomWidth: 1,
    flex: 0,
    borderColor: 'rgb(176, 176, 176)',
    color: 'white',
  },

  fieldText: {
    textAlign: 'center',
    fontSize: 23,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // background: linear-gradient(155.26, rgba(4, 27, 37, 0.961547) - 13.61, rgba(0, 6, 3, 0.76) - 146.55),
  },

  inputContainer: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,

    alignItems: 'center',
  },

  displayText: {
    color: 'blue',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
  },
});

export default Style;
