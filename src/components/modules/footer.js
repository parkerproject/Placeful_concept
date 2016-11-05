import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import sharedStyles from '../../../Themes/sharedStyles';
import * as actions from '../../actions';

class FooterModule extends Component {

  reDirect(screen) {
    Actions[screen]({ type: 'reset' });
  }

  render() {
    return (
      <View style={sharedStyles.footer2}>
        <TouchableOpacity onPress={() => this.reDirect('plans')}>
          <View>
            <Icon name="ios-list-box-outline" style={sharedStyles.footerLinkIcon} />
            <Text style={sharedStyles.footerLink}>Plans</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.reDirect('experiences')}>
          <View>
            <Icon name="ios-happy-outline" style={sharedStyles.footerLinkIcon} />
            <Text style={sharedStyles.footerLink}>Experiences</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.reDirect('me')}>
          <View>
            <Icon name="ios-person-outline" style={sharedStyles.footerLinkIcon} />
            <Text style={sharedStyles.footerLink}>Me</Text>
          </View>
        </TouchableOpacity>
      </View>
      );
  }

}

FooterModule.propTypes = {
  navigator: React.PropTypes.object,
};


export default connect(null, actions)(FooterModule);
