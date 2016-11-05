/* global navigator */
import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Container,
  Title,
  Button,
  Icon,
  Text,
  Footer,
  List,
  ListItem,
  CheckBox,
  Header,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import GiftedListView from 'react-native-gifted-listview';
import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';
import FooterView from '../modules/footer';
import CardView from '../modules/plan-card';


class Plans extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : 'Load More',
      selectedCity: this.props.city && this.props.city.city,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      userId: this.props.user.uid,
    };
    this.renderRow = this.renderRow.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderPaginationWaitingView = this.renderPaginationWaitingView.bind(this);
    this.renderPaginationAllLoadedView = this.renderPaginationAllLoadedView.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  onRefresh(page = 1, callback) {
    const { longitude, latitude, userId } = this.state;
    const city = this.state.selectedCity;
    this.props.fetchPromos(latitude, longitude, userId, city, page, (payload) => {
      if (!payload.hasNext) {
        callback(payload.items, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(payload.items);
      }
    });
  }

  handleLike(dealId, liked) {
    const geo = `${this.state.longitude},${this.state.latitude}`;
    if (liked === 'yes') {
      this.props.unLikePromo(this.props.user.uid, dealId, geo);
    } else {
      this.props.likePromo(this.props.user.uid, dealId, geo);
    }
  }

  pickCity(city) {
    this.props.selectCity(city);
    Actions.plans({ type: 'reset' });
  }

  renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableOpacity
        onPress={paginateCallback}
        style={{ justifyContent: 'center',
         borderColor: '#F22613',
         borderWidth: 1,
         backgroundColor: '#F22613',
         height: 40,
         borderRadius: 3,
         marginBottom: 20,
         width: 300,
         flexDirection: 'row',
         alignSelf: 'center',
         paddingBottom: 5,
         marginTop: 10,
       }}
      >
        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>
          {this.state.loadMoreText}
        </Text>
      </TouchableOpacity>
    );
  }

  renderPaginationAllLoadedView() {
    return (
      <View />
    );
  }

  renderRow(plan) {
    return (<CardView
      plan={plan}
      key={plan.ticket_id}
      handleLike={this.handleLike}
      userId={this.props.user.uid}
    />);
  }


  render() {
    const lists = this.props.cities.map((city, key) =>
      <ListItem key={key}>
        <CheckBox
          checked={this.state.selectedCity === city && true}
          onPress={() => this.setState({ selectedCity: city })}
        />
        <Text style={{ fontSize: 14 }}>{city}</Text>
      </ListItem>
  );
    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          {/* <Button transparent style={sharedStyles.headerIconWrapper}>
            <Icon name="ios-notifications-outline" style={sharedStyles.headerIcon} />
          </Button> */}
          <Title>
            <Text style={sharedStyles.headerText}>Plans</Text>
          </Title>
          <Button
            transparent style={sharedStyles.headerIconWrapper}
            onPress={() => this.setState({ isOpen: true })}
          >
            <Icon name="ios-options-outline" style={sharedStyles.headerIcon} />
          </Button>
        </Header>
        <View style={{ flex: 1 }}>
          <GiftedListView
            style={{ flex: 1 }}
            refreshable={false}
            rowView={this.renderRow}
            onFetch={this.onRefresh}
            pagination
            loadMoreText={'Load More'}
            paginationWaitingView={this.renderPaginationWaitingView}
            paginationAllLoadedView={this.renderPaginationAllLoadedView}
            enableEmptySections
          />
          <Modal isOpen={this.state.isOpen} style={sharedStyles.modal} backdrop={false}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  fontSize: 14,
                  alignSelf: 'center',
                  fontWeight: '500',
                }}
              >Filter plans by city</Text>
              <TouchableOpacity
                style={{ position: 'absolute', top: 10, right: 10 }}
                onPress={() => this.pickCity(this.state.selectedCity)}
              >
                <Icon name="ios-close-outline" />
              </TouchableOpacity>
              <ScrollView><List>{lists}</List></ScrollView>
            </View>
          </Modal>
        </View>
        <Footer style={sharedStyles.footer}>
          <FooterView navigator={this.props.navigator} />
        </Footer>
      </Container>
      );
  }
}


Plans.propTypes = {
  data: React.PropTypes.object,
  fetchPromos: React.PropTypes.func,
  loadMoreText: React.PropTypes.string,
  fetchSinglePromo: React.PropTypes.func,
  navigator: React.PropTypes.object,
  likePromo: React.PropTypes.func,
  unLikePromo: React.PropTypes.func,
  fetchReviews: React.PropTypes.func,
  selectCity: React.PropTypes.func,
  city: React.PropTypes.object,
  cities: React.PropTypes.array,
  longitude: React.PropTypes.number,
  latitude: React.PropTypes.number,
  user: React.PropTypes.any,
};

function mapStateToProps(state) {
  return {
    activePlans: state.promos.promos,
    city: state.city.city,
  };
}
export default connect(mapStateToProps, actions)(Plans);
