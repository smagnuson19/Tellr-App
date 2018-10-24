import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },


  inputContainer: {
    flex: 8,
    backgroundColor: '#BB205A',
  },

  displayText: {
    color: 'red',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
  },
});

export default Style;
