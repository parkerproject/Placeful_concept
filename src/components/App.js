/* global navigator */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import localStore from 'react-native-simple-store';
import * as actions from '../actions';

// components for different views
import Landing from './screens/landing';
import Signup from './screens/signup';
import Signin from './screens/signin';
import PlansWrapper from './screens/plansWrapper';
import Plan from './screens/plan';
import Experiences from './screens/experiences';
import Experience from './screens/experience';
import Me from './screens/me';
import Settings from './screens/settings';
import TermsOfUse from './screens/terms-of-use';
import Policy from './screens/policy';
import sharedStyles from '../../Themes/sharedStyles';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nextPage: '', userId: null };
  }

  componentWillMount() {
    // store.delete('placeful_user');
    localStore.get('placeful_user')
    .then(user => {
      const nextPage = user ? PlansWrapper : Landing;
      const userId = user ? user.uid : null;
      this.setState({ nextPage, userId });
      if (user) {
        this.props.fetchUserPromos(user);
      }
    });
  }

  render() {
    if (!this.state.nextPage) {
      return (
        <View style={sharedStyles.center}>
          <Text style={sharedStyles.loadingText}>Loading plans...</Text>
        </View>
      );
    }

    return (
      <Router>
        <Scene key="root">
          <Scene
            key={this.state.nextPage}
            component={this.state.nextPage}
            title={this.state.nextPage}
            hideNavBar
            initial
          />
          <Scene key="signin" component={Signin} title="Signin" hideNavBar />
          <Scene key="signup" component={Signup} title="Signup" hideNavBar />
          <Scene key="plans" component={PlansWrapper} title="Plans" hideNavBar />
          <Scene key="plan" component={Plan} title="Plan" hideNavBar />
          <Scene key="experience" component={Experience} title="Experience" hideNavBar />
          <Scene key="experiences" component={Experiences} title="Experiences" hideNavBar />
          <Scene key="me" component={Me} title="Me" hideNavBar />
          <Scene key="settings" component={Settings} title="Settings" hideNavBar />
          <Scene key="terms" component={TermsOfUse} title="Terms" hideNavBar />
          <Scene key="policy" component={Policy} title="Policy" hideNavBar />
        </Scene>
      </Router>
    );
  }
}

App.propTypes = {
  fetchUserPromos: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
  };
}

export default connect(mapStateToProps, actions)(App);
