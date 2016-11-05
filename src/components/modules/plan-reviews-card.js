import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Badge } from 'native-base';
import sharedStyles from '../../../Themes/sharedStyles';


class reviewsCard extends Component {

  constructor(props) {
    super(props);
    this.state = { reviews: [] };
    this.colorForReview = this.colorForReview.bind(this);
  }

  componentWillReceiveProps(object) {
    if (object.reviews) {
      this.setState({ reviews: object.reviews });
    }
  }

  colorForReview(num) {
    let color;
    if (num > 3) {
      color = '#2ECC71';
    } else if (num < 4 && num > 1.9) {
      color = '#F39C12';
    } else {
      color = '#F22613';
    }

    return color;
  }

  render() {
    if (this.state.reviews.length === 0) {
      return (<View />);
    }
    const reviews = this.state.reviews.map((review, key) =>
      <View key={key}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
        >
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: '500', fontSize: 12 }}>
              {review.user.name} </Text>
           rated this place
          </Text>
          <Badge
            style={{
              backgroundColor: this.colorForReview(review.rating),
              position: 'relative',
              top: -3,
            }}
          >{review.rating}</Badge>
        </View>
        <View>
          <Text style={{ fontSize: 13 }}>{review.text}</Text>
          <Text style={{ fontSize: 11, color: '#777' }}>rated on {review.time_created}</Text>
        </View>
      </View>

    );
    return (
      <View style={sharedStyles.card}>
        <View style={sharedStyles.CardItem}>
          {reviews}
        </View>
        <Text
          style={{
            fontSize: 12,
            alignSelf: 'center',
            paddingTop: 10,
            paddingBottom: 10 }}
        >Reviews powered by Yelp</Text>
      </View>
    );
  }

}

reviewsCard.propTypes = {
  reviews: React.PropTypes.array,
};

export default reviewsCard;
