import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Title,
  Header,
  Icon,
  List,
  Text,
  ListItem,
  Footer,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import localStore from 'react-native-simple-store';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 20,
    borderTopWidth: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    borderRadius: 0,
    paddingBottom: 5,
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  cardItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  date: {
    color: '#b7b7b7',
    fontSize: 12,
    paddingTop: 15,
  },
  address: {
    fontSize: 12,
    color: '#959595',
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', name: '' };
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    localStore.get('placeful_user')
    .then(user => {
      this.setState({ email: user.email, name: user.name });
    });
  }

  signOut() {
    localStore.delete('placeful_user');
    Actions.signin({ type: 'reset' });
  }

  goToPage(page) {
    Actions[page]();
  }

  requestPasswordChange() {
    this.props.resetPassword(this.state.email);
    Alert.alert('We have emailed you a password reset link');
  }

  render() {
    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          {/* <Button transparent style={sharedStyles.headerIconWrapper}>
            <Icon name="ios-notifications-outline" style={sharedStyles.headerIcon} />
          </Button> */}
          <Title>
            <Text style={styles.headerText}>More</Text>
          </Title>
        </Header>
        <Content>
          <List>
            <ListItem iconRight>
              <Text style={{ fontSize: 14 }}>{this.state.name}</Text>
              <Text style={sharedStyles.hashtags}>{this.state.email}</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
            {/* <ListItem iconRight>
              <Text style={{ fontSize: 14 }}>Message Placeful</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
            <ListItem iconRight>
              <Text style={{ fontSize: 14 }}>Rate Us</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem> */}
            <ListItem iconRight onPress={() => this.goToPage('terms')}>
              <Text style={{ fontSize: 14 }}>Terms of Use</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
            <ListItem iconRight onPress={() => this.goToPage('policy')}>
              <Text style={{ fontSize: 14 }}>Privacy Policy</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
            <ListItem iconRight onPress={() => this.requestPasswordChange()}>
              <Text style={{ fontSize: 14 }}>Change Password</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
            <ListItem iconRight onPress={this.signOut}>
              <Text style={{ fontSize: 14 }}>Sign Out</Text>
              <Icon name="ios-arrow-round-forward-outline" style={{ fontSize: 25 }} />
            </ListItem>
          </List>
        </Content>
        <Footer style={sharedStyles.footer}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
    );
  }
}

Settings.propTypes = {
  navigator: React.PropTypes.object,
  resetPassword: React.PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, actions)(Settings);
