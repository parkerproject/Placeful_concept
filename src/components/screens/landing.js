import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../modules/button';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F22613',
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 55,
  },
  blurb: {
    color: 'white',
    fontSize: 18,
  },
  signup: {
    backgroundColor: '#EC644B',
    borderColor: '#F22613',
    borderWidth: 1,
    marginTop: 50,
  },
  signin: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
  },
});

class LandingScreen extends Component {
  constructor() {
    super();
    this.onSignupPress = this.onSignupPress.bind(this);
    this.onSigninPress = this.onSigninPress.bind(this);
    this.onSkip = this.onSkip.bind(this);
  }
  onSignupPress() {
    this.props.navigator.push({ name: 'signup' });
  }

  onSigninPress() {
    this.props.navigator.push({ name: 'signin' });
  }

  onSkip() {
    this.props.navigator.immediatelyResetRouteStack([{ name: 'plans' }]);
  }

  render() {
    return (
      <View style={[styles.innerContainer]}>
        <Image
          source={{ uri: 'https://dl.dropboxusercontent.com/s/q4mwthvd03e8sva/white_logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.blurb}>
          Discover promotions around you.
        </Text>
        <Button
          localStyle={styles.signup}
          text={'Sign up'}
          onPress={Actions.signup}
        />
        <Button
          localStyle={styles.signin}
          text={'Sign in'}
          onPress={Actions.signin}
        />
        {/* <Text
          style={{
            color: '#c2c2c2',
            paddingTop: 20,
            fontSize: 11,
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={this.onSkip}
        >Skip</Text> */}
      </View>
    );
  }
}

LandingScreen.propTypes = {
  navigator: PropTypes.object,
};


export default LandingScreen;
