import React, { Component } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Text, CardItem } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { text } from 'react-native-communications';
import sharedStyles from '../../../Themes/sharedStyles';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    // marginBottom: 20,
    borderTopWidth: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingBottom: 5,
    borderBottomColor: '#ECECEC',
  },
  cardImage: {
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
    width: 400,
  },
  cardItem: {
    borderBottomWidth: 0,
  },
  cardItemMerchant: {
    fontSize: 12,
  },
  time: {
    fontSize: 18,
    color: 'gray',
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
  },
  more: {
    width: 50,
    height: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 13,
    // marginBottom: 10,
    fontWeight: '500',
  },
  miles: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  hashtags: {
    fontSize: 12,
    color: '#F22613',
  },

  likes: {
    fontSize: 12,
  },
});

class PlanCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookMarkedColor: '#777',
      liked: props.plan.likes.find(id => id === props.userId) ? 'yes' : 'no',
      likeIconColor: props.plan.likes.find(id => id === props.userId) ? { color: '#F22613' } : '',
      likeIcon: props.plan.likes.find(id => id === props.userId) ?
      'ios-heart' : 'ios-heart-outline',
      likesCount: props.activePlan.promo ?
      props.activePlan.promo[0].likes.length :
      props.plan.likes.length,
      bookmarkIconName: 'ios-add-circle-outline',
    };
  }

  componentWillMount() {
    const savedPromos = this.props.savedPromos.saved_promos;
    if (savedPromos && savedPromos.results) {
      const ifBookmarked = savedPromos.results.filter(promo =>
        promo.deal_id === this.props.plan.deal_id && this.props.userId === promo.user_id
      );
      const bookmarkIconName = ifBookmarked.length > 0 ?
      'ios-checkmark-circle' : 'ios-add-circle-outline';
      const bookMarkedColor = ifBookmarked.length > 0 ? '#2ECC71' : '#777';

      this.setState({ bookMarkedColor, bookmarkIconName });
    }
  }

  likeController(dealId) {
    this.props.handleLike(dealId, this.state.liked);
    if (this.state.liked === 'yes') {
      this.setState({
        liked: 'no',
        likeIconColor: '',
        likeIcon: 'ios-heart-outline',
        likesCount: this.state.likesCount - 1,
      });
    } else {
      this.setState({
        liked: 'yes',
        likeIconColor: { color: '#F22613' },
        likeIcon: 'ios-heart',
        likesCount: this.state.likesCount + 1,
      });
    }
  }

  bookMarkController(plan) {
    if (this.state.bookMarkedColor === '#777') {
      this.props.savePromo(plan, this.props.userId);
      this.setState({ bookMarkedColor: '#2ECC71', bookmarkIconName: 'ios-checkmark-circle' });
    } else {
      this.props.unSavePromo(plan, this.props.userId);
      this.setState({ bookMarkedColor: '#777', bookmarkIconName: 'ios-add-circle-outline' });
    }
  }

  sendPromo(plan) {
    const body = ` Hey! I saw this plan on Placeful
    http://placefulapp.com/promotion/${plan.deal_id}/${plan.slug}
    `;
    text(null, body);
  }

  render() {
    const plan = this.props.plan;
    const imageBase = `https://res.cloudinary.com/placeful/image/fetch/w_400,h_150,c_fill,f_auto/${plan.large_image}`;
    const tags = plan.tags.map(tag => `#${tag} `);

    return (
      <View style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Grid>
            <Col size={90}>
              <Text style={styles.cardItemMerchant}>{plan.merchant_name}</Text>
            </Col>
          </Grid>

          <View>
            <Text style={styles.timeText}>
              {plan.merchant_address.replace(/(\r\n|\n|\r)/gm, '')}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.cardItem}>
          <TouchableOpacity
            onPress={() => Actions.plan({ plan })}
          >
            <Image style={styles.cardImage} source={{ uri: imageBase }} />
          </TouchableOpacity>
        </CardItem>
        <CardItem
          style={[styles.cardItem,
          sharedStyles.noPaddingBottom,
          sharedStyles.noPaddingTop]}
        >
          <Text style={styles.title}>
            {plan.title}
          </Text>
        </CardItem>
        <CardItem
          style={[styles.cardItem,
          sharedStyles.noPaddingBottom,
          sharedStyles.noPaddingTop]}
        >
          <Text style={styles.hashtags}>{tags}</Text>
        </CardItem>

        <CardItem
          style={[styles.cardItem,
        sharedStyles.noPaddingBottom,
        sharedStyles.noPaddingTop]}
        >

          <Grid>
            <Col size={10}>
              <TouchableOpacity
                transparent
                onPress={() => this.likeController(plan.deal_id)}
              >
                <Icon
                  name={this.state.likeIcon}
                  style={this.state.likeIconColor}
                />
              </TouchableOpacity>
            </Col>
            <Col size={60}>
              <Text
                style={styles.likes}
              >
                {Math.abs(this.state.likesCount)} like{this.state.likesCount > 1 && 's'}
              </Text>
            </Col>
            <Col size={10}>
              <TouchableOpacity
                transparent
                onPress={() => this.sendPromo(plan)}
              >
                <Icon name="ios-send" style={{ fontSize: 25, color: '#6C7A89' }} />
              </TouchableOpacity>
            </Col>
            <Col size={20}>
              <TouchableOpacity onPress={() => this.bookMarkController(plan)}>
                <Icon
                  name={this.state.bookmarkIconName}
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 22,
                    color: this.state.bookMarkedColor,
                    position: 'relative',
                    left: -10,
                  }}
                />
              </TouchableOpacity>
            </Col>
          </Grid>
        </CardItem>
      </View>
    );
  }
}


PlanCard.propTypes = {
  plan: React.PropTypes.object,
  handlePress: React.PropTypes.func,
  handleLike: React.PropTypes.func,
  userId: React.PropTypes.string,
  activePlan: React.PropTypes.object,
  savedPromos: React.PropTypes.object,
  savePromo: React.PropTypes.func,
  unSavePromo: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    activePlan: state.promo,
    savedPromos: state.savedPromos,
  };
}
export default connect(mapStateToProps, actions)(PlanCard);
