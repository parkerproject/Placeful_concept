import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Title,
  Header,
  Button,
  Icon,
  Card,
  Text,
  Footer,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import localStore from 'react-native-simple-store';

import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';
import * as actions from '../../actions';
import PlansTab from './me-plans';


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
    justifyContent: 'center',
    alignItems: 'center',
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
  meta: {
    paddingTop: 10,
  },
  miles: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#959595',
  },
  likes: {
    fontSize: 12,
  },
  heart: {
    fontSize: 25,
  },
});

class Me extends Component {
  constructor() {
    super();
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.state = { username: 'Hello Guest' };
  }

  componentDidMount() {
    localStore.get('placeful_user')
    .then((user) => {
      this.setState({ username: user.name });
    });
  }

  settings() {
    Actions.settings([{ type: 'reset' }]);
  }

  capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  render() {
    if (!this.props.savedPromos.saved_promos) {
      return (<View style={sharedStyles.center}>
        <Text style={sharedStyles.loadingText}>Loading plans...</Text>
      </View>);
    }
    const savedPromos = this.props.savedPromos.saved_promos.results;
    console.log(savedPromos);

    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          {/* <Button transparent style={sharedStyles.headerIconWrapper}>
            <Icon name="ios-notifications-outline" style={sharedStyles.headerIcon} />
          </Button> */}
          <Title>
            <Text style={styles.headerText}>Me</Text>
          </Title>
          <Button
            transparent
            style={sharedStyles.headerIconWrapper}
            onPress={() => this.settings()}
          >
            <Icon name="ios-more" style={sharedStyles.headerIcon} />
          </Button>
        </Header>
        <Content>
          <Card style={styles.card}>
            <View>
              {/* <View>
                <Image
                  source={{ uri: imgScrThumbnail }}
                  style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center' }}
                />
              </View> */}
              <View>
                <Text style={{ fontSize: 12, alignSelf: 'center' }}>{this.state.username}</Text>
                <Text style={{ fontSize: 12, alignSelf: 'center', color: '#888' }}>
                  {savedPromos && savedPromos.length} Plans
                </Text>
                {/* <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    height: 30,
                    borderColor: '#111',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#111' }}>Find & Invite Friends</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View>
              <PlansTab tabLabel="My Plans" plans={savedPromos} />
              {/* <LikeTab tabLabel="Likes" plans={savedPromos} /> */}
            </View>
          </Card>
        </Content>
        <Footer style={sharedStyles.footer}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
    );
  }
}

Me.propTypes = {
  fetchUserPromos: React.PropTypes.func,
  navigator: React.PropTypes.object,
  savedPromos: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    savedPromos: state.savedPromos,
  };
}

export default connect(mapStateToProps, actions)(Me);
