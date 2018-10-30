import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // background: linear-gradient(155.26, rgba(4, 27, 37, 0.961547) - 13.61, rgba(0, 6, 3, 0.76) - 146.55),
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
