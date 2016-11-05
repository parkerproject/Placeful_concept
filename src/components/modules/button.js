import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
  },
  button: {
    width: 250,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const button = function button(props) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, props.localStyle]}
        onPress={props.onPress}
      >
        <Text style={[styles.buttonText, props.textColor]}>{props.text}</Text>
      </TouchableOpacity>
    </View>

  );
};

button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  localStyle: PropTypes.number,
  textColor: PropTypes.number,
};

export default button;
