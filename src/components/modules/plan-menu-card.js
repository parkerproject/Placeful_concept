import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import sharedStyles from '../../../Themes/sharedStyles';


class MenuCard extends Component {

  constructor(props) {
    super(props);
    this.state = { venue: null };
  }

  componentWillReceiveProps(object) {
    if (object) {
      this.setState({ venue: object.data });
    }
  }

  render() {
    if (this.state.venue == null) {
      return (<View style={sharedStyles.card}>
        <Text>No menu...</Text>
      </View>);
    }
    return (
      <View>
        {this.state.venue.menu &&
          <View style={sharedStyles.card}>
            <View style={sharedStyles.CardItem}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  borderColor: '#F22613',
                  borderWidth: 1,
                  borderRadius: 3,
                  padding: 10,
                }}
                onPress={() => Communications.web(this.state.venue.menu.mobileUrl)}
              >
                <Text style={{ color: '#F22613', fontWeight: '600' }}>View menu</Text>
              </TouchableOpacity>
              {this.state.venue.delivery &&
                <Text
                  style={{ alignSelf: 'center', fontWeight: 'bold' }}
                  onPress={() => Communications.web(this.state.venue.delivery.url)}
                >
                Order at {this.state.venue.delivery.provider.name}</Text>}
            </View>
          </View>}
      </View>
    );
  }

}

MenuCard.propTypes = {
  venue: React.PropTypes.object,
};

export default MenuCard;
