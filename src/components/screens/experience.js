import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  InteractionManager,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Title,
  Header,
  Button,
  Icon,
  Card,
  Text,
  CardItem,
  Footer,
  Badge,
} from 'native-base';

import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import localStore from 'react-native-simple-store';
import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';


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


class Experience extends Component {
  constructor(props) {
    super(props);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.state = {
      isLoading: true,
      userId: null,
    };
  }

  componentWillMount() {
    localStore.get('placeful_user')
    .then(user => {
      this.setState({ userId: user.uid });
    });
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.props.collection || !this.props.collectionImage) {
        this.setState({ isLoading: false });
      }
    });
  }

  capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  goBack() {
    Actions.pop();
  }

  planTemplate(plan) {
    function PlanTemplate(restaurant) {
      this.neighborhood = restaurant.location.locality;
      this.title = '';
      this.merchant_id = '';
      this.phone = '';
      this.twitter = '';
      this.merchant_address = restaurant.location.address;
      this.merchant_name = restaurant.name;
      this.merchant_locality = restaurant.location.city;
      this.description = '';
      this.fine_print = '';
      this.start_date = '';
      this.end_date = '';
      this.slug = '';
      this.ticket_id = restaurant.id;
      this.likes = [];
      this.start_time = '';
      this.end_time = '';
      this.endTimeString = '';
      this.approved = true;
      this.source = 'zomato';
      this.tags = restaurant.cuisines.split(',');
      this.merchant_category = ['Happy Hour', 'Lunch', 'Dinner', 'Brunch'];
      this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.loc = {
        type: 'Point',
        coordinates: [restaurant.location.longitude, restaurant.location.latitude],
      };
      this.followers = [];
      this.promoted = false;
      this.large_image = restaurant.featured_image;
      this.menu = '';
      this.rating = '';
    }

    const updatedPlan = new PlanTemplate(plan);

    return updatedPlan;
  }

  // goToContentPage(plan) {
  //   const updatedPlan = this.planTemplate(plan);
  //   this.props.fetchSinglePromo(updatedPlan, this.props.navigator);
  // }

  goToContentPage(item) {
    const plan = this.planTemplate(item);
    // this.props.fetchSinglePromo(updatedPlan, this.props.navigator);
    Actions.plan({ plan });
  }

  render() {
    if (!this.props.collection || !this.props.collectionImage) {
      return (
        <View style={sharedStyles.center}>
          <Text style={sharedStyles.loadingText}>Loading restaurants...</Text>
        </View>);
    }

    const experience = this.props.collection;
    const imgScr = this.props.collectionImage.imgScr;
    const title = this.props.collectionImage.title;
    const description = this.props.collectionImage.description;

    const restaurants = experience.map((item, key) => {
      const thumbnailSrc = `https://res.cloudinary.com/placeful/image/fetch/w_100,h_100,c_fill,g_face,f_auto/${item.restaurant.featured_image}`;
      const hashtags = item.restaurant.cuisines.split(',').map((tag) => `#${tag} `);

      return (
        <CardItem style={styles.cardItem} key={key}>
          <Grid>
            <Col size={30}>
              <TouchableOpacity onPress={() => this.goToContentPage(item.restaurant)}>
                <Image
                  source={{ uri: thumbnailSrc }}
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            </Col>
            <Col size={65}>
              <View>
                <Text style={sharedStyles.hashtags}>{hashtags}</Text>
              </View>
              <View>
                <Text style={styles.description}>{item.restaurant.name}</Text>
              </View>
              <View><Text style={styles.address}>{item.restaurant.location.address}</Text></View>
              <View style={styles.meta}>
                <Grid>
                  <Col size={40}>
                    <Text style={{ fontSize: 10, fontStyle: 'italic' }}>
                      Average cost for two: ${item.restaurant.average_cost_for_two}
                    </Text>
                  </Col>
                  <Col size={20}>
                    <Badge
                      style={{
                        backgroundColor: `#${item.restaurant.user_rating.rating_color}`,
                        alignSelf: 'flex-end',
                      }}
                    >
                      {item.restaurant.user_rating.aggregate_rating}
                    </Badge>
                  </Col>
                </Grid>
              </View>
            </Col>
          </Grid>
        </CardItem>
       );
    });

    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          <Button
            transparent style={sharedStyles.headerIconWrapper}
            onPress={() => this.goBack()}
          >
            <Icon name="md-arrow-back" style={sharedStyles.headerIcon} />
          </Button>
          <Title>
            <Text style={styles.headerText}>Experience</Text>
          </Title>
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
              <View>
                <Text style={{ fontSize: 11, color: '#F22613', fontWeight: 'bold' }}>
                  {title && title.toUpperCase()}
                </Text>
              </View>
              <View>
                <Text>
                  {this.capitalizeFirstLetter(description)}
                </Text>
              </View>
              <View>
                {/* <Text style={{ fontSize: 11 }}>
                 By caitlin hu |&nbsp;
                  <Text style={{ fontSize: 11 }}>9 minutes ago</Text>
                </Text> */}
                <Image
                  source={{ uri: imgScr }}
                  style={{ width: 400, height: 150, marginTop: 10 }}
                />
              </View>
            </CardItem>
            {restaurants}
          </Card>
        </Content>
        <Footer style={sharedStyles.footer}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
    );
  }
}

Experience.propTypes = {
  navigator: React.PropTypes.object,
  collection: React.PropTypes.array,
  collectionImage: React.PropTypes.object,
  fetchSinglePromo: React.PropTypes.func,
  savePromo: React.PropTypes.func,
  unSavePromo: React.PropTypes.func,
  savedPromos: React.PropTypes.object,
};


function mapStateToProps(state) {
  return {
    collection: state.collection.collection,
    collectionImage: state.collectionImage.image,
    savedPromos: state.savedPromos,
  };
}

export default connect(mapStateToProps, actions)(Experience);
