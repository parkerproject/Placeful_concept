/* global navigator */
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Title,
  Header,
  Card,
  Text,
  CardItem,
  Footer,
} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';

const width = Dimensions.get('window').width;
const Realm = require('realm');

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

class Experiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      collections: null,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.props.fetchCollections(latitude, longitude, (collections) => {
          this.setState({ collections, latitude, longitude });
        });
      },
      (error) => Alert.alert(JSON.stringify(error))
    //  { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  fetchCollection(collection, imgScr) {
    const { collection_id, res_count, title, description } = collection;
    const geo = {
      lat: this.state.latitude,
      lon: this.state.longitude,
    };
    this.props.fetchCollection(collection_id, res_count, geo, imgScr, title, description);
    Actions.experience();
  }

  cacheCollection() {
    const CollectionSchema = {
      name: 'Experience',
      properties: {
        collection: { type: 'data' },
      },
    };

    const items = this.state.collections;

    // const experienceList = Experiences.collections;
    const realm = new Realm({ schema: [CollectionSchema] });

    realm.write(() => {
      for (let k = 0; k < items.length; k++) {
        realm.create('Experience', {
          insert_date: new Date(),
          collection: items[k].collection,
        });
      }
      // experienceList.push({ make: 'Honda', model: 'Accord', miles: 100 });
      // experienceList = [...experienceList, this.state.collections];
      // experienceList.push(this.state.collections);
      // console.log(experienceList);
    });
    const dogs = realm.objects('Experience');
    console.log(dogs[0]);
  }

  // componentDidMount() {
  //   this.cacheCollection();
  // }

  render() {
    if (!this.state.collections) {
      return (<View style={sharedStyles.center}>
        <Text>Loading experiences...</Text>
      </View>);
    }
    const collections = this.state.collections;
    const collectionsView = collections.map((c, key) => {
      const thumbnailSrc = `https://res.cloudinary.com/placeful/image/fetch/w_100,h_100,c_fill,g_face,f_auto/${c.collection.image_url}`;
      const imgScr = `https://res.cloudinary.com/placeful/image/fetch/w_${Math.floor(width)},h_150,c_fill,g_face,f_auto/${c.collection.image_url}`;
      return (
        <CardItem style={styles.cardItem} key={key}>
          <Grid>
            <Col size={30}>
              <TouchableOpacity
                onPress={() => this.fetchCollection(c.collection, imgScr)}
              >
                <Image
                  source={{ uri: thumbnailSrc }}
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            </Col>
            <Col size={65}>
              <View>
                <Text style={styles.category}>
                  {`${c.collection.title}:`.toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.description}>{c.collection.description}</Text>
              </View>
              <View><Text style={styles.date}>{c.collection.res_count} restaurants</Text></View>
            </Col>
          </Grid>
        </CardItem>
      );
    });
    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          {/* <Button transparent style={sharedStyles.headerIconWrapper}>
            <Icon name="ios-notifications-outline" style={sharedStyles.headerIcon} />
          </Button> */}
          <Title>
            <Text style={styles.headerText}>Experiences</Text>
          </Title>
        </Header>
        <Content>
          <Card style={styles.card}>
            {collectionsView}
          </Card>
        </Content>
        <Footer style={sharedStyles.footer}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
    );
  }
}

Experiences.propTypes = {
  navigator: React.PropTypes.object,
  // collections: React.PropTypes.object,
  fetchCollection: React.PropTypes.func,
  fetchCollections: React.PropTypes.func,
};


function mapStateToProps(state) {
  return {
    collections: state.collections,
  };
}

export default connect(mapStateToProps, actions)(Experiences);
