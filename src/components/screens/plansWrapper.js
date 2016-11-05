/* global navigator */
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import * as actions from '../../actions';
import sharedStyles from '../../../Themes/sharedStyles';
import Plans from './plans';

class plansWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        'Atlanta',
        'Boston',
        'Chicago',
        'Dallas',
        'Houston',
        'Los Angeles',
        'Las Vegas',
        'Miami',
        'New York',
        'Philadelphia',
        'San Diego',
        'San Francisco',
        'Seattle',
        'Washington DC',
        'Phoenix',
      ],
      selectedCity: null,
      latitude: null, // 40.7128,
      longitude: null, // -73.935242,
      locationPermission: null,
    };

    this.getLocation = this.getLocation.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
  }

  componentWillMount() {
    if (this.state.locationPermission !== 'authorized') {
      this.requestPermission();
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude });
      },
      (error) => console.log(error, '=>Enable location to via nearby plans')
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({ latitude, longitude });
    });
  }

  requestPermission() {
    Permissions.requestPermission('location')
    .then(res => {
      this.setState({ locationPermission: res });
      if (res !== 'authorized') {
        Alert.alert(
          'Whoops!',
          'There was a problem getting your permission. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: Permissions.openSettings },
          ]
        );
      }
    }).catch(e => console.warn(e));
  }

  render() {
    if (this.state.latitude == null || this.state.longitude == null) {
      return (<View style={sharedStyles.center}>
        <Text style={sharedStyles.loadingText}>Loading plans...</Text>
      </View>);
    }
    return (
      <View style={{ flex: 1 }}>
        <Plans
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          user={this.props.authenticated.user}
          cities={this.state.cities}
        />
      </View>
    );
  }
}

plansWrapper.watchID = null;
plansWrapper.propTypes = {
  authenticated: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
  };
}
export default connect(mapStateToProps, actions)(plansWrapper);
