import React, { Component } from 'react';
import { StyleSheet, WebView, View } from 'react-native';
import { Title, Header, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import termsHTML from '../modules/terms-html';
import sharedStyles from '../../../Themes/sharedStyles';

const styles = StyleSheet.create({
  headerIcon: {
    color: 'black',
  },
  logo: {
    marginTop: 30,
    alignSelf: 'center',
  },
  textColor: {
    color: '#fff',
  },
});

class TermsOfUse extends Component {
  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
    this.state = { errorMessage: '' };
  }

  goBack() {
    Actions.pop();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={sharedStyles.header}>
          <Button transparent onPress={this.goBack}>
            <Icon name="md-arrow-back" style={styles.headerIcon} />
          </Button>
          <Title>
            <Text style={sharedStyles.headerText}>Terms of Use</Text>
          </Title>
        </Header>
        <WebView
          source={{ html: termsHTML }}
          scalesPageToFit
        />
      </View>
    );
  }
}

TermsOfUse.propTypes = {
  navigator: React.PropTypes.object,
};

export default TermsOfUse;
