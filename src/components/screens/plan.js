/* global navigator */
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  InteractionManager,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Button,
  Icon,
  Footer,
  Title,
  Header,
  Text,
} from 'native-base';
import Intercom from 'react-native-intercom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';
import AddressCard from '../modules/plan-address-card';
import DescriptionCard from '../modules/plan-description-card';
// import DateCard from '../modules/plan-date-card';
import ReviewsCard from '../modules/plan-reviews-card';
// import MenuCard from '../modules/plan-menu-card';
import HoursCard from '../modules/plan-hours-card';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  headerIcon: {
    color: 'black',
  },
});


class Plan extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      userId: '',
      latitude: null,
      longitude: null,
      clicked: 'none',
      business: null,
      hours: null,
      foursquare: '',
      isVisible: true,
      reviews: null,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const { merchant_name } = this.props.plan;
      let phone = this.props.plan.phone;
      const yelpWaitTime = !phone ? 1000 : 0;
      const foursquareWaitTime = !phone ? 0 : 1000;

      setTimeout(() => {
        phone = !phone ? this.state.foursquare.contact.phone : phone;
        this.props.fetchYelp(phone, merchant_name, (business) => {
          const { hours, reviews } = business;
          this.setState({ hours, reviews, isVisible: false });
        });
      }, yelpWaitTime);

      setTimeout(() => {
        this.innerDataCall();
      }, foursquareWaitTime);

      Intercom.logEvent('view', { extra: this.props.plan });
    });
  }

  innerDataCall() {
    const merchantName = this.props.plan.merchant_name;
    const lat = this.props.plan.loc.coordinates[1];
    const lon = this.props.plan.loc.coordinates[0];
    this.props.fetchFoursquareVenues(lat, lon, merchantName, (data) => {
      this.setState({ foursquare: data, isVisible: false });
    });
  }


  goBack() {
    Actions.pop();
  }


  render() {
    if (this.state.isVisible) {
      return (<View style={sharedStyles.center}>
        <Text>Loading plan...</Text>
      </View>);
    }
    const { plan } = this.props;
    const thumbnailWidth = 80;
    let imgSrc = `https://res.cloudinary.com/placeful/image/fetch/w_${Math.floor(width)},h_${Math.floor(height)},c_fill,g_face,f_auto/${plan.large_image}`;
    let imgScrThumbnail = `https://res.cloudinary.com/placeful/image/fetch/w_${thumbnailWidth},h_100,c_fill,g_face,f_auto/${plan.large_image}`;

    if (!plan.source) {
      const arr = plan.large_image.split('upload');
      imgSrc = `${arr[0]}upload/w_${width}/e_gradient_fade,y_-0.9${arr[1]}`;
      imgScrThumbnail = `${arr[0]}upload/w_${thumbnailWidth}/${arr[1]}`;
    }

    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          <Button
            transparent style={sharedStyles.headerIconWrapper}
            onPress={this.goBack}
          >
            <Icon
              name="md-arrow-back"
              style={[sharedStyles.headerIcon, styles.headerIcon]}
            />
          </Button>
          <Title>
            <Text style={sharedStyles.headerText}>Plan</Text>
          </Title>
        </Header>
        <Image source={{ uri: imgSrc }} style={{ width, height }}>
          <Content style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 140 }}
              automaticallyAdjustContentInsets={false}
            >
              <AddressCard
                plan={plan}
                thumbnail={imgScrThumbnail}
                phoneFrom4square={this.state.foursquare}
              />
              <DescriptionCard plan={plan} />
              {/* <MenuCard data={this.state.foursquare} /> */}
              {/* <DateCard plan={plan} /> */}
              <HoursCard hours={this.state.hours} />
              <ReviewsCard reviews={this.state.reviews} />
            </ScrollView>
          </Content>
        </Image>
        <Footer style={[sharedStyles.footer, { position: 'absolute', bottom: 0 }]}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
    );
  }
}

Plan.propTypes = {
  plan: React.PropTypes.object,
  navigator: React.PropTypes.object,
  likePromo: React.PropTypes.func,
  unLikePromo: React.PropTypes.func,
  savePromo: React.PropTypes.func,
  fetchYelp: React.PropTypes.func,
  fetchFoursquareVenues: React.PropTypes.func,
};


export default connect(null, actions)(Plan);
